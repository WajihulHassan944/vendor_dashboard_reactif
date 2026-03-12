"use client";

import BottomSection from "@/components/earnings/BottomSection";
import EarningStats from "@/components/earnings/EarningStats";
import Transactions from "@/components/earnings/Transactions";
import Header from "@/components/shared/Header";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { transactions } from "@/constants/earnings";

export default function EarningsPage() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleExport = () => {
    const headers = [
      "Date",
      "Description",
      "Vendor",
      "Reference",
      "Status",
      "Amount",
    ];

    const rows = transactions.map((tx) => [
      tx.date,
      tx.description,
      tx.vendor,
      tx.ref,
      tx.status,
      tx.amount,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

            {/* Export */}
            <button
              onClick={handleExport}
              className="h-10 px-4 rounded-md border border-neutral-600 text-neutral-200 text-sm font-medium flex items-center gap-2 hover:bg-neutral-800 transition"
            >
              <Download className="w-4 h-4 text-neutral-200" />
              Export
            </button>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="h-10 px-4 rounded-md bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-500 transition"
            >
              <RefreshCw
                className={`w-4 h-4 text-white ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

          </div>
        </div>

        {/* Stats */}
        <EarningStats loading={loading}  />

        {/* Transactions */}
        <Transactions loading={loading} />

        {/* Bottom */}
        <BottomSection loading={loading} />

      </div>
    </section>
  );
}