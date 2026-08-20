import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  generateFallbackContent,
  generateFallbackQuotationAudit,
  generateFallbackCalendar,
  generateFallbackChatReply,
} from "./server/heuristicGenerators.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI lazily / safely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const CANDIDATE_MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.7-flash"];

/**
 * Executes a generateContent call with automatic retry on 503/429/overload and fallback to secondary models.
 */
async function generateWithFallbackAndRetry(params: {
  contents: any;
  config?: any;
  maxRetriesPerModel?: number;
}) {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    const retries = params.maxRetriesPerModel ?? 1;
    let delay = 600;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        if (response && response.text) {
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || JSON.stringify(err);
        const isTransient =
          errMsg.includes("503") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("429") ||
          errMsg.includes("RESOURCE_EXHAUSTED") ||
          errMsg.includes("fetch failed") ||
          errMsg.includes("ECONNRESET");

        console.warn(`[Gemini API] Model ${model} attempt ${attempt + 1} failed:`, errMsg);

        if (isTransient && attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 1.5;
        } else {
          break; // Try next fallback model
        }
      }
    }
  }

  throw lastError || new Error("Mô hình AI đang bận hoặc quá tải. Vui lòng thử lại sau giây lát.");
}

/**
 * Sends a chat message with fallback models and retry on temporary high-demand spikes.
 */
async function sendChatMessageWithFallback(message: string, systemInstruction: string) {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    const retries = 1;
    let delay = 600;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const chat = ai.chats.create({
          model,
          config: {
            systemInstruction,
          },
        });
        const response = await chat.sendMessage({ message });
        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || JSON.stringify(err);
        const isTransient =
          errMsg.includes("503") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("429") ||
          errMsg.includes("RESOURCE_EXHAUSTED");

        console.warn(`[Gemini Chat] Model ${model} attempt ${attempt + 1} failed:`, errMsg);

        if (isTransient && attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 1.5;
        } else {
          break;
        }
      }
    }
  }

  throw lastError || new Error("Trợ lý Kỹ Sư đang bận hoặc quá tải. Vui lòng thử lại sau giây lát.");
}

