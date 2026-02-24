"use client";

import React from "react";

interface Message {
  type: "user" | "admin";
  text: string;
  time: string;
}

const messages: Message[] = [
  { type: "user", text: "Hi, I noticed a discrepancy in my payout for the October batch...", time: "9:30 AM" },
  { type: "admin", text: "Hello Alex. Thanks for reaching out. Let me pull up your records.", time: "9:45 AM" },
  { type: "admin", text: "I found the issue. There was a $150 adjustment processed separately.", time: "9:48 AM" },
  { type: "user", text: "Ah, I see it now under the adjustments tab. Thanks!", time: "10:42 AM" },
];

export const ChatMessages: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Date Divider */}
      <div className="flex justify-center">
        <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] uppercase rounded-full">
          Today
        </span>
      </div>

      {messages.map((msg, i) => {
        if (msg.type === "user") {
          return (
            <div key={i} className="flex justify-end">
              <div className="max-w-xl">
                <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-3 text-sm">{msg.text}</div>
                <div className="text-[10px] text-slate-400 mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={i} className="flex items-end gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold">
                AS
              </div>
              <div className="max-w-xl">
                <div className="bg-white text-slate-700 rounded-2xl px-4 py-3 text-sm shadow-sm">{msg.text}</div>
                <div className="text-[10px] text-slate-400 mt-1">{msg.time}</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};