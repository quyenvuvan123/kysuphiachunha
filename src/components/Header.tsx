import React from "react";
import {
  ShieldCheck,
  HardHat,
  FileSearch,
  Sparkles,
  Wrench,
  CheckCircle,
  Scale,
  Calendar,
  MessageSquare,
  Bookmark,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, savedCount }) => {
  return (
    <header className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* Bento Header Box */}
      <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800 p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-slate-950 font-black shadow-md border border-orange-400 shrink-0">
              <HardHat className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight italic text-white flex items-center gap-2">
                  VŨ VĂN QUYỀN <span className="text-orange-500 font-normal">|</span> KỸ SƯ PHÍA CHỦ NHÀ
                </h1>
              </div>
              <p className="text-slate-400 uppercase text-[11px] tracking-wider font-semibold mt-0.5">
                Chuyên gia MEP & Quản lý cải tạo chung cư — 15 Năm Kinh Nghiệm Hà Nội
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-1.5 shrink-0">
            <div className="bg-orange-500 text-slate-950 px-4 py-1 rounded-full font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
              <span>BẢO VỆ DÒNG TIỀN</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              #kysuphiachunha #auditbaogia #caitaonhachungcu
            </p>
          </div>
        </div>

        {/* Bento Tab Navigation */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <button
              id="tab-generator"
              onClick={() => setActiveTab("generator")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "generator"
                  ? "bg-orange-500 text-slate-950 shadow-md ring-2 ring-orange-400"
                  : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Content Studio (5 Trụ Cột)</span>
            </button>

            <button
              id="tab-audit"
              onClick={() => setActiveTab("audit")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "audit"
                  ? "bg-orange-500 text-slate-950 shadow-md ring-2 ring-orange-400"
                  : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
              }`}
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Audit Báo Giá & Bẫy Hợp Đồng</span>
            </button>

            <button
              id="tab-calendar"
              onClick={() => setActiveTab("calendar")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "calendar"
                  ? "bg-orange-500 text-slate-950 shadow-md ring-2 ring-orange-400"
                  : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Lịch Đăng 7 Ngày (40/20/15/15/10)</span>
            </button>

            <button
              id="tab-knowledge"
              onClick={() => setActiveTab("knowledge")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "knowledge"
                  ? "bg-orange-500 text-slate-950 shadow-md ring-2 ring-orange-400"
                  : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Thư Viện 4 Lớp Kỹ Thuật</span>
            </button>

            <button
              id="tab-chat"
              onClick={() => setActiveTab("chat")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "chat"
                  ? "bg-orange-500 text-slate-950 shadow-md ring-2 ring-orange-400"
                  : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Trợ Lý Kỹ Sư Quyền</span>
            </button>
          </nav>

          <button
            id="tab-saved"
            onClick={() => setActiveTab("saved")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "saved"
                ? "bg-amber-400 text-slate-950 shadow-md"
                : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Kho Bài Lưu</span>
            {savedCount > 0 && (
              <span className="ml-1 bg-orange-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
