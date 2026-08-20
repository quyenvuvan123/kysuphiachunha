import {
  SYSTEM_PERSONA,
  generateWithFallbackAndRetry,
  generateFallbackQuotationAudit,
  parseJsonSafe,
} from "../_shared.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { quotationText, apartmentType, budgetExpected } = req.body || {};
  try {
    const prompt = `
Dưới đây là một bảng báo giá / trích đoạn hợp đồng cải tạo căn hộ chung cư tại Hà Nội:
- Loại căn hộ: ${apartmentType || "Chung cư 2PN 70m2 bàn giao thô"}
- Ngân sách dự kiến của chủ nhà: ${budgetExpected || "Chưa rõ"}
- Nội dung báo giá cần thẩm định:
"""
${quotationText}
"""

Hãy thực hiện AUDIT 4 LỚP KỸ THUẬT chuyên sâu từ góc nhìn "Kỹ Sư Phía Chủ Nhà":
Lớp 1: Bản vẽ & Thiết kế MEP (Có khớp thực tế không, có xung đột vị trí không?)
Lớp 2: Vật tư & Thiết bị (Có ghi rõ mã hiệu, độ dày C1/C2 ống PPR, tiết diện ruột đồng dây Cadisun, mã màu sơn Dulux/Jotun?)
Lớp 3: Quy trình & Tiêu chuẩn thi công (Có cam kết thử áp lực nước 8-10 bar trong 24h không, có biên bản nghiệm thu chống thấm ngâm nước 48h không?)
Lớp 4: Đơn giá & Bóc tách bẫy phát sinh (Các chiêu trò gom 'trọn gói' để tính phát sinh 20-40%).

Định dạng trả về BẮT BUỘC là 1 JSON Object:
{
  "overallRiskScore": 75,
  "riskLevel": "Cao",
  "potentialExtraCostMin": 25000000,
  "potentialExtraCostMax": 45000000,
  "summary": "Tóm tắt nhận định tổng quan 2-3 câu ngắn gọn, trực diện",
  "fourLayersAnalysis": {
    "layer1_drawings": { "status": "ĐẠT/LỖI/CẢNH BÁO", "comment": "...", "risks": ["..."] },
    "layer2_specifications": { "status": "ĐẠT/LỖI/CẢNH BÁO", "comment": "...", "risks": ["..."] },
    "layer3_process": { "status": "ĐẠT/LỖI/CẢNH BÁO", "comment": "...", "risks": ["..."] },
    "layer4_pricing": { "status": "ĐẠT/LỖI/CẢNH BÁO", "comment": "...", "risks": ["..."] }
  },
  "hiddenTraps": [
    {
      "trapTitle": "Tên bẫy phát sinh",
      "severity": "Cao/Trung bình/Nghiêm trọng",
      "financialImpact": "Ước tính thiệt hại tiền bạc",
      "explanation": "Giải thích chi tiết vì sao thợ làm thế này để kiếm thêm tiền"
    }
  ],
  "engineerActionPlan": [
    "Bước 1 yêu cầu nhà thầu làm rõ...",
    "Bước 2 bổ sung điều khoản vào hợp đồng..."
  ],
  "facebookPostSummary": "Bài viết tóm tắt ngắn dạng Case Thật để anh Quyền đăng Facebook cảnh báo (kèm 3 hashtag chuẩn)"
}
`;

    const response = await generateWithFallbackAndRetry({
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PERSONA,
        temperature: 0.4,
      },
    });

    let data = parseJsonSafe(response.text);
    if (!data) {
      data = generateFallbackQuotationAudit({ quotationText, apartmentType, budgetExpected });
    }

    res.status(200).json({
      success: true,
      auditReport: data,
    });
  } catch (error: any) {
    console.warn("Auditing Quotation via Heuristic Engine on Vercel:", error?.message || error);
    const fallbackAudit = generateFallbackQuotationAudit({ quotationText, apartmentType, budgetExpected });
    res.status(200).json({
      success: true,
      auditReport: fallbackAudit,
      fallbackApplied: true,
    });
  }
}
