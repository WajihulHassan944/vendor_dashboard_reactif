"use client";

import * as React from "react";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react";

interface CustomSelectProps {
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange?: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  icon,
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center gap-3 px-3 py-2 bg-neutral-800 rounded-md border border-neutral-50/20 w-38"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">{icon}</div>
          <span className="text-neutral-400 text-sm font-medium">
            {value}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-neutral-800 border border-neutral-50/20 rounded-md shadow-lg z-50">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-700 cursor-pointer"
              onClick={() => {
                onChange?.(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OrderFilterBar: React.FC = () => {
  const [status, setStatus] = React.useState("All Statuses");
  const [date, setDate] = React.useState("This Week");

  return (
    <div className="w-full bg-zinc-800 rounded-xl p-4 border border-neutral-50/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      
      {/* LEFT — Search */}
      <div className="w-full md:max-w-sm px-3 py-2 bg-neutral-800 rounded-md border border-neutral-50/20 flex items-center gap-2">
        <Search className="w-4 h-4 text-neutral-400" />
        <input
          placeholder="Search by Order ID or Customer..."
          className="bg-transparent placeholder:text-neutral-500 text-neutral-200 w-full outline-none text-sm font-medium"
        />
      </div>

      {/* RIGHT — Filters */}
      <div className="flex gap-3 w-full md:w-auto justify-end">
        <CustomSelect
          icon={<Filter className="text-neutral-400 w-4 h-4" />}
          value={status}
          options={["All Statuses", "Pending", "Shipped", "Delivered"]}
          onChange={setStatus}
        />

        <CustomSelect
          icon={<Calendar className="text-neutral-400 w-4 h-4" />}
          value={date}
          options={["This Week", "Last Week", "This Month"]}
          onChange={setDate}
        />
      </div>
    </div>
  );
};

export default OrderFilterBar;