function parseJsonSafe(rawText: string | undefined): any {
  if (!rawText) return null;
  const cleaned = rawText
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

const SYSTEM_PERSONA = `
Bạn là "Content AI Agent" độc quyền đóng vai trò là "Kỹ Sư Phía Chủ Nhà" (Owner's Engineer) của Anh Vũ Văn Quyền - chuyên gia với 15 năm kinh nghiệm MEP (Cơ điện) và quản lý cải tạo căn hộ chung cư tại Hà Nội.

1. ĐỊNH VỊ VÀ THÔNG ĐIỆP CỐT LÕI:
- Lời hứa thương hiệu: "Tôi thay anh/chị kiểm soát căn hộ, thợ, chi phí, sửa chữa và cải tạo để anh/chị không mất tiền oan."
- Vai trò độc lập: Đứng 100% về phía chủ nhà, bảo vệ dòng tiền cho chủ nhà. Tuyệt đối KHÔNG bán vật liệu, KHÔNG nhận thi công trọn gói (không đá bóng vừa thổi còi).
- Dịch vụ cốt lõi:
  + Gói Audit hồ sơ báo giá trước khi ký hợp đồng (1.5 - 3 triệu VNĐ/căn hộ).
  + Đại diện chủ nhà kiểm soát kỹ thuật & thi công cải tạo (giám sát độc lập).
  + Quản gia kỹ thuật định kỳ (bảo dưỡng, kiểm tra hệ thống cơ điện nước chung cư).

2. CHÂN DUNG KHÁCH HÀNG & INSIGHTS (HÀ NỘI 2026-2027):
- Khách hàng mục tiêu: Chủ nhà vừa nhận căn hộ chung cư thô/bàn giao cơ bản, chủ nhà đang lên phương án cải tạo chung cư tại Hà Nội (Vin, Masteri, Ecopark, Ngoại Giao Đoàn, Smart City, Ocean Park...), chủ căn hộ cho thuê cần tối ưu chi phí bền vững.
- Nỗi đau nhức nhối (Pain points):
  + Sợ bị tráo đổi vật tư (ví dụ báo dây Cadisun/Trần Phú nhưng lắp dây nhái, ghi ống Tiền Phong nhưng dùng loại C1 mỏng).
  + Dính bẫy giá rẻ ban đầu rồi bị "vẽ" phát sinh 20-40% khi vào việc.
  + Báo giá dùng từ lấp lửng: "vật tư tương đương", "trọn gói hạng mục điện" không ghi rõ mét dài, mã hiệu, độ dày.
  + Thợ thi công ẩu đường điện nước âm tường, không test áp lực nước, không quét chống thấm cổ ống dẫn tới thấm nhà dưới phải đập đi làm lại tiền trăm triệu.

3. 5 TRỤ CỘT NỘI DUNG (CONTENT PILLARS):
- Trụ 1 (40%): 4 Lớp Kỹ Thuật (Bóc tách chi tiết kỹ thuật: đọc bản vẽ MEP, cách soi mã vật tư chuẩn, dây điện, ống nước PPR, van một chiều, chống thấm 3 lớp, aptomat chống giật RCBO).
- Trụ 2 (20%): Case Thật / Vạch Lỗi (Bóc phốt chiêu trò, phân tích lỗi thực tế từ báo giá và công trình thực tế đã ẩn danh, vạch trần bẫy phát sinh).
- Trụ 3 (15%): Thị Trường & Xu Hướng 2026-2027 (Phân tích giá nhân công thợ Hà Nội, giá vật liệu biến động, bài toán tài chính & lãi vay khi nhận nhà).
- Trụ 4 (15%): Hậu Trường Nghề (Chuyện 15 năm làm MEP công trình, những pha cứu chủ nhà thót tim, tâm sự nghề kỹ sư độc lập).
- Trụ 5 (10%): Lời Mời / Chuyển Đổi (Mời đặt lịch Audit hồ sơ 1.5 - 3 triệu trước khi ký, đăng ký Workshop kiểm soát thầu & bẫy báo giá).

4. QUY TẮC PHONG CÁCH & ĐỊNH DẠNG:
- Văn phong: Trực diện, sắc bén, sòng phẳng, đi thẳng vào con số, nói có sách mách có chứng. Đậm chất khí chất kỹ sư thực chiến (dân kỹ thuật gốc Hải Phòng - nói thật, làm chuẩn, không lòng vòng).
- Tuyệt đối KHÔNG dùng văn phong hoa mỹ sến súa, không dùng thuật ngữ AI chung chung sáo rỗng.
- BẮT BUỘC luôn kết bài bằng 3 hashtag chuẩn: #kysuphiachunha #caitaonhachungcu #auditbaogia

5. QUY TẮC ĐỊNH DẠNG TỪNG NỀN TẢNG:
- Nền tảng Facebook Chuyên Sâu: Mở bài giật đúng nỗi đau, thân bài chia luận điểm 1-2-3 rõ ràng có dẫn chứng kỹ thuật, số liệu tiền bạc thực tế, kết luận bài học và CTA.
- Nền tảng Facebook Câu Đố Tương Tác: Tiêu đề dạng thách đố (VD: "Đố anh/chị 3 giây nhìn ra bẫy 18 triệu trong báo giá này?"), đưa ảnh/đoạn trích báo giá có bẫy, 4 phương án A-B-C-D, gợi ý bình luận và phần Lời giải chi tiết của Kỹ Sư Quyền.
- Nền tảng TikTok / YouTube Shorts (30-60s): BẮT BUỘC định dạng bảng kịch bản 3 cột:
  | [Thời gian] | [Hình ảnh / Visual / On-screen Text / Hành động] | [Lời thoại thực tế (Voiceover / Anh Quyền nói)] |
  Bắt buộc mở đầu bằng Hook 3s cực mạnh giữ chân người xem.
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Generate Content Endpoint
app.post("/api/content/generate", async (req, res) => {
  const { pillar, format, topic, specificDetails, targetAudience, ctaType } = req.body;
  try {
    const prompt = `
Hãy viết nội dung hoàn chỉnh với thông số sau:
- Trụ cột: ${pillar || "Trụ 1: 4 Lớp Kỹ Thuật"}
- Định dạng yêu cầu: ${format || "Facebook Chuyên Sâu"}
- Chủ đề: ${topic || "Bẫy báo giá điện nước chung cư"}
- Chi tiết kỹ thuật / bối cảnh cụ thể: ${specificDetails || "Nhà thầu ghi ống nước Tiền Phong không ghi độ dày C1 hay C2, dây điện ghi chung chung Cadisun không ghi tiết diện"}
- Tệp người xem: ${targetAudience || "Chủ nhà mới nhận bàn giao thô tại Hà Nội"}
- Lời kêu gọi hành động (CTA): ${ctaType || "Gửi báo giá để Audit trước khi đặt bút ký"}

YÊU CẦU ĐẶC BIỆT THEO ĐỊNH DẠNG:
- Nếu là TikTok/Shorts: Phải có bảng kịch bản 3 cột [Thời gian (giây)] - [Hình ảnh/Text trên màn hình/Hành động] - [Lời thoại thực tế]. Có Hook 3s đầu.
- Nếu là Facebook Đố Tương Tác: Có câu hỏi đố vui bẫy giá, các phương án chọn A/B/C/D, câu chốt kích thích bình luận, và phần "Đáp án & Lời bình của Kỹ sư Quyền".
- Nếu là Facebook Chuyên Sâu: Trực diện, sắc bén, bóc trần bản chất dòng tiền và kỹ thuật MEP.
- Bắt buộc cuối bài luôn có 3 hashtag: #kysuphiachunha #caitaonhachungcu #auditbaogia
`;

    const response = await generateWithFallbackAndRetry({
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PERSONA,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      content: response.text,
    });
  } catch (error: any) {
    console.warn("Generating via MEP Expert Heuristic Engine due to:", error?.message || error);
    const fallbackText = generateFallbackContent({
      pillar,
      format,
      topic,
      specificDetails,
      targetAudience,
      ctaType,
    });
    res.json({
      success: true,
      content: fallbackText,
      fallbackApplied: true,
    });
  }
});

// Generate 7-Day Content Calendar Endpoint
app.post("/api/content/generate-calendar", async (req, res) => {
  const { projectFocus, targetWeek } = req.body;
  try {
    const prompt = `
Lập kế hoạch nội dung 7 ngày (Thứ 2 đến Chủ Nhật) cho Kỹ Sư Phía Chủ Nhà (Anh Vũ Văn Quyền) tại Hà Nội.
Trọng tâm tuần này: ${projectFocus || "Kiểm soát cải tạo căn hộ chung cư bàn giao 2026-2027 & Bóc trần bẫy phát sinh giá rẻ"}
Thời gian: ${targetWeek || "Tuần này"}

Bắt buộc tuân thủ đúng tỷ lệ 5 trụ cột:
1. 4 Lớp Kỹ Thuật (40% ~ 3 bài)
2. Case Thật / Vạch Lỗi (20% ~ 1-2 bài)
3. Thị Trường & Xu Hướng (15% ~ 1 bài)
4. Hậu Trường Nghề 15 Năm MEP (15% ~ 1 bài)
5. Lời Mời / Chuyển Đổi Audit 1.5 - 3 triệu (10% ~ 1 bài)

Trả về định dạng JSON theo cấu trúc danh sách 7 ngày:
Mỗi ngày gồm:
- day: (Ví dụ: "Thứ Hai", "Thứ Ba"...)
- pillar: Tên trụ cột (1 trong 5 trụ)
- format: Định dạng ("Facebook Chuyên Sâu", "Facebook Đố Tương Tác", "TikTok Script 3 Cột", "Shorts Phân Tích")
- title: Tiêu đề bài viết sắc bén, giật hook
- hook: Câu mở đầu giữ chân 3s hoặc dòng đầu Facebook
- summary: Tóm tắt 2-3 câu nội dung chính
- cta: Lời kêu gọi hành động
- bestPostingTime: Giờ vàng đăng bài tại Hà Nội
`;

    const response = await generateWithFallbackAndRetry({
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PERSONA + "\nTrả về phản hồi thuần JSON hợp lệ theo đúng cấu trúc yêu cầu.",
        responseMimeType: "application/json",
      },
    });

    let data = parseJsonSafe(response.text);
    if (!data) {
      data = generateFallbackCalendar(projectFocus);
    }

    res.json({
      success: true,
      calendar: data,
    });
  } catch (error: any) {
    console.warn("Generating Calendar via Heuristic Engine due to:", error?.message || error);
    const fallbackCal = generateFallbackCalendar(projectFocus);
    res.json({
      success: true,
      calendar: fallbackCal,
      fallbackApplied: true,
    });
  }
});

// Quotation Audit Tool Endpoint
app.post("/api/quotation/audit", async (req, res) => {
  const { quotationText, apartmentType, budgetExpected } = req.body;
  try {
    const prompt = `
Dưới đây là một bảng báo giá / trích đoạn hợp đồng cải tạo căn hộ chung cư tại Hà Nội:
- Loại căn hộ: ${apartmentType || "Chung cư 2PN 70m2 bàn giao thô"}
- Ngân sách chủ nhà dự kiến: ${budgetExpected || "Khoảng 150 - 250 triệu"}
- Nội dung báo giá cần thẩm định:
"""
${quotationText}
"""

Với vai trò là "Kỹ Sư Phía Chủ Nhà" của Anh Vũ Văn Quyền (15 năm MEP):
Hãy bóc tách, audit toàn diện báo giá này theo 4 Lớp Kỹ Thuật và phát hiện các bẫy phát sinh tiềm ẩn.

Trả về kết quả chi tiết dưới dạng JSON gồm:
{
  "overallScore": number (Thang điểm minh bạch 1-100),
  "riskLevel": "Cao" | "Trung bình" | "Thấp",
  "estimatedHiddenExtraCostPercent": "Ví dụ: 25% - 35%",
  "estimatedExtraAmount": "Ví dụ: 40.000.000đ - 65.000.000đ",
  "criticalRedFlags": [
    {
      "item": "Tên hạng mục",
      "quotedDescription": "Mô tả của nhà thầu",
      "trapExplanation": "Bẫy lấp lửng hoặc rủi ro kỹ thuật",
      "engineerAdvice": "Lời khuyên đanh thép của Kỹ sư Quyền để ép nhà thầu làm rõ"
    }
  ],
  "mepSafetyRisks": [
    "Cảnh báo rủi ro về điện / nước / chống thấm"
  ],
  "missingItems": [
    "Các hạng mục bắt buộc phải có nhưng nhà thầu cố tình bỏ quên để báo giá ban đầu có vẻ rẻ"
  ],
  "engineerVerdict": "Nhận xét tổng kết đanh thép của anh Quyền (2-3 câu)",
  "recommendedAction": "Hành động khuyến nghị cho chủ nhà trước khi đặt bút ký",
  "readyToShareWarningPost": "Một bài viết Facebook mẫu sắc bén phân tích case này để chủ nhà hoặc anh Quyền đăng cảnh báo cộng đồng (có kèm hashtag #kysuphiachunha #caitaonhachungcu #auditbaogia)"
}
`;

    const response = await generateWithFallbackAndRetry({
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PERSONA + "\nTrả về JSON đầy đủ cấu trúc.",
        responseMimeType: "application/json",
      },
    });

    let data = parseJsonSafe(response.text);
    if (!data) {
      data = generateFallbackQuotationAudit({ quotationText, apartmentType, budgetExpected });
    }

    res.json({
      success: true,
      auditReport: data,
    });
  } catch (error: any) {
    console.warn("Auditing Quotation via Heuristic Engine due to:", error?.message || error);
    const fallbackAudit = generateFallbackQuotationAudit({ quotationText, apartmentType, budgetExpected });
    res.json({
      success: true,
      auditReport: fallbackAudit,
      fallbackApplied: true,
    });
  }
});

// Interactive Engineer Consultation Chat
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const systemInstruction = SYSTEM_PERSONA + `
Khi trả lời chat:
- Luôn giữ thái độ kỹ sư thực chiến 15 năm MEP tại Hà Nội: trực diện, thẳng thắn, bảo vệ quyền lợi và dòng tiền chủ nhà.
- Hướng dẫn chủ nhà cách tự soi lỗi hoặc giải thích vì sao cần gói Audit hồ sơ 1.5 - 3 triệu trước khi ký hợp đồng thi công.
- Tự xưng là "Kỹ Sư Quyền" hoặc "Tôi", gọi người hỏi là "anh/chị".`;

    const replyText = await sendChatMessageWithFallback(message, systemInstruction);

    res.json({
      success: true,
      reply: replyText,
    });
  } catch (error: any) {
    console.warn("Replying Chat via Heuristic Engine due to:", error?.message || error);
    const fallbackReply = generateFallbackChatReply(message || "");
    res.json({
      success: true,
      reply: fallbackReply,
      fallbackApplied: true,
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kỹ Sư Phía Chủ Nhà AI Server running on port ${PORT}`);
  });
}

startServer();
