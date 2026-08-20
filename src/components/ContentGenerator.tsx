import React, { useState } from "react";
import { PILLARS_CONFIG, PRESET_TOPICS } from "../data/presets";
import { ContentPillar, ContentFormat, GeneratedContentItem } from "../types";
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  RefreshCw,
  Send,
  SlidersHorizontal,
  Flame,
  MessageSquareQuote,
  Video,
  FileText,
  HelpCircle,
  Hash,
  Layers,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import confetti from "canvas-confetti";

interface ContentGeneratorProps {
  onSaveContent: (item: GeneratedContentItem) => void;
  initialTopicPreset?: {
    pillar: ContentPillar;
    topic: string;
    specificDetails: string;
    format?: ContentFormat;
  } | null;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  onSaveContent,
  initialTopicPreset,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<ContentPillar>(
    initialTopicPreset?.pillar || "pillar1_mep_tech"
  );
  const [format, setFormat] = useState<ContentFormat>(
    initialTopicPreset?.format || "facebook_deep_dive"
  );
  const [topic, setTopic] = useState(
    initialTopicPreset?.topic || "Bẫy ống nước Tiền Phong C1 vs C2/C3 trong hộp kỹ thuật vệ sinh chung cư"
  );
  const [specificDetails, setSpecificDetails] = useState(
    initialTopicPreset?.specificDetails ||
      "Nhà thầu ghi chung chung 'Ống nước nóng lạnh Tiền Phong' nhưng âm tường lại đi loại C1 (áp lực thấp) thay vì PN16 hoặc PN20 cho nước nóng, sau 2 năm co ngót bục mối hàn gây ngập sàn gỗ 50 triệu."
  );
  const [targetAudience, setTargetAudience] = useState(
    "Chủ nhà nhận căn hộ chung cư thô/bàn giao cơ bản tại Hà Nội (2026-2027)"
  );
  const [ctaType, setCtaType] = useState(
    "Gửi báo giá để Kỹ Sư Quyền Audit 4 Lớp Kỹ Thuật trước khi đặt bút ký"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customToneBonus, setCustomToneBonus] = useState<string>("Sắc bén, đi thẳng vào con số kỹ thuật");

