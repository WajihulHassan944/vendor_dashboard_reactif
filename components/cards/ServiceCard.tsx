"use client";

import React from "react";
import { Clock } from "lucide-react";

interface ServiceCardProps {
  category: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  gradient?: string;
  badgeColor?: string;
}

const ServiceCard = ({
  category,
  title,
  description,
  duration,
  price,
  gradient = "from-purple-500 to-indigo-500",
  badgeColor = "bg-purple-500/10 text-purple-400",
}: ServiceCardProps) => {
  return (
    <div
      className="
        relative
        overflow-hidden
        bg-[#0F172A]
        border border-white/10
        hover:border-white/20
        rounded-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        flex
        flex-col
        h-full
      "
      style={{borderTop:"0"}}
    >
      {/* Top Gradient Bar */}
      <div
        className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${gradient}`}
      />

      <div className="p-6 flex flex-col h-full">

        {/* Category */}
        <span
          className={`
            inline-block
            text-xs
            font-medium
            px-4
            py-1
            w-fit
            rounded-full
            ${badgeColor}
            mb-5
          `}
        >
          {category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          {description}
        </p>

        {/* Push footer bottom */}
        <div className="mt-auto">

          {/* Divider */}
          <div className="my-6 border-t border-white/10" />

          {/* Footer */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock size={16} />
              {duration}
            </div>

            <div
              className={`
                text-white
                text-sm
                font-semibold
                px-5
                py-2
                rounded-full
                bg-gradient-to-r ${gradient}
                shadow-md
              `}
            >
              {price}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceCard;