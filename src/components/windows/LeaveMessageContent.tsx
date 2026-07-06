"use client";

import { useState } from "react";
import { links } from "@/data/portfolio";

export default function LeaveMessageContent() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio message from ${name || "Visitor"}`;
    const body = message;
    window.location.href = `mailto:${links.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div>
      <h2 className="text-sm font-bold tracking-widest mb-4 border-b border-black pb-2">
        LEAVE A MESSAGE
      </h2>

      {sent ? (
        <p className="text-gray-700">
          Opening your email client… If it didn&apos;t open, write to{" "}
          <a
            href={links.email}
            className="underline hover:no-underline"
          >
            {links.emailAddress}
          </a>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="msg-name"
              className="block text-xs font-bold mb-1.5"
            >
              Name :
            </label>
            <input
              id="msg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full border-2 border-black px-3 py-2 text-xs font-mono bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label
              htmlFor="msg-body"
              className="block text-xs font-bold mb-1.5"
            >
              Message:
            </label>
            <textarea
              id="msg-body"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              required
              className="w-full border-2 border-black px-3 py-2 text-xs font-mono bg-white placeholder:text-gray-400 resize-none overflow-y-auto custom-scrollbar focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>
      )}
    </div>
  );
}
