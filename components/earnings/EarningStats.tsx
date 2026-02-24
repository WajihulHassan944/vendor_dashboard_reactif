"use client";

import { earningCards } from "@/constants/earnings";
import EarningStatCard from "../cards/EarningStatCard";

export default function EarningStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {earningCards.map((card) => {
        const Icon = card.icon;
        return (
          <EarningStatCard
            key={card.title}
            title={card.title}
            value={card.value}
            color={card.color}
            percent={card.percent}
            percentColor={card.percentColor}
            Icon={Icon}
          />
        );
      })}
    </div>
  );
}