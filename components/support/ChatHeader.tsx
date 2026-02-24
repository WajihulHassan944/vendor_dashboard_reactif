"use client";

import React from "react";
import { FiMenu } from "react-icons/fi";

interface ChatHeaderProps {
  onMobileMenuClick: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onMobileMenuClick }) => {
  return (
    <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          onClick={onMobileMenuClick}
        >
          <FiMenu size={20} />
        </button>

        <div className="relative">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold">
            AS
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>

        <div>
          <div className="text-sm font-bold">Admin Support</div>
          <div className="text-xs text-white/60">
            Replies typically in 1 hour • Ticket #9921
          </div>
        </div>
      </div>

      <button className="p-2 rounded hover:bg-white/10">⋯</button>
    </div>
  );
};