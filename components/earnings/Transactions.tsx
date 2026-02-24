"use client";

import { transactions } from "@/constants/earnings"; 
export default function Transactions() {
  return (
    <div className="py-1 bg-neutral-800 rounded-xl border border-neutral-50/10 overflow-hidden flex flex-col">

      {/* Top Bar */}
      <div className="px-6 py-4 border-b border-neutral-50/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-base lg:text-lg font-semibold text-white">
          Transaction History
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            placeholder="Search ref..."
            className="px-4 py-2 rounded-lg bg-white text-sm outline-none w-full sm:w-auto"
          />
          <button className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium">
            All Status
          </button>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden divide-y divide-neutral-50/10">
        {transactions.map((tx) => (
          <div key={tx.ref} className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-white">{tx.description}</p>
                <p className="text-xs text-neutral-500">{tx.vendor}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${tx.statusColor}`}>
                {tx.status}
              </span>
            </div>
            <div className="flex justify-between text-sm text-neutral-400">
              <span>{tx.date}</span>
              <span className="font-medium text-white">{tx.amount}</span>
            </div>
            <div className="text-xs text-neutral-500">Ref: {tx.ref}</div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className="text-neutral-400 uppercase text-xs tracking-wide border-b border-neutral-50/10">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Reference</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50/10 text-neutral-200">
            {transactions.map((tx) => (
              <tr key={tx.ref}>
                <td className="px-6 py-4">{tx.date}</td>
                <td className="px-6 py-4">
                  <div>{tx.description}</div>
                  <div className="text-xs text-neutral-500">{tx.vendor}</div>
                </td>
                <td className="px-6 py-4">{tx.ref}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${tx.statusColor}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-neutral-50/10 text-center">
        <button className="text-indigo-500 text-sm font-semibold hover:underline">
          View All Transactions
        </button>
      </div>
    </div>
  );
}