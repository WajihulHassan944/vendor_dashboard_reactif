"use client";

import { transactions } from "@/constants/earnings";
import { FileText } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  loading?: boolean;
}

export default function Transactions({ loading = false }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [visibleCount, setVisibleCount] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);

  const statusOptions = [
    "All",
    "Completed",
    "Pending",
    "Failed",
    "Paid",
    "Processing",
  ];

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      tx.ref.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.vendor.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "All" || tx.status.toLowerCase() === status.toLowerCase();

    return matchSearch && matchStatus;
  });

  const visibleTransactions = filtered.slice(0, visibleCount);

  const handleViewAll = () => {
    if (visibleCount >= filtered.length) {
      setVisibleCount(2);
      return;
    }

    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 2, filtered.length));
      setLoadingMore(false);
    }, 2000);
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-3 bg-neutral-700 rounded w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-3 bg-neutral-700 rounded w-40 mb-2"></div>
        <div className="h-2 bg-neutral-700 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-3 bg-neutral-700 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-neutral-700 rounded w-16"></div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-3 bg-neutral-700 rounded w-16 ml-auto"></div>
      </td>
      <td className="px-4 py-4 w-24"></td>
    </tr>
  );

  const showViewButton = filtered.length > 0;

  return (
    <div className="py-1 bg-neutral-800 rounded-xl border border-neutral-50/10 overflow-hidden flex flex-col">

      {/* Top Bar */}
      <div className="px-6 py-4 border-b border-neutral-50/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-base lg:text-lg font-semibold text-white">
          Transaction History
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">

          {/* Search */}
          <input
            placeholder="Search ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           className="h-10 px-4 rounded-lg bg-white text-sm outline-none w-full sm:w-[180px]"
          />

          {/* Shadcn Select */}
          <Select value={status} onValueChange={setStatus}>
           <SelectTrigger className="h-10 w-full sm:w-[150px] bg-white text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden divide-y divide-neutral-50/10">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-5 animate-pulse">
              <div className="h-4 bg-neutral-700 rounded w-40 mb-2"></div>
              <div className="h-3 bg-neutral-700 rounded w-24"></div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-neutral-400 text-sm">
            No transactions found
          </div>
        ) : (
          visibleTransactions.map((tx) => (
            <div key={tx.ref} className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {tx.description}
                  </p>
                  <p className="text-xs text-neutral-500">{tx.vendor}</p>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${tx.statusColor}`}
                >
                  {tx.status}
                </span>
              </div>

              <div className="flex justify-between text-sm text-neutral-400">
                <span>{tx.date}</span>
                <span className="font-medium text-white">{tx.amount}</span>
              </div>

              <div className="text-xs text-neutral-500">Ref: {tx.ref}</div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-neutral-400 uppercase text-xs tracking-wide border-b border-neutral-50/10">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Reference</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="w-24"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-50/10 text-neutral-200">

            {loading ? (
              Array.from({ length: 2 }).map((_, i) => <SkeletonRow key={i} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-neutral-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              <>
                {/* Always show current rows */}
                {visibleTransactions.map((tx) => (
                  <tr key={tx.ref}>
                    <td className="px-6 py-4">{tx.date}</td>

                    <td className="px-6 py-4">
                      <div>{tx.description}</div>
                      <div className="text-xs text-neutral-500">
                        {tx.vendor}
                      </div>
                    </td>

                    <td className="px-6 py-4">{tx.ref}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${tx.statusColor}`}
                      >
                        {tx.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">{tx.amount}</td>

                    <td className="px-4 py-4 text-right w-24">
                      <button className="p-2 rounded-md hover:bg-white/10 transition">
                        <FileText className="w-4 h-4 text-neutral-400 hover:text-white transition" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Skeleton rows at bottom */}
                {loadingMore &&
                  Array.from({ length: 2 }).map((_, i) => (
                    <SkeletonRow key={`skeleton-${i}`} />
                  ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {showViewButton && (
        <div className="px-6 py-3 border-t border-neutral-50/10 text-center">
          <button
            onClick={handleViewAll}
            className="text-indigo-500 text-sm font-semibold hover:underline"
          >
            {visibleCount >= filtered.length ? "Show Less" : "View All Transactions"}
          </button>
        </div>
      )}
    </div>
  );
}