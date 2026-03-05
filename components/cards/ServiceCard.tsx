"use client";

import React from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  gradient = "from-purple-500 to-pink-500",
  badgeColor = "bg-purple-500/10 text-purple-400",
}: ServiceCardProps) => {
  return (
    <Card
      className="
        relative
        overflow-hidden
        bg-neutral-900
        border border-white/10
        hover:border-white/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        h-full
        flex
        flex-col
        py-1
      "
      style={{ borderTop: "0" }}
    >
      {/* gradient bar */}
      <div
        className={`absolute top-[-0.8px] left-0 h-1 w-full bg-gradient-to-r ${gradient}`}
      />

      <CardContent className="p-7 flex flex-col h-full">
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
        <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
          {description}
        </p>

        {/* push footer down */}
        <div className="mt-auto">
          <div className="my-6 border-t border-white/10" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
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
                shadow-lg
              `}
            >
              {price}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;