  const handleApplyPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setSelectedPillar(preset.pillar);
    setTopic(preset.topic);
    setSpecificDetails(preset.specificDetails);
    setTargetAudience(preset.targetAudience);
    setCtaType(preset.ctaType);
  };

  const handleGenerate = async (toneOverride?: string) => {
    setIsLoading(true);
    setCopied(false);
    setIsSaved(false);

    try {
      const response = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pillar: PILLARS_CONFIG.find((p) => p.id === selectedPillar)?.name || selectedPillar,
          format:
            format === "facebook_deep_dive"
              ? "Facebook Cá Nhân - Bài Viết Chuyên Sâu"
              : format === "facebook_quiz_puzzle"
              ? "Facebook Cá Nhân - Bài Toán Đố Tương Tác Vạch Lỗi Báo Giá (Kèm A/B/C/D & Đáp Án)"
              : format === "tiktok_shorts_3col"
              ? "TikTok / YouTube Shorts (30-60s) - Bảng Kịch Bản 3 Cột: [Thời gian (giây)] - [Hình ảnh/Text trên màn hình/Hành động] - [Lời thoại thực tế (Anh Quyền nói)]. Có Hook 3s đầu cực mạnh."
              : "Bài Viết Bóc Tách Báo Giá & Cảnh Báo Phát Sinh 20-40%",
          topic: topic + (toneOverride ? ` (Yêu cầu phong cách: ${toneOverride})` : ` (${customToneBonus})`),
          specificDetails,
          targetAudience,
          ctaType,
        }),
      });

      const data = await response.json();
      if (data.success && data.content) {
        setGeneratedOutput(data.content);
        try {
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
        } catch {
          // ignore
        }
      } else {
        setGeneratedOutput(
          `⚠️ Có lỗi khi tạo nội dung: ${data.error || "Không nhận được phản hồi từ AI"}`
        );
      }
    } catch (err: any) {
      setGeneratedOutput(`⚠️ Lỗi kết nối tới máy chủ: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText("#kysuphiachunha #caitaonhachungcu #auditbaogia");
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleSave = () => {
    if (!generatedOutput) return;
    const newItem: GeneratedContentItem = {
      id: Date.now().toString(),
      title: topic,
      pillar: selectedPillar,
      format,
      content: generatedOutput,
      timestamp: Date.now(),
      tags: ["#kysuphiachunha", "#caitaonhachungcu", "#auditbaogia"],
    };
    onSaveContent(newItem);
    setIsSaved(true);
  };

  const hasMandatoryHashtags =
    generatedOutput.includes("#kysuphiachunha") &&
    generatedOutput.includes("#caitaonhachungcu") &&
    generatedOutput.includes("#auditbaogia");

  return (
    <div className="space-y-6">
      {/* Top Bento Card: Concept Guide */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            AI Content Studio (Vũ Văn Quyền)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Hệ thống tạo nội dung đanh thép, chuẩn 5 Trụ Cột Kỹ Thuật MEP, chia sẻ case thật vạch trần bẫy phát sinh cho chủ nhà chung cư tại Hà Nội.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-orange-100 text-orange-900 border border-orange-200 px-3 py-1.5 rounded-full font-bold">
            Văn phong: Dân Kỹ Thuật Hải Phòng (Sắc bén - Đi thẳng số liệu)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Bento Form & Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Bento Pillar Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-orange-500" />
                1. Chọn Trụ Cột Nội Dung
              </label>
              <span className="text-xs text-slate-400 font-mono">5 Trụ Chuẩn</span>
            </div>

            <div className="space-y-2">
              {PILLARS_CONFIG.map((pillar) => (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all relative ${
                    selectedPillar === pillar.id
                      ? "bg-orange-50/70 border-orange-500 text-slate-950 shadow-sm ring-1 ring-orange-500"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-slate-900 flex items-center gap-1.5">
                      {pillar.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        selectedPillar === pillar.id
                          ? "bg-orange-500 text-slate-950"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {pillar.percentage}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{pillar.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Bento Format Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-500" />
              2. Định Dạng & Kênh Phân Phối
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFormat("facebook_deep_dive")}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                  format === "facebook_deep_dive"
                    ? "bg-blue-50 border-blue-500 text-blue-950 ring-1 ring-blue-500 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1 text-slate-900">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Facebook Chuyên Sâu</span>
                </div>
                <span className="text-[10px] text-slate-500">Luận điểm 1-2-3, bóc trần số liệu</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("facebook_quiz_puzzle")}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                  format === "facebook_quiz_puzzle"
                    ? "bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-500 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1 text-slate-900">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Facebook Đố Vạch Lỗi</span>
                </div>
                <span className="text-[10px] text-slate-500">Đố 3s nhìn ra bẫy, trắc nghiệm A-B-C-D</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("tiktok_shorts_3col")}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                  format === "tiktok_shorts_3col"
                    ? "bg-purple-50 border-purple-500 text-purple-950 ring-1 ring-purple-500 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1 text-slate-900">
                  <Video className="w-4 h-4 text-purple-600" />
                  <span>TikTok / Shorts 3 Cột</span>
                </div>
                <span className="text-[10px] text-slate-500">Bảng: [Giây] - [Hình ảnh] - [Lời thoại]</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("quotation_warning_post")}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                  format === "quotation_warning_post"
                    ? "bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1 text-slate-900">
                  <MessageSquareQuote className="w-4 h-4 text-rose-600" />
                  <span>Soi Bẫy Báo Giá 20-40%</span>
                </div>
                <span className="text-[10px] text-slate-500">Bóc mẽ chiêu trò mập mờ từ 1 dòng báo giá</span>
              </button>
            </div>
          </div>

          {/* Preset Topics Quick Loader */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2.5">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Case Mẫu Thực Chiến (Nạp Nhanh)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TOPICS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="text-[11px] bg-slate-50 hover:bg-orange-50 hover:text-orange-950 text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-orange-400 transition-all text-left truncate max-w-full font-medium"
                >
                  ⚡ {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields for Customization */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Chủ đề / Tiêu điểm bài viết:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                placeholder="Ví dụ: Bẫy ống nước Tiền Phong mỏng C1..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Chi tiết kỹ thuật / Bẫy báo giá cụ thể:
              </label>
              <textarea
                value={specificDetails}
                onChange={(e) => setSpecificDetails(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                placeholder="Mô tả chi tiết kỹ thuật MEP, số liệu tiền phát sinh, mã vật tư..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Đối tượng người xem:
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lời kêu gọi hành động (CTA):
                </label>
                <input
                  type="text"
                  value={ctaType}
                  onChange={(e) => setCtaType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isLoading}
              className="w-full mt-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Kỹ Sư Quyền Đang Viết Bài & Soi Lỗi...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Tạo Nội Dung Ngay Bằng Gemini AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Output Bento Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-5 shadow-lg flex flex-col h-full min-h-[600px]">
            {/* Output Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  Kết Quả Tạo Nội Dung
                  {format === "tiktok_shorts_3col" && (
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">
                      Kịch bản 3 Cột (30-60s)
                    </span>
                  )}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {generatedOutput && (
                  <>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-all font-medium"
                    >
                      {isEditing ? "Xem Bản Đẹp" : "Sửa Trực Tiếp"}
                    </button>
                    <button
                      onClick={handleCopyHashtags}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1 transition-all font-medium"
                      title="Sao chép 3 hashtag chuẩn"
                    >
                      <Hash className="w-3 h-3 text-orange-400" />
                      <span>{copiedTags ? "Đã chép Tag" : "Chép 3 Tag"}</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 transition-all font-medium ${
                        isSaved
                          ? "bg-emerald-900/60 text-emerald-300 border-emerald-700"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                      }`}
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>{isSaved ? "Đã Lưu Kho" : "Lưu Kho"}</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="px-3.5 py-1 text-xs bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 transition-all shadow"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Đã Sao Chép!" : "Sao Chép Toàn Bộ"}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quality / Compliance Checker Bar */}
            {generatedOutput && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 my-3 flex flex-wrap items-center justify-between text-[11px] gap-2 text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-semibold">Tiêu chuẩn Kỹ Sư Quyền:</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> Khí chất dân kỹ thuật Hải Phòng
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> Số liệu & MEP thực tế
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  {hasMandatoryHashtags ? (
                    <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      ✓ Đủ 3 Hashtags bắt buộc
                    </span>
                  ) : (
                    <span className="text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800">
                      ⚠️ Thiếu hashtag chuẩn
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Content Output Body */}
            <div className="flex-1 overflow-y-auto mt-2 text-slate-200">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Đang xử lý theo góc nhìn "Kỹ Sư Phía Chủ Nhà"
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                      Đang bóc tách số liệu kỹ thuật, rà soát 4 lớp kiểm tra MEP và chuẩn hóa cấu trúc định dạng...
                    </p>
                  </div>
                </div>
              ) : generatedOutput ? (
                generatedOutput.startsWith("⚠️") ? (
                  <div className="bg-rose-950/60 border border-rose-800 rounded-xl p-5 text-rose-200 text-xs sm:text-sm space-y-3">
                    <p className="font-medium leading-relaxed">{generatedOutput}</p>
                    <button
                      type="button"
                      onClick={() => handleGenerate()}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Thử tạo lại ngay</span>
                    </button>
                  </div>
                ) : isEditing ? (
                  <textarea
                    value={generatedOutput}
                    onChange={(e) => setGeneratedOutput(e.target.value)}
                    className="w-full h-[500px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-100 focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
                  />
                ) : (
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed p-3 bg-slate-950/60 rounded-xl border border-slate-800 overflow-x-auto">
                    <ReactMarkdown
                      components={{
                        table: ({ ...props }) => (
                          <div className="overflow-x-auto my-3 border border-slate-700 rounded-xl">
                            <table className="min-w-full divide-y divide-slate-700 text-left text-xs" {...props} />
                          </div>
                        ),
                        thead: ({ ...props }) => <thead className="bg-slate-800 text-orange-300 font-bold" {...props} />,
                        th: ({ ...props }) => <th className="px-3 py-2 border-b border-slate-700 font-bold" {...props} />,
                        td: ({ ...props }) => <td className="px-3 py-2 border-b border-slate-800 text-slate-200" {...props} />,
                        p: ({ ...props }) => <p className="my-2 whitespace-pre-line text-slate-200" {...props} />,
                        h1: ({ ...props }) => <h1 className="text-base font-bold text-orange-400 my-2" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-sm font-bold text-orange-300 my-2" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-xs font-bold text-slate-200 my-1.5" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc pl-5 my-2 space-y-1 text-slate-300" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1 text-slate-300" {...props} />,
                        blockquote: ({ ...props }) => (
                          <blockquote className="border-l-4 border-orange-500 pl-3 italic my-2 text-slate-300 bg-slate-900 py-1 rounded-r-lg" {...props} />
                        ),
                      }}
                    >
                      {generatedOutput}
                    </ReactMarkdown>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-300">Chưa có bài viết nào được tạo</p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                      Hãy chọn Trụ cột, Định dạng và bấm "Tạo Nội Dung Ngay Bằng Gemini AI" ở bên trái để sinh nội dung chuyên nghiệp.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Polish Buttons */}
            {generatedOutput && !isLoading && (
              <div className="pt-3 mt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400">Tối ưu lại nhanh theo phong cách:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => handleGenerate("Tăng tính đanh thép, thẳng thắn, đậm chất kỹ thuật Hải Phòng hơn nữa")}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 hover:border-orange-500 transition-all"
                  >
                    ⚡ Đanh thép hơn
                  </button>
                  <button
                    onClick={() => handleGenerate("Bổ sung thêm bảng so sánh số liệu chi phí thực tế và rủi ro MEP")}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 hover:border-blue-500 transition-all"
                  >
                    📊 Thêm số liệu chi phí
                  </button>
                  <button
                    onClick={() => handleGenerate("Tăng cường phần kêu gọi hành động Audit hồ sơ 1.5 - 3 triệu để bảo vệ dòng tiền")}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 hover:border-rose-500 transition-all"
                  >
                    🎯 Đẩy mạnh CTA Audit 1.5-3Tr
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
