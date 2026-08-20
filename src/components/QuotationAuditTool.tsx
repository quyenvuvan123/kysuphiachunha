import React, { useState } from "react";
import { SAMPLE_QUOTATIONS } from "../data/presets";
import { AuditReportData, GeneratedContentItem } from "../types";
import { safeAuditQuotation } from "../utils/safeApiClient";
import {
  FileSearch,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  ShieldAlert,
  Zap,
  ArrowRight,
  Copy,
  Bookmark,
  Sparkles,
  RefreshCw,
  Share2,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";

interface QuotationAuditToolProps {
  onSaveContent: (item: GeneratedContentItem) => void;
  onSendToGenerator?: (topic: string, details: string) => void;
}

export const QuotationAuditTool: React.FC<QuotationAuditToolProps> = ({
  onSaveContent,
  onSendToGenerator,
}) => {
  const [quotationText, setQuotationText] = useState(SAMPLE_QUOTATIONS[0].text);
  const [apartmentType, setApartmentType] = useState(SAMPLE_QUOTATIONS[0].apartmentType);
  const [budgetExpected, setBudgetExpected] = useState(SAMPLE_QUOTATIONS[0].budgetExpected);
  const [isLoading, setIsLoading] = useState(false);
  const [auditReport, setAuditReport] = useState<AuditReportData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedPost, setCopiedPost] = useState(false);

  const handleLoadSample = (sample: typeof SAMPLE_QUOTATIONS[0]) => {
    setQuotationText(sample.text);
    setApartmentType(sample.apartmentType);
    setBudgetExpected(sample.budgetExpected);
    setErrorMessage(null);
  };

  const handleRunAudit = async () => {
    if (!quotationText.trim()) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await safeAuditQuotation({
        quotationText,
        apartmentType,
        budgetExpected,
      });

      if (data.success && data.auditReport) {
        setAuditReport(data.auditReport);
        try {
          confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 } });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage("Không thể thực hiện audit báo giá. Vui lòng thử lại.");
      }
    } catch (err: any) {
      console.error("Audit error:", err);
      setErrorMessage(err.message || "Lỗi kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWarningPost = () => {
    if (!auditReport?.readyToShareWarningPost) return;
    const newItem: GeneratedContentItem = {
      id: Date.now().toString(),
      title: `Vạch trần báo giá: ${apartmentType}`,
      pillar: "pillar2_case_debunk",
      format: "facebook_deep_dive",
      content: auditReport.readyToShareWarningPost,
      timestamp: Date.now(),
      tags: ["#kysuphiachunha", "#caitaonhachungcu", "#auditbaogia"],
    };
    onSaveContent(newItem);
    alert("Đã lưu bài viết cảnh báo vào Kho Bài Đã Lưu!");
  };

  const handleCopyWarningPost = () => {
    if (!auditReport?.readyToShareWarningPost) return;
    navigator.clipboard.writeText(auditReport.readyToShareWarningPost);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Bento Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-orange-500" />
            Máy Soi Báo Giá & Bẫy Hợp Đồng Cải Tạo (4 Lớp Kỹ Thuật)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Phát hiện tức thì các chiêu trò báo giá giá rẻ ban đầu rồi đội phát sinh 20-40%, thiếu mã vật tư, mập mờ MEP và rủi ro thấm dột.
          </p>
        </div>
        <div className="bg-orange-100 text-orange-950 border border-orange-200 px-3.5 py-1.5 rounded-full text-xs font-black shrink-0">
          Gói Audit Thực Tế: 1.5 - 3.0 Triệu / Căn Hộ
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Bento Form: Input Quotation (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-100 pb-2">
              Nạp Báo Giá Mẫu Có Sẵn:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_QUOTATIONS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLoadSample(sample)}
                  className="text-left p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-orange-50/80 hover:border-orange-400 transition-all text-xs text-slate-800"
                >
                  <p className="font-bold text-orange-600">⚡ {sample.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{sample.apartmentType}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loại căn hộ & Hiện trạng:
                </label>
                <input
                  type="text"
                  value={apartmentType}
                  onChange={(e) => setApartmentType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  placeholder="Ví dụ: Chung cư 2PN 70m2 bàn giao thô"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ngân sách dự kiến:
                </label>
                <input
                  type="text"
                  value={budgetExpected}
                  onChange={(e) => setBudgetExpected(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  placeholder="Ví dụ: 180.000.000đ"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-900">
                  Dán nội dung bảng báo giá / điều khoản:
                </label>
                <span className="text-[11px] text-slate-400">Từ Excel / Word / Zalo</span>
              </div>
              <textarea
                value={quotationText}
                onChange={(e) => setQuotationText(e.target.value)}
                rows={9}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-y leading-relaxed"
                placeholder="Dán các dòng báo giá của nhà thầu vào đây..."
              />
            </div>

            <button
              type="button"
              onClick={handleRunAudit}
              disabled={isLoading || !quotationText.trim()}
              className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-black py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Kỹ Sư Quyền Đang Rà Soát 4 Lớp Kỹ Thuật...</span>
                </>
              ) : (
                <>
                  <FileSearch className="w-4 h-4" />
                  <span>Chạy Audit Báo Giá & Vạch Lỗi</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Area: Audit Report Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {errorMessage && !isLoading && (
            <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <p className="text-xs font-medium">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={handleRunAudit}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Thử lại</span>
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-8 text-center space-y-4 min-h-[500px] flex flex-col items-center justify-center shadow-md">
              <div className="w-14 h-14 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Đang thực hiện Thẩm định 4 Lớp</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Đang kiểm tra: 1. Mã vật tư & đơn giá - 2. Khối lượng ẩn - 3. An toàn MEP & Chống thấm - 4. Điều khoản hợp đồng
                </p>
              </div>
            </div>
          ) : auditReport ? (
            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
              {/* Score & Risk Summary Bento Tile */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center shadow-inner">
                      <span
                        className={`text-2xl font-black ${
                          auditReport.overallScore < 50
                            ? "text-rose-500"
                            : auditReport.overallScore < 75
                            ? "text-orange-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {auditReport.overallScore}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">/100 Điểm</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">Mức Độ Rủi Ro:</h3>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                            auditReport.riskLevel === "Cao"
                              ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                              : auditReport.riskLevel === "Trung bình"
                              ? "bg-orange-500/20 text-orange-400 border-orange-500/40"
                              : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          }`}
                        >
                          {auditReport.riskLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                        Ước tính phát sinh ẩn:{" "}
                        <strong className="text-rose-400 font-bold">
                          {auditReport.estimatedHiddenExtraCostPercent}
                        </strong>{" "}
                        ({auditReport.estimatedExtraAmount})
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400">Hành động khuyến nghị:</span>
                    <p className="text-xs font-semibold text-orange-300 max-w-xs text-left sm:text-right">
                      {auditReport.recommendedAction}
                    </p>
                  </div>
                </div>

                {/* Engineer Verdict */}
                {auditReport.engineerVerdict && (
                  <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-300 italic bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
                    <span className="font-bold text-orange-400 not-italic shrink-0">
                      Lời bình KS. Quyền:
                    </span>
                    <span>"{auditReport.engineerVerdict}"</span>
                  </div>
                )}
              </div>

              {/* Critical Red Flags Breakdown */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Các Bẫy Phát Sinh & Điểm Mờ Trong Báo Giá:
                </h4>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {auditReport.criticalRedFlags?.map((flag, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs space-y-1.5 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-200">
                        <span className="text-orange-300">📌 {flag.item}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Trích: {flag.quotedDescription}
                        </span>
                      </div>
                      <p className="text-slate-300">
                        <strong className="text-rose-400">Bẫy:</strong> {flag.trapExplanation}
                      </p>
                      <p className="text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/50">
                        <strong className="text-emerald-400">Lời khuyên phản biện:</strong>{" "}
                        {flag.engineerAdvice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MEP Hazards & Missing Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <h5 className="font-bold text-orange-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    Rủi Ro An Toàn Cơ Điện Nước (MEP):
                  </h5>
                  <ul className="space-y-1 text-slate-300 list-disc pl-4 text-[11px]">
                    {auditReport.mepSafetyRisks?.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <h5 className="font-bold text-blue-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Hạng Mục Bị Cố Tình Bỏ Quên:
                  </h5>
                  <ul className="space-y-1 text-slate-300 list-disc pl-4 text-[11px]">
                    {auditReport.missingItems?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ready To Share Facebook Warning Post */}
              {auditReport.readyToShareWarningPost && (
                <div className="bg-slate-950 border border-orange-500/30 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-xs font-bold text-orange-300 flex items-center gap-1.5 uppercase">
                      <Share2 className="w-4 h-4 text-orange-400" />
                      Bài Viết Cảnh Báo Facebook Mẫu (Từ Case Này):
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleSaveWarningPost}
                        className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1 transition-all"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Lưu Kho</span>
                      </button>
                      <button
                        onClick={handleCopyWarningPost}
                        className="px-3.5 py-1 text-xs bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 shadow transition-all"
                      >
                        {copiedPost ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPost ? "Đã Sao Chép!" : "Sao Chép Bài Đăng"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs text-slate-200 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-sans">
                    {auditReport.readyToShareWarningPost}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400 space-y-3 min-h-[500px] flex flex-col items-center justify-center shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                <FileSearch className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Chưa thực hiện Audit</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Chọn mẫu báo giá có sẵn hoặc dán nội dung báo giá cần thẩm định ở bên trái, sau đó nhấn "Chạy Audit Báo Giá & Vạch Lỗi".
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
