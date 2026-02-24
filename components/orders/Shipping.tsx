"use client";

import React, { useState } from "react";
import {
  Truck,
  ChevronDown,
  Calendar,
  CheckCircle,
} from "lucide-react";

const Shipping = () => {
  const [provider, setProvider] = useState("Vendor Delivery (Own Fleet)");
  const [tracking, setTracking] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30 p-2">

      {/* Header */}
      <div className="p-6 border-b border-neutral-50/10">
        <div className="flex items-center gap-3 mb-2">
          <Truck className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white font-hk">
            Ready for Delivery / Shipping
          </h2>
        </div>
        <p className="text-neutral-400 text-sm max-w-2xl">
          The order is marked as complete. Please provide tracking details or
          confirm local delivery.
        </p>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-6">

          {/* Provider */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              Shipping Provider / Method
            </label>

            <div className="relative">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full appearance-none bg-[#1e2230] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Vendor Delivery (Own Fleet)</option>
                <option>UPS</option>
                <option>FedEx</option>
                <option>DHL</option>
                <option>Local Pickup</option>
              </select>

              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Tracking */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              Tracking Number / Driver Name
            </label>

            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="e.g. 1Z23456787655"
              className="w-full bg-[#1e2230] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white">
              Estimated Delivery Date
            </label>

            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1e2230] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 transition rounded-lg py-3 font-semibold text-white shadow-md flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Confirm & Notify Customer
          </button>
        </div>

        {/* RIGHT COLUMN - SUMMARY */}
        <div className="bg-[#1e2230] border border-white/10 rounded-xl p-6 flex flex-col justify-between">

          <div>
            <h3 className="text-base font-bold text-white mb-6">
              Final Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Items Produced</span>
                <span className="text-white font-semibold">5/5 Units</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Proofs Approved</span>
                <span className="text-white font-semibold">Yes</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Total Weight</span>
                <span className="text-white font-semibold">24 lbs</span>
              </div>

              <div className="border-t border-neutral-700 my-4"></div>

              <div className="flex justify-between text-base">
                <span className="text-white font-bold">Total Payout</span>
                <span className="text-white font-bold">$2,450.00</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-8 text-center">
            Funds will be released 48 hours after customer confirms receipt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;