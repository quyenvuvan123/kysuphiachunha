import React from "react";
import { ContentPillar, ContentFormat } from "../types";
import {
  ShieldAlert,
  HardHat,
  ArrowRight,
  TrendingUp,
  FileSearch,
  Sparkles,
  Video,
  FileText,
  HelpCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface BentoGridHeroProps {
  onQuickAction: (tab: string, pillar?: ContentPillar, format?: ContentFormat) => void;
}

export const BentoGridHero: React.FC<BentoGridHeroProps> = ({ onQuickAction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
      {/* 1. Core Commitment & Brand Promise (Col 8, Row 2 on desktop) */}
      <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <HardHat className="w-4 h-4" />
            <span>KỸ SƯ PHÍA CHỦ NHÀ — CAM KẾT ĐỘC LẬP</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 italic leading-snug">
            "Tôi thay anh/chị kiểm soát căn hộ, thợ và chi phí để không mất tiền oan."
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 border-l-4 border-orange-500 pl-3.5 leading-relaxed">
            Đứng về phía chủ nhà 100%. Không bán vật liệu. Không thi công trọn gói. Không nhận hoa hồng đại lý. Chỉ bảo vệ dòng tiền và quyền lợi tối cao của khách hàng.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Bảo vệ căn hộ bàn giao thô & cải tạo MEP tại Hà Nội
          </span>
          <button
            onClick={() => onQuickAction("audit")}
            className="bg-slate-900 hover:bg-orange-500 hover:text-slate-950 text-white font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs shadow-sm"
          >
            <span>Soi Báo Giá Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Core Services Card (Col 4, Dark Bento Tile) */}
      <div className="md:col-span-4 bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-orange-400 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-400" /> Dịch Vụ Cốt Lõi
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 font-mono">
              2026
            </span>
          </div>

          <ul className="space-y-3">
            <li
              onClick={() => onQuickAction("audit")}
              className="cursor-pointer group hover:bg-slate-800/80 p-2 rounded-xl transition-all flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors block">
                  Audit Hồ Sơ Trước Ký
                </span>
                <span className="text-slate-400 text-xs italic">1.5 - 3.0 Triệu VNĐ</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
            </li>

            <li
              onClick={() => onQuickAction("knowledge")}
              className="cursor-pointer group hover:bg-slate-800/80 p-2 rounded-xl transition-all flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors block">
                  Đại Diện Kiểm Soát Cải Tạo
                </span>
                <span className="text-slate-400 text-xs italic">Giám sát hiện trường & MEP</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
            </li>

            <li
              onClick={() => onQuickAction("chat")}
              className="cursor-pointer group hover:bg-slate-800/80 p-2 rounded-xl transition-all flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors block">
                  Quản Gia Kỹ Thuật Định Kỳ
                </span>
                <span className="text-slate-400 text-xs italic">Bảo trì hệ thống MEP căn hộ</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
            </li>
          </ul>
        </div>

        {/* Watermark 15 */}
        <div className="absolute -bottom-6 -right-4 text-8xl font-black text-slate-800/40 select-none pointer-events-none">
          15
        </div>
      </div>

      {/* 3. Content Strategy Bento Box (Col 4) */}
      <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Chiến Lược Nội Dung (5 Trụ)
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">100% MA TRẬN</span>
          </div>

          <div className="space-y-2">
            <div
              onClick={() => onQuickAction("generator", "pillar1_mep_tech")}
              className="bg-slate-50 hover:bg-slate-100 cursor-pointer p-2.5 rounded-xl border-l-4 border-slate-900 transition-all"
            >
              <div className="flex justify-between text-xs font-bold mb-1 text-slate-800">
                <span>T1: 4 Lớp Kỹ Thuật MEP</span>
                <span className="text-blue-600">40%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-slate-900 h-full w-[40%]"></div>
              </div>
            </div>

            <div
              onClick={() => onQuickAction("generator", "pillar2_case_debunk")}
              className="bg-slate-50 hover:bg-slate-100 cursor-pointer p-2.5 rounded-xl border-l-4 border-orange-500 transition-all"
            >
              <div className="flex justify-between text-xs font-bold mb-1 text-slate-800">
                <span>T2: Case Thật / Vạch Lỗi</span>
                <span className="text-orange-600">20%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[20%]"></div>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 text-[11px] text-slate-600">
              <div
                onClick={() => onQuickAction("generator", "pillar3_market_trends")}
                className="cursor-pointer hover:text-slate-950 flex justify-between font-medium"
              >
                <span>T3: Thị Trường & Xu Hướng 2026</span>
                <span className="font-bold text-emerald-600">15%</span>
              </div>
              <div
                onClick={() => onQuickAction("generator", "pillar4_behind_scenes")}
                className="cursor-pointer hover:text-slate-950 flex justify-between font-medium"
              >
                <span>T4: Hậu Trường Nghề 15 Năm</span>
                <span className="font-bold text-purple-600">15%</span>
              </div>
              <div
                onClick={() => onQuickAction("generator", "pillar5_conversion")}
                className="cursor-pointer hover:text-slate-950 flex justify-between font-medium"
              >
                <span>T5: Chuyển Đổi & Lời Mời Audit</span>
                <span className="font-bold text-rose-600">10%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-slate-700">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Văn phong định danh</p>
          <p className="text-xs font-semibold italic text-slate-800 mt-0.5">
            Sắc bén, sòng phẳng, đậm chất kỹ thuật Hải Phòng.
          </p>
        </div>
      </div>

      {/* 4. Client Pain Points Bento Box (Col 4, Orange Accent Tile) */}
      <div className="md:col-span-4 bg-orange-50/80 rounded-2xl border border-orange-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-orange-200/80 pb-2 mb-3">
            <h3 className="font-bold text-orange-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />
              Điểm Đau Khách Hàng
            </h3>
            <span className="text-[10px] text-orange-700 font-bold bg-orange-200/60 px-2 py-0.5 rounded">
              CẦN GIẢI QUYẾT
            </span>
          </div>

          <ul className="space-y-2 text-xs">
            <li className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
                !
              </span>
              <p className="text-orange-950 font-medium leading-tight">
                Sợ bị tráo đổi vật tư, thiết bị MEP âm tường (ống nước mỏng, dây điện nhái).
              </p>
            </li>
            <li className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
                !
              </span>
              <p className="text-orange-950 font-medium leading-tight">
                Bẫy giá rẻ ban đầu, sau đó phát sinh 20-40% trong quá trình thi công.
              </p>
            </li>
            <li className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
                !
              </span>
              <p className="text-orange-950 font-medium leading-tight">
                Nhà thầu báo giá lấp lửng, thiếu mã hàng và không cam kết bảo hành.
              </p>
            </li>
            <li className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
                !
              </span>
              <p className="text-orange-950 font-medium leading-tight">
                Rủi ro cháy nổ điện hoặc ngấm nước sàn gỗ sau 1-2 năm sử dụng.
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-2xs">
          <p className="text-[10px] text-orange-600 font-bold uppercase">Giải pháp Engineering</p>
          <p className="text-[11px] text-slate-700 mt-0.5">
            Bảo vệ dòng tiền tuyệt đối qua Audit hồ sơ & Giám sát kỹ thuật độc lập.
          </p>
        </div>
      </div>

      {/* 5 & 6. Quick Channel Cards (Col 4 total: 2 sub cards) */}
      <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-between">
        {/* TikTok / Shorts Card */}
        <div
          onClick={() => onQuickAction("generator", "pillar1_mep_tech", "tiktok_shorts_3col")}
          className="bg-white hover:bg-slate-50 cursor-pointer rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3 transition-all flex-1 group"
        >
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              TikTok / YouTube Shorts
            </p>
            <p className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors mt-0.5">
              Hook 3s + Kịch bản 3 Cột [Time/Action/Dialog]
            </p>
          </div>
          <div className="w-9 h-9 bg-slate-900 group-hover:bg-orange-500 group-hover:text-slate-950 rounded-xl flex items-center justify-center text-white shrink-0 transition-colors">
            <Video className="w-4 h-4" />
          </div>
        </div>

        {/* Facebook Post Card */}
        <div
          onClick={() => onQuickAction("generator", "pillar2_case_debunk", "facebook_deep_dive")}
          className="bg-white hover:bg-slate-50 cursor-pointer rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3 transition-all flex-1 group"
        >
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Facebook Cá Nhân Chuyên Sâu
            </p>
            <p className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors mt-0.5">
              Post Bóc Tách Kỹ Thuật & Đố Tương Tác Vạch Lỗi
            </p>
          </div>
          <div className="w-9 h-9 bg-blue-600 group-hover:bg-orange-500 group-hover:text-slate-950 rounded-xl flex items-center justify-center text-white shrink-0 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
