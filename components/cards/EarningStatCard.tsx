"use client";

import React from "react";

interface EarningStatCardItemProps {
  title: string;
  value: string;
  color: "emerald" | "amber" | "blue";
  percent: string;
  percentColor: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
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
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>

        <div className={`p-2 rounded-lg ${styles.bgLight}`}>
          <Icon size={20} className={styles.textDark} />
        </div>
      </div>

      <p className={`text-xs font-medium ${percentColor}`}>
        {percent}
      </p>
    </div>
  );
}