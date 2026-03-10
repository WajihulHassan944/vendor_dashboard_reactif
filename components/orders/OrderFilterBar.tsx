"use client";

import * as React from "react";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react";

interface CustomSelectProps {
  icon: React.ReactNode;
  value: string;
  options: { label: string; value: string }[];
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

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between items-center gap-3 px-3 py-2 bg-neutral-800 rounded-md border border-neutral-50/20 w-fit"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-neutral-400 text-sm font-medium">
            {selected?.label}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-1 min-w-full bg-neutral-800 border border-neutral-50/20 rounded-md shadow-lg z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-700 cursor-pointer"
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface OrderFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  timeFilter: string;
  setTimeFilter: (value: string) => void;
}

const OrderFilterBar: React.FC<OrderFilterBarProps> = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  timeFilter,
  setTimeFilter,
}) => {
  return (
    <div className="w-full bg-zinc-800 rounded-xl p-4 border border-neutral-50/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      
      {/* SEARCH */}
      <div className="w-full md:max-w-sm px-3 py-2 bg-neutral-800 rounded-md border border-neutral-50/20 flex items-center gap-2">
        <Search className="w-4 h-4 text-neutral-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Order ID or Customer..."
          className="bg-transparent placeholder:text-neutral-500 text-neutral-200 w-full outline-none text-sm font-medium"
        />
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 w-full md:w-auto justify-end">

        {/* STATUS */}
        <CustomSelect
          icon={<Filter className="text-neutral-400 w-4 h-4" />}
          value={statusFilter}
          options={[
            { label: "All Statuses", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "In Progress", value: "in-progress" },
            { label: "Ready", value: "ready" },
            { label: "Delayed", value: "delay" },
          ]}
          onChange={setStatusFilter}
        />

        {/* TIME */}
        <CustomSelect
          icon={<Calendar className="text-neutral-400 w-4 h-4" />}
          value={timeFilter}
          options={[
            { label: "All Time", value: "all" },
            { label: "Today", value: "today" },
            { label: "This Week", value: "week" },
            { label: "This Month", value: "month" },
          ]}
          onChange={setTimeFilter}
        />
      </div>
    </div>
  );
};

export default OrderFilterBar;