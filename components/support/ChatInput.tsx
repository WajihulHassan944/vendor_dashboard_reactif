"use client";

import { AiOutlinePaperClip } from "react-icons/ai";
import { FiSend } from "react-icons/fi";

export default function ChatInput() {
  return (
    <div className="p-4 border-t border-white/10">
      {/* Input Container */}
      <div className="flex items-center gap-2 bg-slate-50 rounded-xl outline outline-1 outline-slate-200 p-2">
        
        {/* Attach File Button */}
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-slate-200 transition flex items-center justify-center"
        >
          <AiOutlinePaperClip size={18} className="text-slate-700" />
        </button>

        {/* Textarea */}
        <textarea
          placeholder="Type your message..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-black placeholder:text-gray-400 focus:outline-none resize-none py-2"
        />

        {/* Send Button */}
        <button
          type="button"
          className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition flex items-center justify-center"
        >
          <FiSend size={18} />
        </button>
      </div>

      {/* Helper Text */}
      <div className="text-center text-[13px] text-slate-400 mt-2">
        Press Enter to send. Shift + Enter for new line.
      </div>
    </div>
  );
}