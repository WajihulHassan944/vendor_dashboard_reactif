"use client";

import React from "react";

interface Conversation {
  title: string;
  time: string;
  ticket: string;
  msg: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const conversations: Conversation[] = [
  { title: "Billing Inquiry", time: "10:42 AM", ticket: "#9921", msg: "Re: Payout discrepancy for Oct..." },
  { title: "Platform Support", time: "Yesterday", ticket: "#8820", msg: "Thanks, the issue is resolved now." },
  { title: "Vendor Onboarding", time: "Oct 15", ticket: "#1001", msg: "Welcome to the platform! Here are..." },
];

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <aside
        className={`bg-neutral-800 w-80 border-r border-white/10 flex flex-col fixed top-0 left-0 h-screen z-20 transform transition-transform duration-300
          md:translate-x-0 md:static md:flex
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        `}
      >
        {/* Search */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <input
              placeholder="Search messages..."
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-800 rounded-lg outline outline-1 outline-white/10 text-sm placeholder:text-gray-400"
            />
            <div className="absolute left-3 top-3 w-4 h-4 border border-white rounded-full" />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((item, i) => (
            <div key={i} className={`${i === 0 ? "p-4 bg-neutral-800/60 border-l-4 border-white space-y-1" : "border-t border-white/10 p-4 space-y-1"}`}>
              <div className="flex justify-between text-sm font-semibold">
                <span>{item.title}</span>
                <span className="text-xs font-normal">{item.time}</span>
              </div>
              <div className="text-xs">Ticket {item.ticket}</div>
              <div className="text-sm text-white/80">{item.msg}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};