import React, { useState } from "react";
import { KNOWLEDGE_BASE } from "../data/presets";
import { KnowledgeItem, ContentPillar } from "../types";
import {
  Wrench,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  Zap,
  Droplets,
  FileCheck2,
  BookOpen,
  ArrowRight,
  Filter,
} from "lucide-react";

interface MEPKnowledgeBaseProps {
  onSendToGenerator: (pillar: ContentPillar, topic: string, details: string) => void;
}

export const MEPKnowledgeBase: React.FC<MEPKnowledgeBaseProps> = ({ onSendToGenerator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = KNOWLEDGE_BASE.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.engineerTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Intro Bento Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-500" />
            Thư Viện 4 Lớp Kỹ Thuật & Red Flags MEP (15 Năm Thực Chiến)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Kho tri thức thực tế về bóc tách báo giá, soi bản vẽ MEP, tiêu chuẩn vật tư và quy trình nghiệm thu chống thấm tại Hà Nội.
          </p>
        </div>
        <span className="text-xs bg-slate-900 text-white font-bold px-3.5 py-1.5 rounded-full shrink-0 shadow-sm">
          Kỹ Sư Phía Chủ Nhà
        </span>
      </div>

      {/* 4 Lớp Kỹ Thuật Bento Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-blue-200 rounded-2xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
            <FileCheck2 className="w-4 h-4" />
            <span>LỚP 1: BÁO GIÁ & HỢP ĐỒNG</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Soi mã hiệu vật tư, đơn giá mét dài, cam kết trọn gói Lump-sum và điều khoản chặn đứng bẫy phát sinh 20-40%.
          </p>
        </div>

        <div className="bg-white border border-amber-200 rounded-2xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
            <Wrench className="w-4 h-4" />
            <span>LỚP 2: BẢN VẼ & KHỐI LƯỢNG</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Đối chiếu bản vẽ thiết kế với hiện trạng căn hộ thực tế, tránh đục cắt dầm chịu lực hoặc sai lệch vị trí hộp gen.
          </p>
        </div>

        <div className="bg-white border border-emerald-200 rounded-2xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
            <Zap className="w-4 h-4" />
            <span>LỚP 3: CƠ ĐIỆN NƯỚC (MEP)</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Tiêu chuẩn dây điện Cadisun thật, dây tiếp địa PE, RCBO chống giật, cấp áp lực ống PPR PN16/PN20 cho nước nóng.
          </p>
        </div>

        <div className="bg-white border border-purple-200 rounded-2xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
            <Droplets className="w-4 h-4" />
            <span>LỚP 4: CHỐNG THẤM & NGHIỆM THU</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Quy trình đục cổ ống, thanh trương nở, bo góc lưới thủy tinh, màng xi măng polymer 2 thành phần và ngâm nước 48h.
          </p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          <span className="text-xs text-slate-500 mr-1 flex items-center gap-1 font-bold">
            <Filter className="w-3.5 h-3.5 text-orange-500" /> Lọc:
          </span>
          {[
            { id: "all", label: "Tất cả" },
            { id: "mep_plumbing", label: "Cấp thoát nước" },
            { id: "mep_electrical", label: "Hệ thống Điện & An toàn" },
            { id: "waterproofing", label: "Chống thấm vệ sinh" },
            { id: "quotation_traps", label: "Bẫy báo giá & Hợp đồng" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-orange-500 text-slate-950 shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
          placeholder="Tìm từ khóa: Tiền Phong, Cadisun, RCBO..."
        />
      </div>

      {/* Knowledge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 space-y-3.5 flex flex-col justify-between shadow-sm transition-all hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                  {item.category === "mep_plumbing"
                    ? "Cấp thoát nước"
                    : item.category === "mep_electrical"
                    ? "Điện & An toàn"
                    : item.category === "waterproofing"
                    ? "Chống thấm"
                    : "Bẫy hợp đồng"}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-600" /> Nguy hiểm: {item.severity}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>

              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

              {/* Bad vs Good */}
              <div className="space-y-2 text-xs pt-1">
                <div className="bg-rose-50 border border-rose-200/80 p-2.5 rounded-xl text-slate-800">
                  <strong className="text-rose-700 flex items-center gap-1 font-bold">
                    ❌ Làm ẩu / Bẫy lấp lửng:
                  </strong>
                  <p className="text-[11px] text-slate-700 mt-0.5">{item.badPractice}</p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200/80 p-2.5 rounded-xl text-slate-800">
                  <strong className="text-emerald-700 flex items-center gap-1 font-bold">
                    ✓ Tiêu chuẩn Kỹ Sư Phía Chủ Nhà:
                  </strong>
                  <p className="text-[11px] text-slate-700 mt-0.5">{item.goodPractice}</p>
                </div>
              </div>

              {/* Engineer Tip */}
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl text-xs text-slate-800 italic">
                <strong className="not-italic text-orange-900 block mb-0.5 font-bold">
                  Lời khuyên thực chiến của Kỹ Sư Quyền:
                </strong>
                "{item.engineerTip}"
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() =>
                  onSendToGenerator(
                    "pillar1_mep_tech",
                    item.title,
                    `${item.description}\nLỗi thường gặp: ${item.badPractice}\nChuẩn kỹ thuật: ${item.goodPractice}\nKinh nghiệm 15 năm: ${item.engineerTip}`
                  )
                }
                className="w-full bg-slate-900 hover:bg-orange-500 hover:text-slate-950 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Tạo Bài Viết / Video Từ Case Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
