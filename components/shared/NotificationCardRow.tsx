"use client";
import React, { useState } from "react";

interface NotificationRowProps {
  title: string;
  description: string;
  enabled?: boolean; // true = on, false = off
}

const NotificationRow: React.FC<NotificationRowProps> = ({
  title,
  description,
  enabled = true,
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const handleToggle = () => {
    setIsEnabled(!isEnabled); // Toggle the state when clicked
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex-1 flex flex-col gap-1 min-w-[200px]">
          <div className="text-neutral-50 text-lg font-semibold font-hk">
            {title}
          </div>
          <div className="text-neutral-50/60 text-sm font-medium font-hk">
            {description}
          </div>
        </div>

        {/* Toggle */}
        <div
          className={`w-11 h-6 p-[3px] rounded-full flex items-center cursor-pointer ${
            isEnabled ? "justify-end bg-blue-600" : "justify-start bg-zinc-300/30"
          } transition-all duration-300`}
          onClick={handleToggle}
        >
          <div
            className={`w-5 h-5 rounded-full bg-neutral-50 transition-transform duration-300 ${
              isEnabled ? "transform translate-x-0" : ""
            }`}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-neutral-50/10"></div>
    </div>
  );
};

export default NotificationRow;
