import React, { useState } from "react";
import { CalendarDayPlan, ContentPillar } from "../types";
import {
  Calendar,
  Sparkles,
  Clock,
  Send,
  RefreshCw,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  HardHat,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ContentCalendarViewProps {
  onSelectTopicForGenerator: (pillar: ContentPillar, topic: string, details: string) => void;
}

const DEFAULT_7_DAYS: CalendarDayPlan[] = [
  {
    day: "Thứ Hai",
    pillar: "Trụ 1: 4 Lớp Kỹ Thuật (40%)",
    format: "Facebook Chuyên Sâu",
    title: "Giải mã bẫy ống PPR Tiền Phong mỏng C1 dùng cho bình nóng lạnh",
    hook: "Đừng để tiền hoàn thiện 200 triệu trôi theo dòng nước bục ống chỉ vì 1 dòng báo giá lấp lửng!",
    summary: "Phân tích vì sao bắt buộc phải dùng ống PN16/PN20 cho đường nước nóng, kiểm tra độ dày và quy trình thử áp lực 10 bar trước khi trát tường.",
    cta: "Chụp ảnh bảng báo giá gửi ngay để Kỹ Sư Quyền soi mã vật tư chuẩn.",
    bestPostingTime: "08:30 - 09:30 Sáng",
  },
  {
    day: "Thứ Ba",
    pillar: "Trụ 2: Case Thật / Vạch Lỗi (20%)",
    format: "Facebook Đố Tương Tác",
    title: "Đố anh/chị 3 giây nhìn ra bẫy 18 triệu trong báo giá phòng tắm này?",
    hook: "Thợ báo giá rẻ hơn 15 triệu so với thị trường nhưng lại gài bẫy này, anh/chị có nhìn ra không?",
    summary: "Đưa ra trích đoạn báo giá thiếu chống thấm cổ ống và dùng xi măng dầu quét 1 lớp. Kèm 4 phương án A-B-C-D cho cộng đồng bình luận tương tác.",
    cta: "Comment đáp án bên dưới, tôi sẽ inbox phân tích chi tiết từng lỗi!",
    bestPostingTime: "11:30 - 12:30 Trưa",
  },
  {
    day: "Thứ Tư",
    pillar: "Trụ 1: 4 Lớp Kỹ Thuật (40%)",
    format: "TikTok / Shorts (Kịch bản 3 Cột)",
    title: "3 Lỗi Chết Người Khi Thợ Đi Dây Điện Âm Tường Chung Cư",
    hook: "[Giữ ổ cắm chập cháy bốc khói] Dây điện thiếu dây tiếp địa PE nguy hiểm đến mức nào?",
    summary: "Kịch bản video thực chiến 45s: 1. Thiếu dây PE - 2. Dây bếp từ quá nhỏ (dùng 2.5 thay vì 4.0) - 3. Không có RCBO chống giật.",
    cta: "Follow kênh Kỹ Sư Phía Chủ Nhà để không mất tiền oan khi cải tạo.",
    bestPostingTime: "19:30 - 20:30 Tối",
  },
  {
    day: "Thứ Năm",
    pillar: "Trụ 3: Thị Trường & Xu Hướng (15%)",
    format: "Facebook Chuyên Sâu",
    title: "Bàn giao chung cư Hà Nội 2026-2027: Làn sóng thợ chạy show và bẫy phát sinh",
    hook: "Nhận nhà cuối năm chịu áp lực lãi vay ngân hàng, coi chừng gật đầu bừa với báo giá giá rẻ!",
    summary: "Phân tích giá nhân công thợ MEP Hà Nội 2026, áp lực tiến độ bàn giao và lời khuyên bình tĩnh kiểm soát chất lượng.",
    cta: "Cần một người đứng về phía bạn giữ chặt dòng tiền? Nhắn cho tôi.",
    bestPostingTime: "08:30 - 09:30 Sáng",
  },
  {
    day: "Thứ Sáu",
    pillar: "Trụ 4: Hậu Trường Nghề 15 Năm MEP (15%)",
    format: "Facebook Câu Chuyện / Hậu Trường",
    title: "15 năm làm MEP: Vì sao tôi tuyệt đối không nhận làm thầu trọn gói?",
    hook: "Vừa đá bóng vừa thổi còi thì làm sao bảo vệ được chủ nhà?",
    summary: "Tâm sự về sự trung lập: Không bán vật tư, không ăn hoa hồng chiết khấu, chỉ đứng về phía chủ nhà để nói sự thật.",
    cta: "Chia sẻ cho người thân chuẩn bị nhận nhà để tránh rơi vào thế bị động.",
    bestPostingTime: "12:00 - 13:00 Trưa",
  },
  {
    day: "Thứ Bảy",
    pillar: "Trụ 1: 4 Lớp Kỹ Thuật (40%)",
    format: "Facebook Chuyên Sâu & Check-list",
    title: "Checklist 10 Điểm Soi Bản Vẽ MEP Trước Khi Thợ Bắt Đầu Đục Tường",
    hook: "Đục nhầm dầm chịu lực hoặc cắt nhầm ống thoát nước tòa nhà: Đền tiền trăm triệu!",
    summary: "Hướng dẫn chủ nhà 10 vị trí nhạy cảm cần đối chiếu giữa bản vẽ thiết kế và hiện trạng hộp kỹ thuật chung cư.",
    cta: "Lưu lại bài viết này hoặc gửi bản vẽ để Kỹ Sư Quyền kiểm tra hộ.",
    bestPostingTime: "09:00 - 10:00 Sáng",
  },
  {
    day: "Chủ Nhật",
    pillar: "Trụ 5: Lời Mời / Chuyển Đổi (10%)",
    format: "Facebook Chuyển Đổi & Lời Mời",
    title: "Gói Audit Báo Giá 1.5 - 3 Triệu: Khóa Chặt 40 Triệu Tiền Phát Sinh Ảo",
    hook: "Bỏ ra 1.5 - 3 triệu để đổi lấy sự an tâm tuyệt đối và bảo vệ hàng trăm triệu tiền hoàn thiện.",
    summary: "Giới thiệu dịch vụ Audit hồ sơ 24h: Soi từng mã vật tư, phát hiện bẫy câu chữ, lập bảng phản biện ép nhà thầu cam kết trọn gói.",
    cta: "Chỉ nhận 5 căn hộ trong tuần tới để đảm bảo chất lượng thẩm định kỹ nhất. Inbox ngay!",
    bestPostingTime: "20:00 - 21:30 Tối",
  },
];

export const ContentCalendarView: React.FC<ContentCalendarViewProps> = ({
  onSelectTopicForGenerator,
}) => {
  const [calendarDays, setCalendarDays] = useState<CalendarDayPlan[]>(DEFAULT_7_DAYS);
  const [projectFocus, setProjectFocus] = useState(
    "Cải tạo hoàn thiện chung cư bàn giao thô tại Hà Nội 2026-2027 (Vin, Masteri, Ecopark...)"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerateAiCalendar = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/content/generate-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectFocus,
          targetWeek: "Kế hoạch tuần thực chiến",
        }),
      });

      const data = await response.json();
      if (data.success && Array.isArray(data.calendar) && data.calendar.length > 0) {
        setCalendarDays(data.calendar);
        try {
          confetti({ particleCount: 40, spread: 60 });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage(data.error || "Không thể tạo lịch tuần mới. Vui lòng thử lại.");
      }
    } catch (err: any) {
      console.error("Error generating calendar:", err);
      setErrorMessage(err.message || "Lỗi kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPillarPill = (pillarText: string) => {
    if (pillarText.includes("Trụ 1") || pillarText.includes("Kỹ Thuật")) {
      return (
        <span className="text-[10px] bg-blue-100 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <Wrench className="w-3 h-3" /> Trụ 1 (40%) Kỹ Thuật MEP
        </span>
      );
    }
    if (pillarText.includes("Trụ 2") || pillarText.includes("Case") || pillarText.includes("Vạch Lỗi")) {
      return (
        <span className="text-[10px] bg-orange-100 text-orange-950 border border-orange-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <ShieldAlert className="w-3 h-3" /> Trụ 2 (20%) Case Vạch Lỗi
        </span>
      );
    }
    if (pillarText.includes("Trụ 3") || pillarText.includes("Thị Trường")) {
      return (
        <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Trụ 3 (15%) Thị Trường
        </span>
      );
    }
    if (pillarText.includes("Trụ 4") || pillarText.includes("Hậu Trường")) {
      return (
        <span className="text-[10px] bg-purple-100 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <HardHat className="w-3 h-3" /> Trụ 4 (15%) Hậu Trường 15 Năm
        </span>
      );
    }
    return (
      <span className="text-[10px] bg-rose-100 text-rose-900 border border-rose-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Trụ 5 (10%) Lời Mời Audit
      </span>
    );
  };

  const mapPillarToKey = (pillarText: string): ContentPillar => {
    if (pillarText.includes("Trụ 1") || pillarText.includes("Kỹ Thuật")) return "pillar1_mep_tech";
    if (pillarText.includes("Trụ 2") || pillarText.includes("Case") || pillarText.includes("Vạch Lỗi")) return "pillar2_case_debunk";
    if (pillarText.includes("Trụ 3") || pillarText.includes("Thị Trường")) return "pillar3_market_trends";
    if (pillarText.includes("Trụ 4") || pillarText.includes("Hậu Trường")) return "pillar4_behind_scenes";
    return "pillar5_conversion";
  };

  return (
    <div className="space-y-6">
      {/* Bento Ratio & Strategy Header Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Lịch Đăng Bài 7 Ngày (Chuẩn Tỷ Lệ 40/20/15/15/10)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Phân bổ khoa học giữa Dạy Kiến Thức Kỹ Thuật (40%), Vạch Lỗi Case Thật (20%), Thị Trường (15%), Hậu Trường Nghề (15%) và Lời Mời Audit (10%).
            </p>
          </div>
        </div>

        {/* Visual Pillar Distribution Bar */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-700">Phân Bổ Tỷ Lệ Nội Dung Chuẩn:</span>
            <span className="font-mono text-slate-600">Tổng: 100% (7 Ngày Trong Tuần)</span>
          </div>
          <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-100 border border-slate-200">
            <div style={{ width: "40%" }} className="bg-blue-600 h-full" title="Trụ 1: 40% Kỹ Thuật MEP"></div>
            <div style={{ width: "20%" }} className="bg-orange-500 h-full" title="Trụ 2: 20% Case Thật Vạch Lỗi"></div>
            <div style={{ width: "15%" }} className="bg-emerald-500 h-full" title="Trụ 3: 15% Thị Trường 2026-2027"></div>
            <div style={{ width: "15%" }} className="bg-purple-500 h-full" title="Trụ 4: 15% Hậu Trường 15 Năm MEP"></div>
            <div style={{ width: "10%" }} className="bg-rose-500 h-full" title="Trụ 5: 10% Lời Mời Audit 1.5-3Tr"></div>
          </div>
          <div className="flex flex-wrap gap-3.5 text-xs text-slate-600 pt-1 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> 40% Kỹ thuật MEP
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> 20% Case thật vạch lỗi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 15% Thị trường
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> 15% Hậu trường nghề
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> 10% Chuyển đổi Audit
            </span>
          </div>
        </div>
      </div>

      {/* Bento AI Re-plan Control Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-900 mb-1">
            Tùy biến trọng tâm chiến dịch tuần:
          </label>
          <input
            type="text"
            value={projectFocus}
            onChange={(e) => setProjectFocus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            placeholder="Ví dụ: Đợt bàn giao chung cư Smart City & bóc trần bẫy phát sinh..."
          />
        </div>
        <button
          onClick={handleGenerateAiCalendar}
          disabled={isLoading}
          className="w-full sm:w-auto mt-auto bg-orange-500 hover:bg-orange-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shrink-0 shadow disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Đang Lập Lịch Mới...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Lập Lịch Tuần Mới Bằng AI</span>
            </>
          )}
        </button>
      </div>

      {/* Error banner */}
      {errorMessage && !isLoading && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs font-medium">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={handleGenerateAiCalendar}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Thử lại</span>
          </button>
        </div>
      )}

      {/* 7 Days Bento Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calendarDays.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between space-y-3.5 transition-all hover:shadow-md shadow-sm"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  {item.day}
                </span>
                <span className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1 font-mono font-medium">
                  <Clock className="w-3 h-3 text-orange-500" />
                  {item.bestPostingTime}
                </span>
              </div>

              <div>{getPillarPill(item.pillar)}</div>

              <div className="pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Định dạng:</span>
                <p className="text-xs font-bold text-slate-800">{item.format}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-orange-950 italic mt-1.5 bg-orange-50/80 p-2.5 rounded-xl border border-orange-200/80 leading-relaxed font-medium">
                  "{item.hook}"
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <div className="text-[11px] text-slate-500 truncate">
                <strong className="text-slate-700 font-bold">CTA:</strong> {item.cta}
              </div>

              <button
                onClick={() =>
                  onSelectTopicForGenerator(
                    mapPillarToKey(item.pillar),
                    item.title,
                    `${item.summary}\nHook: ${item.hook}\nCTA: ${item.cta}`
                  )
                }
                className="w-full bg-slate-900 hover:bg-orange-500 hover:text-slate-950 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Soạn Bài Ngay Trong Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
