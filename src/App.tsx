import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { BentoGridHero } from "./components/BentoGridHero";
import { ContentGenerator } from "./components/ContentGenerator";
import { QuotationAuditTool } from "./components/QuotationAuditTool";
import { ContentCalendarView } from "./components/ContentCalendarView";
import { MEPKnowledgeBase } from "./components/MEPKnowledgeBase";
import { EngineerChatModal } from "./components/EngineerChatModal";
import { SavedContentDrawer } from "./components/SavedContentDrawer";
import { GeneratedContentItem, ContentPillar, ContentFormat } from "./types";
import { ShieldCheck, HardHat, Mail, MapPin } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("generator");
  const [showBentoOverview, setShowBentoOverview] = useState<boolean>(true);
  const [savedItems, setSavedItems] = useState<GeneratedContentItem[]>(() => {
    try {
      const stored = localStorage.getItem("saved_mep_posts");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [initialTopicPreset, setInitialTopicPreset] = useState<{
    pillar: ContentPillar;
    topic: string;
    specificDetails: string;
    format?: ContentFormat;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("saved_mep_posts", JSON.stringify(savedItems));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  }, [savedItems]);

  const handleSaveContent = (item: GeneratedContentItem) => {
    setSavedItems((prev) => [item, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Anh/chị có chắc chắn muốn xóa toàn bộ kho bài đã lưu không?")) {
      setSavedItems([]);
    }
  };

  const handleSelectTopicForGenerator = (pillar: ContentPillar, topic: string, details: string) => {
    setInitialTopicPreset({
      pillar,
      topic,
      specificDetails: details,
    });
    setActiveTab("generator");
  };

  const handleQuickBentoAction = (tab: string, pillar?: ContentPillar, format?: ContentFormat) => {
    if (pillar || format) {
      setInitialTopicPreset({
        pillar: pillar || "pillar1_mep_tech",
        topic:
          pillar === "pillar1_mep_tech"
            ? "Giải mã bẫy ống PPR Tiền Phong mỏng C1 và kiểm tra áp lực 10 bar"
            : pillar === "pillar2_case_debunk"
            ? "Đố anh/chị 3 giây nhìn ra bẫy 18 triệu trong báo giá phòng tắm này?"
            : "Bàn giao chung cư Hà Nội 2026-2027: Làn sóng thợ chạy show",
        specificDetails:
          "Thẩm định chi tiết theo tiêu chuẩn 15 năm MEP thực chiến của Kỹ Sư Phía Chủ Nhà tại Hà Nội.",
        format: format || "facebook_deep_dive",
      });
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      {/* Top Bento Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Bento Grid Hero Overview Bar */}
        <BentoGridHero onQuickAction={handleQuickBentoAction} />

        {/* Tab Modules */}
        <div className="mt-2">
          {activeTab === "generator" && (
            <ContentGenerator
              onSaveContent={handleSaveContent}
              initialTopicPreset={initialTopicPreset}
            />
          )}

          {activeTab === "audit" && (
            <QuotationAuditTool
              onSaveContent={handleSaveContent}
              onSendToGenerator={(topic, details) => {
                setInitialTopicPreset({
                  pillar: "pillar2_case_debunk",
                  topic,
                  specificDetails: details,
                });
                setActiveTab("generator");
              }}
            />
          )}

          {activeTab === "calendar" && (
            <ContentCalendarView onSelectTopicForGenerator={handleSelectTopicForGenerator} />
          )}

          {activeTab === "knowledge" && (
            <MEPKnowledgeBase onSendToGenerator={handleSelectTopicForGenerator} />
          )}

          {activeTab === "chat" && <EngineerChatModal />}

          {activeTab === "saved" && (
            <SavedContentDrawer
              savedItems={savedItems}
              onDeleteItem={handleDeleteItem}
              onClearAll={handleClearAll}
            />
          )}
        </div>
      </main>

      {/* Bento Grid Themed Footer */}
      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-12 text-xs">
        <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-slate-950 font-black">
                <HardHat className="w-4 h-4" />
              </div>
              <span className="italic">VŨ VĂN QUYỀN | KỸ SƯ PHÍA CHỦ NHÀ</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              15 năm kinh nghiệm MEP & Quản lý cải tạo căn hộ chung cư tại Hà Nội. Đại diện độc lập bảo vệ quyền lợi và dòng tiền cho chủ nhà.
            </p>
            <p className="text-orange-400 font-semibold italic border-l-2 border-orange-500 pl-2.5">
              "Tôi thay anh/chị kiểm soát căn hộ, thợ, chi phí, sửa chữa và cải tạo để anh/chị không mất tiền oan."
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-orange-400 uppercase text-[11px] tracking-wider">
              Dịch Vụ Cốt Lõi:
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Audit Hồ Sơ Báo Giá Trước Khi Ký (1.5 - 3.0 Triệu)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Đại Diện Chủ Nhà Kiểm Soát Kỹ Thuật Cải Tạo</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Quản Gia Kỹ Thuật Định Kỳ (MEP Chung Cư)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-orange-400 uppercase text-[11px] tracking-wider">
              Khu Vực & Hashtags:
            </h4>
            <div className="space-y-1.5 text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Hà Nội (Vinhomes Smart City, Ocean Park, Masteri, Ecopark...)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>quyen.mevietnam@gmail.com</span>
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[11px]">
              <span className="bg-slate-800 text-orange-300 px-2 py-0.5 rounded-md border border-slate-700">#kysuphiachunha</span>
              <span className="bg-slate-800 text-orange-300 px-2 py-0.5 rounded-md border border-slate-700">#caitaonhachungcu</span>
              <span className="bg-slate-800 text-orange-300 px-2 py-0.5 rounded-md border border-slate-700">#auditbaogia</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-slate-500 text-[11px]">
          © 2026 Kỹ Sư Phía Chủ Nhà. Content AI Agent xây dựng riêng cho Anh Vũ Văn Quyền (Bento Grid Theme).
        </div>
      </footer>
    </div>
  );
}
