import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, RefreshCw, HardHat, Sparkles, User, Bot, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "Thợ bảo 'ống PPR Tiền Phong C1 đi nước nóng thoải mái', tôi nên vặn lại thế nào?",
  "Nhà thầu không chịu ghi mã sản phẩm sơn Dulux vào báo giá, lý do vì sao?",
  "Chung cư đã có aptomat tổng ở tầng, tại sao trong nhà vẫn bắt buộc phải có RCBO chống giật?",
  "Tại sao gói Audit hồ sơ 1.5 - 3 triệu lại giúp chủ nhà tiết kiệm được 40 - 70 triệu?",
];

export const EngineerChatModal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Chào anh/chị! Tôi là **Vũ Văn Quyền - Kỹ Sư Phía Chủ Nhà** (15 năm MEP tại Hà Nội).\n\nTôi ở đây để bảo vệ dòng tiền và căn hộ của anh/chị. Anh/chị đang gặp vấn đề gì với thợ, báo giá lấp lửng hay thắc mắc kỹ thuật cơ điện nước? Cứ nói thẳng, tôi sẽ chỉ rõ cách xử lý sòng phẳng nhất!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ Lỗi: ${data.error || "Không thể phản hồi."}` },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ Lỗi kết nối: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Đã làm mới phiên tư vấn. Anh/chị cần tôi thẩm định điều khoản nào hoặc phản biện lý lẽ của nhà thầu?",
      },
    ]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 max-w-4xl mx-auto flex flex-col h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-slate-950 font-black shadow-sm">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              Trợ Lý Tư Vấn Kỹ Sư Phía Chủ Nhà (Vũ Văn Quyền)
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
                Trực Tuyến 24/7
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Chuyên phản biện báo giá, bẫy thợ MEP và bảo vệ quyền lợi chủ nhà
            </p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-xs flex items-center gap-1 font-medium"
          title="Xóa đoạn chat"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Làm mới</span>
        </button>
      </div>

      {/* Quick Question Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar shrink-0 text-xs">
        <span className="text-slate-400 text-[11px] shrink-0 font-bold">Hỏi nhanh:</span>
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-[11px] bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-950 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-orange-400 transition-all shrink-0 whitespace-nowrap font-medium"
          >
            💬 {q}
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 text-xs sm:text-sm ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-900 shrink-0 mt-0.5">
                <HardHat className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 leading-relaxed ${
                msg.role === "user"
                  ? "bg-orange-500 text-slate-950 font-bold rounded-br-none shadow-sm"
                  : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose max-w-none text-xs sm:text-sm leading-relaxed text-slate-800">
                  <ReactMarkdown
                    components={{
                      p: ({ ...props }) => <p className="my-1.5 whitespace-pre-line text-slate-800" {...props} />,
                      ul: ({ ...props }) => <ul className="list-disc pl-4 my-1.5 space-y-1 text-slate-700" {...props} />,
                      ol: ({ ...props }) => <ol className="list-decimal pl-4 my-1.5 space-y-1 text-slate-700" {...props} />,
                      strong: ({ ...props }) => <strong className="text-orange-900 font-bold" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-line">{msg.content}</p>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center text-xs text-orange-600">
            <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-700 shadow-sm">
              Kỹ Sư Quyền đang gõ câu trả lời...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi kỹ thuật MEP hoặc lý lẽ thầu..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-orange-500 hover:bg-orange-400 text-slate-950 font-black px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm disabled:opacity-50 text-xs sm:text-sm"
        >
          <Send className="w-4 h-4" />
          <span>Gửi</span>
        </button>
      </form>
    </div>
  );
};
