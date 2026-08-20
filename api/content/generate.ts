import {
  SYSTEM_PERSONA,
  generateWithFallbackAndRetry,
  generateFallbackContent,
} from "../_shared.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pillar, format, topic, specificDetails, targetAudience, ctaType } = req.body || {};
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

    res.status(200).json({
      success: true,
      content: response.text,
    });
  } catch (error: any) {
    console.warn("Generating via MEP Expert Heuristic Engine on Vercel:", error?.message || error);
    const fallbackText = generateFallbackContent({
      pillar,
      format,
      topic,
      specificDetails,
      targetAudience,
      ctaType,
    });
    res.status(200).json({
      success: true,
      content: fallbackText,
      fallbackApplied: true,
    });
  }
}
