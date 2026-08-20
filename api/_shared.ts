import { GoogleGenAI } from "@google/genai";
import {
  generateFallbackContent,
  generateFallbackQuotationAudit,
  generateFallbackCalendar,
  generateFallbackChatReply,
} from "../server/heuristicGenerators.js";

export {
  generateFallbackContent,
  generateFallbackQuotationAudit,
  generateFallbackCalendar,
  generateFallbackChatReply,
};

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export const CANDIDATE_MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.7-flash"];

export const SYSTEM_PERSONA = `
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

export async function generateWithFallbackAndRetry(params: {
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
          break;
        }
      }
    }
  }

  throw lastError || new Error("Mô hình AI đang bận hoặc quá tải.");
}

export function parseJsonSafe(rawText: string | undefined): any {
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
