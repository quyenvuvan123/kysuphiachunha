import React, { useState } from "react";
import { GeneratedContentItem } from "../types";
import { Bookmark, Trash2, Copy, Check, Hash, Calendar, FileText, Search } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface SavedContentDrawerProps {
  savedItems: GeneratedContentItem[];
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const SavedContentDrawer: React.FC<SavedContentDrawerProps> = ({
  savedItems,
  onDeleteItem,
  onClearAll,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<GeneratedContentItem | null>(
    savedItems.length > 0 ? savedItems[0] : null
  );

  const filtered = savedItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (item: GeneratedContentItem) => {
    navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bento Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-orange-500" />
            Kho Bài Viết & Kịch Bản Đã Lưu ({savedItems.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Quản lý các bài viết Facebook chuyên sâu, kịch bản video TikTok 3 cột và bài cảnh báo báo giá đã tạo.
          </p>
        </div>

        {savedItems.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa Toàn Bộ Kho</span>
          </button>
        )}
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">Kho bài viết đang trống</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Khi tạo nội dung trong Studio hoặc chạy Audit Báo Giá, hãy nhấn nút "Lưu Kho" để gom bài viết vào đây.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: List (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 shadow-sm"
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedItem?.id === item.id
                      ? "bg-orange-50/80 border-orange-500 text-slate-950 shadow-sm ring-1 ring-orange-500"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-orange-600 font-bold uppercase">
                      {item.format === "tiktok_shorts_3col"
                        ? "TikTok 3 Cột"
                        : item.format === "facebook_quiz_puzzle"
                        ? "Đố Vạch Lỗi"
                        : "Facebook"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Preview & Action (8 Cols) */}
          <div className="lg:col-span-8">
            {selectedItem ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedItem.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Lưu lúc: {new Date(selectedItem.timestamp).toLocaleString("vi-VN")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeleteItem(selectedItem.id)}
                      className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl border border-slate-200 hover:border-rose-300 transition-all flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                    <button
                      onClick={() => handleCopy(selectedItem)}
                      className="px-4 py-1.5 text-xs bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      {copiedId === selectedItem.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === selectedItem.id ? "Đã Sao Chép!" : "Sao Chép Bài Đăng"}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm leading-relaxed max-h-[500px] overflow-y-auto">
                  <ReactMarkdown
                    components={{
                      table: ({ ...props }) => (
                        <div className="overflow-x-auto my-3 border border-slate-700 rounded-lg">
                          <table className="min-w-full divide-y divide-slate-700 text-left text-xs" {...props} />
                        </div>
                      ),
                      thead: ({ ...props }) => <thead className="bg-slate-800 text-orange-300 font-bold" {...props} />,
                      th: ({ ...props }) => <th className="px-3 py-2 border-b border-slate-700" {...props} />,
                      td: ({ ...props }) => <td className="px-3 py-2 border-b border-slate-800 text-slate-200" {...props} />,
                      p: ({ ...props }) => <p className="my-2 whitespace-pre-line" {...props} />,
                      strong: ({ ...props }) => <strong className="text-orange-400 font-bold" {...props} />,
                    }}
                  >
                    {selectedItem.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 shadow-sm">
                Chọn một bài viết ở danh sách bên trái để xem trước nội dung.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
