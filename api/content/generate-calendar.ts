import {
  SYSTEM_PERSONA,
  generateWithFallbackAndRetry,
  generateFallbackCalendar,
  parseJsonSafe,
} from "../_shared.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { projectFocus, targetWeek } = req.body || {};
  try {
    const prompt = `
Lập kế hoạch nội dung 7 ngày (Thứ 2 đến Chủ Nhật) cho Kỹ Sư Phía Chủ Nhà (Anh Vũ Văn Quyền) tại Hà Nội.
Trọng tâm tuần này: ${projectFocus || "Kiểm soát cải tạo căn hộ chung cư bàn giao 2026-2027 & Bóc trần bẫy phát sinh giá rẻ"}
Thời gian: ${targetWeek || "Tuần này"}

Bắt buộc tuân thủ đúng tỷ lệ 5 trụ cột:
1. 4 Lớp Kỹ Thuật (40% ~ 3 bài)
2. Case Thật / Vạch Lỗi (20% ~ 1-2 bài)
3. Thị Trường & Xu Hướng 2026-2027 (15% ~ 1 bài)
4. Hậu Trường Nghề 15 Năm MEP (15% ~ 1 bài)
5. Lời Mời / Chuyển Đổi (10% ~ 1 bài)

Định dạng trả về BẮT BUỘC là 1 JSON Array hợp lệ gồm 7 object (từ Thứ Hai đến Chủ Nhật):
[
  {
    "day": "Thứ Hai",
    "pillar": "Trụ 1: 4 Lớp Kỹ Thuật (40%)",
    "format": "Facebook Chuyên Sâu",
    "title": "Tiêu đề bài viết sắc bén",
    "hook": "Câu hook 3s hoặc câu mở đầu giật đúng nỗi đau",
    "summary": "Tóm tắt 2-3 câu nội dung và số liệu kỹ thuật",
    "cta": "Lời kêu gọi hành động cụ thể",
    "bestPostingTime": "11:30 - 12:30 trưa"
  }
]
`;

    const response = await generateWithFallbackAndRetry({
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PERSONA,
        temperature: 0.5,
      },
    });

    let data = parseJsonSafe(response.text);
    if (!data) {
      data = generateFallbackCalendar(projectFocus);
    }

    res.status(200).json({
      success: true,
      calendar: data,
    });
  } catch (error: any) {
    console.warn("Generating Calendar via Heuristic Engine on Vercel:", error?.message || error);
    const fallbackCal = generateFallbackCalendar(projectFocus);
    res.status(200).json({
      success: true,
      calendar: fallbackCal,
      fallbackApplied: true,
    });
  }
}
