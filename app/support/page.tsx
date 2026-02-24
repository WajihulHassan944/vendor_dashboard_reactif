"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/support/Sidebar";
import { ChatHeader } from "@/components/support/ChatHeader";
import { ChatMessages } from "@/components/support/ChatMessages";
import ChatInput from "@/components/support/ChatInput";

const Page: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white flex">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <ChatHeader onMobileMenuClick={() => setSidebarOpen(true)} />

        {/* Messages + Input */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatMessages />

          {/* Chat Input */}
          <div className="flex-shrink-0">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;