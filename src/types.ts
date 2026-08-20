export type ContentPillar =
  | "pillar1_mep_tech"       // Trụ 1 (40%): 4 Lớp Kỹ Thuật (Báo giá, bản vẽ, MEP, hợp đồng)
  | "pillar2_case_debunk"    // Trụ 2 (20%): Case Thật / Vạch Lỗi
  | "pillar3_market_trends"  // Trụ 3 (15%): Thị Trường & Xu Hướng (Hà Nội 2026-2027)
  | "pillar4_behind_scenes"  // Trụ 4 (15%): Hậu Trường Nghề 15 Năm MEP
  | "pillar5_conversion";    // Trụ 5 (10%): Lời Mời / Chuyển Đổi (Audit 1.5 - 3 triệu)

export type ContentFormat =
  | "facebook_deep_dive"     // Facebook chuyên sâu
  | "facebook_quiz_puzzle"   // Facebook Đố tương tác vạch lỗi
  | "tiktok_shorts_3col"     // TikTok / Shorts Kịch bản 3 Cột [Số giây] - [Hình ảnh/Text] - [Lời thoại]
  | "quotation_warning_post" // Bài cảnh báo bóc tách một hạng mục báo giá
  | "client_consultation";   // Kịch bản tư vấn chốt gói Audit

export interface PillarInfo {
  id: ContentPillar;
  name: string;
  percentage: number;
  description: string;
  badgeColor: string;
  iconName: string;
}

export interface GeneratedContentItem {
  id: string;
  title: string;
  pillar: ContentPillar;
  format: ContentFormat;
  content: string;
  timestamp: number;
  tags: string[];
}

export interface CalendarDayPlan {
  day: string;
  pillar: string;
  format: string;
  title: string;
  hook: string;
  summary: string;
  cta: string;
  bestPostingTime: string;
}

export interface RedFlagItem {
  item: string;
  quotedDescription: string;
  trapExplanation: string;
  engineerAdvice: string;
}

export interface AuditReportData {
  overallScore: number;
  riskLevel: "Cao" | "Trung bình" | "Thấp";
  estimatedHiddenExtraCostPercent: string;
  estimatedExtraAmount: string;
  criticalRedFlags: RedFlagItem[];
  mepSafetyRisks: string[];
  missingItems: string[];
  engineerVerdict: string;
  recommendedAction: string;
  readyToShareWarningPost: string;
}

export interface KnowledgeItem {
  id: string;
  category: "mep_electrical" | "mep_plumbing" | "waterproofing" | "quotation_traps" | "contracts";
  title: string;
  severity: "high" | "critical" | "medium";
  description: string;
  badPractice: string;
  goodPractice: string;
  engineerTip: string;
}
