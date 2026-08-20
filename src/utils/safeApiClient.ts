import {
  generateFallbackContent,
  generateFallbackQuotationAudit,
  generateFallbackCalendar,
  generateFallbackChatReply,
} from "./heuristicGenerators";

/**
 * Safely requests an API endpoint.
 * If server returns HTML (Vercel static 404), network error, or JSON parse error,
 * it falls back cleanly to the MEP expert engine so the app NEVER crashes or shows SyntaxErrors.
 */
export async function safeGenerateContent(params: {
  pillar: string;
  format: string;
  topic: string;
  specificDetails?: string;
  targetAudience?: string;
  ctaType?: string;
}): Promise<{ success: boolean; content: string }> {
  try {
    const response = await fetch("/api/content/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const contentType = response.headers.get("content-type") || "";
    if (response.ok && contentType.includes("application/json")) {
      const data = await response.json();
      if (data.success && data.content) {
        return { success: true, content: data.content };
      }
    }
  } catch (err) {
    console.warn("API request failed, activating client-side MEP engine:", err);
  }

  // Fallback to local expert engine
  const fallback = generateFallbackContent(params);
  return { success: true, content: fallback };
}

export async function safeGenerateCalendar(params: {
  projectFocus: string;
  targetWeek: string;
}): Promise<{ success: boolean; calendar: any[] }> {
  try {
    const response = await fetch("/api/content/generate-calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const contentType = response.headers.get("content-type") || "";
    if (response.ok && contentType.includes("application/json")) {
      const data = await response.json();
      if (data.success && Array.isArray(data.calendar)) {
        return { success: true, calendar: data.calendar };
      }
    }
  } catch (err) {
    console.warn("Calendar API failed, activating client-side MEP engine:", err);
  }

  const fallback = generateFallbackCalendar(params.projectFocus);
  return { success: true, calendar: fallback };
}

export async function safeAuditQuotation(params: {
  quotationText: string;
  apartmentType: string;
  budgetExpected: string;
}): Promise<{ success: boolean; auditReport: any }> {
  try {
    const response = await fetch("/api/quotation/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const contentType = response.headers.get("content-type") || "";
    if (response.ok && contentType.includes("application/json")) {
      const data = await response.json();
      if (data.success && data.auditReport) {
        return { success: true, auditReport: data.auditReport };
      }
    }
  } catch (err) {
    console.warn("Quotation audit API failed, activating client-side MEP engine:", err);
  }

  const fallback = generateFallbackQuotationAudit(params);
  return { success: true, auditReport: fallback };
}

export async function safeSendChat(params: {
  message: string;
}): Promise<{ success: boolean; reply: string }> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const contentType = response.headers.get("content-type") || "";
    if (response.ok && contentType.includes("application/json")) {
      const data = await response.json();
      if (data.success && data.reply) {
        return { success: true, reply: data.reply };
      }
    }
  } catch (err) {
    console.warn("Chat API failed, activating client-side MEP engine:", err);
  }

  const fallback = generateFallbackChatReply(params.message);
  return { success: true, reply: fallback };
}
