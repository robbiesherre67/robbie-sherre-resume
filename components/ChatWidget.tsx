"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const json = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: json.reply ?? "…" }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry—something went wrong. Try again." },
      ]);
    } finally {
      setSending(false);
      queueMicrotask(() =>
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        })
      );
    }
  }

  // Allow Enter to send (if not empty and not sending)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void send();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, input, sending]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Robbie chat"
        className="fixed right-5 bottom-5 z-50 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
      >
        Chat with AI Robbie
      </button>

      {open && (
        <div className="fixed right-5 bottom-24 z-50 flex max-h-[70vh] w-80 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b p-3 text-sm font-semibold text-gray-900 dark:border-gray-800 dark:text-gray-100">
            AI Robbie
          </div>

          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((m, i) => {
              const mine = m.role === "user";
              return (
                <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[280px] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                      mine
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 border-t px-3 py-2 dark:border-gray-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              onClick={send}
              disabled={sending || !input.trim()}
              className="h-9 shrink-0 rounded-md bg-blue-600 px-3 text-sm font-medium leading-none text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="h-9 shrink-0 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium leading-none text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}