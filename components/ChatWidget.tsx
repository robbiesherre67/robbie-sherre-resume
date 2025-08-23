"use client";
import { useState, useRef } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role:"user"|"assistant";content:string}[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setMessages(m => [...m, { role: "user", content: text }]);
    setInput("");
    const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ message: text }) });
    const json = await res.json();
    setMessages(m => [...m, { role: "assistant", content: json.reply }]);
    queueMicrotask(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }));
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Robbie chat"
        className="fixed right-5 bottom-5 rounded-full border px-4 py-2 shadow-sm"
      >
        Chat with AI Robbie
      </button>

      {open && (
        <div className="fixed right-5 bottom-24 w-80 max-h-[70vh] bg-white border rounded-xl flex flex-col shadow-lg">
          <div className="p-3 border-b font-semibold">AI Robbie</div>
          <div ref={listRef} className="p-3 overflow-y-auto flex-1 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`${m.role === "user" ? "bg-blue-50" : "bg-gray-100"} px-3 py-2 rounded-lg max-w-[280px] whitespace-pre-wrap`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about React, AEM, AWS…"
              className="flex-1 border rounded-md px-2 py-2"
            />
            <button onClick={send}>Send</button>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
