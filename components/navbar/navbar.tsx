"use client";

import * as React from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <div className="relative w-full max-w-xs md:max-w-sm">
    <Search
      className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
      size={18}
    />
    <input
      ref={ref}
      className={cn(
        "w-full h-11 md:h-[48px] rounded-xl border border-indigo-400 bg-white/5 backdrop-blur-md pl-11 pr-4 text-sm md:text-base text-white placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all",
        className
      )}
      {...props}
    />
  </div>
));

export default function Navbar({ isSidebarOpen, setSidebarOpen }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <nav className="w-full  z-40 backdrop-blur-xl  border-b border-indigo-400">
      <div className="flex items-center justify-between px-4 md:px-8 h-[70px] md:h-[88px]">

        {/* Left Section */}
        <div className="flex items-center gap-3">

          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-indigo-400 hover:bg-indigo-400 transition"
          >
            {isSidebarOpen ? <X size={20}  /> : <Menu size={20} color="white" />}
          </button>

          {/* Search */}
          <div className="hidden sm:block">
            <SearchInput placeholder="Search here..." />
          </div>
        </div>

        {/* Mobile Search (centered clean look) */}
        <div className="sm:hidden flex-1 mx-3">
          <SearchInput placeholder="Search..." />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Desktop Home Button */}
          {/* <Button className="hidden md:flex rounded-full bg-gray-200 text-black hover:bg-white font-medium h-10 px-6 shadow-sm transition">
            Home Page
          </Button> */}

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
            <Avatar className="h-9 w-9 md:h-10 md:w-10 ">
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
