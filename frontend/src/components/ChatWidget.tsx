import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const initialMessages = [
  {
    from: "support",
    text: "Hi! 👋 How can we help you today? (This is a demo chat widget)"
  }
];

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: input.trim() },
      {
        from: "support",
        text: "Our support team will reply soon! (You can connect your OpenAI API here later)"
      }
    ]);
    setInput("");
  };

  return (
    <>
      {/* Chat button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-xl w-16 h-16 flex items-center justify-center text-3xl focus:outline-none focus:ring-4 focus:ring-primary-400/40 transition-all"
        onClick={() => setOpen(true)}
        aria-label="Open chat support"
        style={{ boxShadow: "0 8px 32px 0 rgba(34,211,238,0.25)" }}
        tabIndex={0}
      >
        <MessageCircle className="w-8 h-8" />
      </button>
      {/* Chat modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 right-6 z-50 w-[400px] max-w-[95vw] h-[520px] bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: "0 8px 32px 0 rgba(34,211,238,0.25)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary-500/90 text-white">
              <span className="font-semibold">Support Chat</span>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-primary-700/30 rounded-full p-1 focus:outline-none"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Messages */}
            <div
              className="flex-1 px-4 py-3 space-y-2 overflow-y-auto bg-surface/80"
              style={{ maxHeight: 370 }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.from === "user" ? "text-right" : "text-left"}
                >
                  <span
                    className={
                      msg.from === "user"
                        ? "inline-block bg-primary-500 text-white rounded-xl px-3 py-2 mb-1 max-w-[80%]"
                        : "inline-block bg-white/10 text-text-default rounded-xl px-3 py-2 mb-1 max-w-[80%]"
                    }
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-border bg-surface/90 px-3 py-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-text-default placeholder-text-secondary px-2 py-2"
                autoFocus
                maxLength={300}
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-primary-500 hover:bg-primary-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-400/40 transition-all"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
