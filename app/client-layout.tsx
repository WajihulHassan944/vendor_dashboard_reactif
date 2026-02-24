"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar";
import Container from "@/components/container";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Pages where navbar, sidebar, and padding should be removed
  const hideLayout = ["/register", "/login", "/forgot-password"].includes(pathname);

  // Example: support page padding
  const isSupportPage = pathname === "/support";

  // Determine whether to add padding
  const contentPadding = !hideLayout && !isSupportPage ? "px-0 md:px-6 py-6" : "";

  return (
    <div className="flex min-h-screen bg-[#222]">

      {/* Sidebar */}
      {!hideLayout && (
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        {!hideLayout && (
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setIsSidebarOpen}
          />
        )}

        <main className={`flex-1 ${contentPadding}`}>
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}