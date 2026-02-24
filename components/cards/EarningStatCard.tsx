"use client";

import React from "react";

interface EarningStatCardItemProps {
  title: string;
  value: string;
  color: string,
  percent: string;
  percentColor: string; // e.g., "text-white" or "text-emerald-500"
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function EarningStatCard({
  title,
  value,
  color,
  percent,
  percentColor,
  Icon,
}: EarningStatCardItemProps) {
  return (
    <div className="relative bg-neutral-800 rounded-xl border border-neutral-50/10 p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <p className="text-2xl lg:text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon size={20} className={`text-${color}-600`} />
        </div>
      </div>

      <p className={`text-xs font-medium ${percentColor}`}>{percent}</p>

      <div className={`absolute right-0 top-0 h-full w-1 bg-${color}-600 rounded-r-xl`} />
    </div>
  );
}