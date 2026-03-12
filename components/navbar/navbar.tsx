"use client";

import * as React from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

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
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();
const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("current_user") || "{}")
    : {};
  const pathname = usePathname(); // <-- Get current path
 const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("current_user");
    router.push("/login");
  };
React.useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



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
          <Link href="/notifications" className="relative cursor-pointer p-2 rounded-full border border-indigo-400 bg-white/5 hover:bg-indigo-100 transition">
            <Bell size={20} className="text-indigo-400" />
            <span className="absolute top-[7px] right-2 w-2 h-2 bg-indigo-400 rounded-full border border-black"></span>
          </Link>

          {/* Avatar */}
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white">
  {user?.displayName?.charAt(0) || "A"}
</div>
          </div>

          {/* Mobile Dropdown */}
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-4 top-[75px]  w-56 bg-neutral-900 border border-indigo-400 rounded-xl shadow-2xl p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <Button className="rounded-full bg-white text-black hover:bg-gray-200 font-medium h-10 w-full">
                Home Page
              </Button>

              <Link href="/notifications" className="md:hidden flex items-center gap-3 text-white cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                <Bell size={18} />
                <span className="text-sm">Notifications</span>
              </Link>
               <button
                      onClick={handleLogout}
                      className="rounded-full flex items-center gap-3 w-full px-4 py-2 hover:bg-red-50 text-red-600"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}