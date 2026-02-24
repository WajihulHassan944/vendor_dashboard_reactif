"use client";

import { Landmark, CheckCircle, ChevronRight, FileText } from "lucide-react";

export default function BottomSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch">

      {/* LEFT COLUMN */}
      <div className="flex-1 bg-neutral-800 rounded-xl border border-neutral-50/10 p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="text-base lg:text-lg font-semibold text-white">Payout Method</h3>
          <button className="text-indigo-500 text-xs font-medium hover:underline">Edit</button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-50/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Landmark size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Chase Bank</p>
              <p className="text-xs text-neutral-400">Checking •••• 4291</p>
            </div>
          </div>
          <CheckCircle size={18} className="text-emerald-500" />
        </div>

        <div className="text-sm text-neutral-400 space-y-1">
          <p><span className="font-medium text-white">Schedule:</span> Bi-weekly (Every 2nd Friday)</p>
          <p><span className="font-medium text-white">Next Payout:</span> Nov 15, 2025</p>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-1 flex flex-col gap-6">

        <div className="flex-1 bg-neutral-800 rounded-xl border border-neutral-50/10 p-6 flex flex-col gap-4">
          <h3 className="text-base lg:text-lg font-semibold text-white">Earnings History</h3>
          <div className="border-b border-neutral-50/10 pb-3 flex justify-between items-end">
            {["Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
              <span key={month} className={`text-xs ${month==="Nov"?"text-indigo-500 font-semibold":"text-neutral-500"}`}>
                {month}
              </span>
            ))}
            <ChevronRight size={14} className="text-neutral-500" />
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl border border-neutral-50/10 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded"><FileText size={18} className="text-neutral-800"/></div>
              <div>
                <p className="text-sm font-medium text-white">Tax Documents</p>
                <p className="text-xs text-neutral-400">Download 1099-NEC Form</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-neutral-500" />
          </div>
        </div>

      </div>
    </div>
  );
}