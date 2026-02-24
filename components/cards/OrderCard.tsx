"use client";

import { FiPhone, FiMessageCircle } from "react-icons/fi";
import { Mode } from "@/app/orders/simulation/page";
interface Props {
  mode: Mode;
}

const OrderCard = ({ mode }: Props) => {
  const renderBadge = () => {
    switch (mode) {
      case "pending":
        return <Badge color="yellow" text="Pending" />;
      case "inprogress":
        return <Badge color="blue" text="In Progress" />;
      case "awaiting_proofs":
        return <Badge color="purple" text="Awaiting Proofs" />;
      case "ready_to_ship":
        return <Badge color="emerald" text="Ready to Ship" />;
    }
  };

  return (
    <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30 p-6 flex flex-col lg:flex-row justify-between gap-6">

      <div className="flex flex-col gap-6 flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-semibold">
            Fleet Vehicle Wraps (5 Units)
          </h2>
          {renderBadge()}
        </div>

        <p className="text-white/60 text-sm max-w-2xl">
          Full body vinyl wraps for Ford Transit Connects.
        </p>

        <div className="flex flex-wrap gap-6 text-sm text-white/70">
          <div>Due: Nov 12, 2025</div>
          <div>Qty: 5 Vehicles</div>
          <div>
            Payout:
            <span className="text-green-400 font-semibold ml-1">
              $2,450.00
            </span>
          </div>
        </div>
      </div>

      <DealerCard />
    </div>
  );
};

export default OrderCard;


/* ---------- Sub Components ---------- */

const Badge = ({ color, text }: { color: string; text: string }) => (
  <span className={`px-3 py-1 text-xs rounded-full bg-${color}-500/15 text-${color}-400 border border-${color}-400/30`}>
    {text}
  </span>
);

const DealerCard = () => (
  <div className="bg-[#1e2230] rounded-xl p-5 border border-white/10 w-full lg:w-[320px] flex flex-col gap-5">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-[#252a3b] flex items-center justify-center font-semibold">
        MF
      </div>
      <div>
        <div className="font-semibold">Metro Ford Dealership</div>
        <div className="text-xs text-white/50">
          Contact: Mike Ross (Service Mgr)
        </div>
      </div>
    </div>

    <div className="flex gap-3">
      <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm">
        <FiPhone /> Call
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm">
        <FiMessageCircle /> Chat
      </button>
    </div>
  </div>
);