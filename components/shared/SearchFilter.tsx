"use client";

import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchFilter: React.FC = () => {
  return (
    <div className="w-full p-4 bg-neutral-800 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-50/10 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-6 justify-start md:justify-between">

      {/* Search Box */}
      <div className="flex-1 flex items-center gap-3 px-3 md:px-4 py-2.5 bg-neutral-800 rounded-md w-full md:max-w-[600px] border border-white/5 md:border-none">
        <Search className="w-4 h-4 md:w-5 md:h-5 text-neutral-50/60 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search Quotes..."
          className="flex-1 bg-transparent text-neutral-50/80 text-sm md:text-base font-medium font-hk outline-none placeholder:text-neutral-50/60"
        />
      </div>

      {/* Filter Button */}
      <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-50/60 bg-neutral-800 hover:bg-neutral-700 transition-colors">
        <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5 text-neutral-50" />
        <span className="text-neutral-50 text-sm md:text-base font-medium font-hk">
          Filter
        </span>
      </button>
    </div>
  );
};

export default SearchFilter;
