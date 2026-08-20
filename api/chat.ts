import {
  ai,
  CANDIDATE_MODELS,
  SYSTEM_PERSONA,
  generateFallbackChatReply,
} from "./_shared.js";

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

  throw lastError || new Error("Trợ lý Kỹ Sư đang bận hoặc quá tải.");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body || {};
  try {
    const systemInstruction = SYSTEM_PERSONA + `
Khi trả lời chat:
- Luôn giữ thái độ kỹ sư thực chiến 15 năm MEP tại Hà Nội: trực diện, thẳng thắn, bảo vệ quyền lợi và dòng tiền chủ nhà.
- Hướng dẫn chủ nhà cách tự soi lỗi hoặc giải thích vì sao cần gói Audit hồ sơ 1.5 - 3 triệu trước khi ký hợp đồng thi công.
- Tự xưng là "Kỹ Sư Quyền" hoặc "Tôi", gọi người hỏi là "anh/chị".`;

    const replyText = await sendChatMessageWithFallback(message || "", systemInstruction);

    res.status(200).json({
      success: true,
      reply: replyText,
    });
  } catch (error: any) {
    console.warn("Replying Chat via Heuristic Engine on Vercel:", error?.message || error);
    const fallbackReply = generateFallbackChatReply(message || "");
    res.status(200).json({
      success: true,
      reply: fallbackReply,
      fallbackApplied: true,
    });
  }
}
