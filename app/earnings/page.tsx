"use client";

import BottomSection from "@/components/earnings/BottomSection";
import EarningStats from "@/components/earnings/EarningStats";
import Transactions from "@/components/earnings/Transactions";
import Header from "@/components/shared/Header";
import { Download, RefreshCw } from "lucide-react";

export default function EarningsPage() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <Header
            title="Financial Overview"
            subtitle="Manage your Financial Overview"
          />

         <div className="flex gap-3">
  {/* Export Button */}
  <button className="h-10 px-4 rounded-md border border-neutral-600 text-neutral-200 text-sm font-medium flex items-center gap-2 hover:bg-neutral-800 transition">
    <Download className="w-4 h-4 text-neutral-200" />
    Export
  </button>

  {/* Refresh Button */}
  <button className="h-10 px-4 rounded-md bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-500 transition">
    <RefreshCw className="w-4 h-4 text-white" />
    Refresh
  </button>
</div>
        </div>

        {/* Stat Cards */}
        <EarningStats />

        {/* Transactions */}
        <Transactions />

        {/* Bottom Section */}
        <BottomSection />

      </div>
    </section>
  );
}