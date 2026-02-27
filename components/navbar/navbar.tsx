"use client";

import * as React from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation"; // <-- Import this

interface NavbarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SearchBox = () => (
  <div className="mr-3 w-64 relative">
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-md outline outline-[0.50px] outline-offset-[-0.50px] outline-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400">
      
      {/* React Search Icon */}
      <div className="w-6 h-6 flex items-center justify-center">
        <Search size={20} className="text-indigo-400" />
      </div>

      {/* Input field */}
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent text-indigo-400/60 placeholder:text-indigo-400/60 text-xl font-medium font-['HK_Grotesk'] focus:outline-none"
      />
    </div>
  </div>
);

export default function Navbar({ isSidebarOpen, setSidebarOpen }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const pathname = usePathname(); // <-- Get current path

  return (
    <nav className="w-full z-40 backdrop-blur-xl border-b border-indigo-400">
      <div className="flex items-center justify-between px-4 md:px-8 h-[70px] md:h-[88px] gap-4">
        
        {/* LEFT: Conditional Title */}
        {pathname === "/support" && (
          <div className="text-white text-xl font-semibold">
            Admin Support
          </div>
        )}

        {/* RIGHT: Remaining navbar items */}
        <div className="flex items-center gap-4 ml-auto">
          
          {/* Search */}
        {pathname !== "/support" && (
          <div className="hidden sm:block">
            <SearchBox />
          </div>)}

          {/* Mobile Search (centered) */}
          <div className="sm:hidden flex-1 mx-3">
            <SearchBox />
          </div>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-indigo-400 hover:bg-indigo-400 transition"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} color="white" />}
          </button>

          {/* Notification */}
          <div className="relative cursor-pointer p-2 rounded-full border border-indigo-400 bg-white/5 hover:bg-indigo-400 transition">
            <Bell size={20} className="text-indigo-400" />
            <span className="absolute top-[7px] right-2 w-2 h-2 bg-indigo-400 rounded-full border border-black"></span>
          </div>

          {/* Avatar */}
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar className="h-9 w-9 md:h-10 md:w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>UF</AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-4 top-[75px] md:hidden w-56 bg-neutral-900 border border-indigo-400 rounded-xl shadow-2xl p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <Button className="rounded-full bg-white text-black hover:bg-gray-200 font-medium h-10 w-full">
                Home Page
              </Button>

              <div className="flex items-center gap-3 text-white cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                <Bell size={18} />
                <span className="text-sm">Notifications</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}