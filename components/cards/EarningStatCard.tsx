"use client";

import React from "react";

interface EarningStatCardItemProps {
  title: string;
  value: string;
  color: "emerald" | "amber" | "blue";
  percent: string;
  percentColor: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  loading?: boolean;
}

const colorStyles = {
  emerald: {
    bgLight: "bg-emerald-100",
    textDark: "text-emerald-600",
    borderColor: "border-r-emerald-600",
  },
  amber: {
    bgLight: "bg-amber-100",
    textDark: "text-amber-600",
    borderColor: "border-r-amber-600",
  },
  blue: {
    bgLight: "bg-blue-100",
    textDark: "text-blue-600",
    borderColor: "border-r-blue-600",
  },
};

export default function EarningStatCard({
  title,
  value,
  color,
  percent,
  percentColor,
  Icon,
  loading = false,
}: EarningStatCardItemProps) {
  const styles = colorStyles[color];

  return (
    <div
      className={`
        bg-neutral-800 
        rounded-xl 
        border 
        border-neutral-50/10 
        border-r-4 
        ${styles.borderColor}
        p-6 
        flex 
        flex-col 
        gap-4
      `}
    >
      {loading ? (
        <>
          <div className="flex justify-between items-start animate-pulse">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-neutral-700 rounded"></div>
              <div className="h-6 w-28 bg-neutral-700 rounded"></div>
            </div>

            <div className="w-10 h-10 bg-neutral-700 rounded-lg"></div>
          </div>

          <div className="h-3 w-32 bg-neutral-700 rounded animate-pulse"></div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-400">{title}</p>
              <p className="text-2xl font-bold text-white mt-1">{value}</p>
            </div>

            <div className={`p-2 rounded-lg ${styles.bgLight}`}>
              <Icon size={20} className={styles.textDark} />
            </div>
          </div>

          <p className={`text-xs font-medium ${percentColor}`}>{percent}</p>
        </>
      )}
    </div>
  );
}