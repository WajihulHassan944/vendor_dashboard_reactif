"use client";

import React from "react";
import {
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiPrinter,
  FiCamera,
} from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen  text-white font-['HK_Grotesk'] ">

      {/* ================= HEADER (TOP FULL WIDTH) ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="text-xl font-medium">
          <span className="text-white/50">Active Orders</span>
          <span className="text-white"> / ORD-7829-XJ</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* In Progress */}
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/15 text-blue-400 rounded-md border border-blue-400/30 font-medium">
            <BsCheckCircleFill />
            In Progress
          </div>

          {/* Print Job Sheet */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white/80 hover:bg-white/5 transition font-medium">
            <FiPrinter />
            Print Job Sheet
          </div>

          {/* Mark Complete */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white font-medium shadow-lg shadow-indigo-500/20 cursor-pointer">
            <BsCheckCircleFill />
            Mark Complete
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* ================= LEFT COLUMN ================= */}
        <div className="flex-1 flex flex-col gap-6">

          {/* ================= ORDER DETAILS ================= */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 flex flex-col gap-6">

            {/* Title + Date */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">
                  Fleet Vehicle Wraps (5 Units)
                </div>
                <div className="text-white/50 text-sm">
                  Full body vinyl wraps for Ford Transit Connects.
                </div>
              </div>

              <div className="text-right">
                <div className="text-white/40 text-sm">Due Date</div>
                <div className="text-red-500 font-semibold text-lg">
                  Nov 12, 2025
                </div>
              </div>
            </div>

            <div className="border-t border-white/10" />

            {/* Specs + Vehicle */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* Technical Specs */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="text-white/50 text-sm font-semibold">
                  Technical Specifications
                </div>

                {[
                  { label: "Material", value: "3M IJ180Cv3 Controltac" },
                  { label: "Lamination Finish", value: "8518 Gloss Overlaminate" },
                  { label: "Dimensions/Coverage", value: "Full Wrap (Roof + Bumpers)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#1e2230] rounded-xl p-4 border border-white/5"
                  >
                    <div className="text-xs text-white/40">{item.label}</div>
                    <div className="text-sm font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Vehicle Details */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="text-white/50 text-sm font-semibold">
                  Vehicle Details
                </div>

                <div className="bg-[#1e2230] rounded-xl p-4 border border-white/5 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-white/40">Make/Model</div>
                      <div className="text-sm font-semibold">
                        Ford Transit Connect
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Year</div>
                      <div className="text-sm font-semibold">2024</div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-white/40">Color</div>
                      <div className="text-sm font-semibold">
                        Oxford White
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Condition</div>
                      <div className="text-sm font-semibold">
                        New (Clean)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Installation Note */}
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4">
                  <div className="text-xs font-semibold text-amber-300">
                    Installation Note
                  </div>
                  <div className="text-xs text-amber-200/80">
                    Client requested removal of rear badges prior to install.
                    Badges to be saved.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PROOF OF EXECUTION ================= */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 space-y-6">
            <div>
              <div className="text-lg font-semibold">Proof of Execution</div>
              <div className="text-sm text-white/50">
                Upload photos of the finished vehicle to trigger payment
                release.
              </div>
            </div>

            <div className="border-t border-white/10" />

            <div className="border-2 border-dashed border-white/20 rounded-xl h-36 flex flex-col items-center justify-center gap-2 hover:border-white/40 transition">
              <FiCamera size={24} className="text-white/40" />
              <div className="text-sm text-white">
                Click to upload photos or drag & drop
              </div>
              <div className="text-xs text-white/40">
                PNG, JPG up to 10MB (Req: Front, Back, Both Sides)
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#232838] to-[#1a1f2a]" />
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#232838] to-[#1a1f2a]" />
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="w-full md:w-[360px] flex flex-col gap-6">

          {/* Customer Location */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl shadow-black/30 space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <FiMapPin />
              Customer Location
            </div>

            <div className="h-40 rounded-xl bg-gradient-to-br from-[#202532] to-[#1a1f2a] border border-white/10 flex items-center justify-center" >
            <div className="w-48 flex flex-col items-center gap-1">
  <FiMapPin className="w-6 h-6 text-red-600" />
  <div className="text-base font-semibold text-neutral-50">Metro Ford Service Center</div>
  <div className="text-xs font-medium text-neutral-50/60 text-center">
    123 Auto Park Blvd, Austin, TX
  </div>
</div>
            </div>

            <div className="text-center space-y-1">
              <div className="font-semibold">
                Metro Ford Service Center
              </div>
              <div className="text-xs text-white/50">
                123 Auto Park Blvd, Austin, TX
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition text-sm">
                <FiPhone /> Call
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition text-sm">
                <FiMessageCircle /> Chat
              </button>
            </div>
          </div>

          {/* Production Stages */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl shadow-black/30 space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Production Stages</span>
              <span className="text-white/40 text-sm">3/6 Done</span>
            </div>

            {[
              "Artwork Approval",
              "Material Prep & Print",
              "Vehicle Surface Prep",
              "Installation (5 Units)",
              "Post-Heat & QA",
              "Final Review",
            ].map((stage, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <BsCheckCircleFill
                  className={`${
                    i < 3 ? "text-green-400" : "text-white/20"
                  }`}
                />
                <span
                  className={`${i < 3 ? "text-white" : "text-white/40"}`}
                >
                  {stage}
                </span>
              </div>
            ))}
          </div>

          {/* Estimated Payout */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl shadow-black/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-sm">Est. Payout</span>
              <span className="text-green-400 font-semibold text-lg">
                $2,450.00
              </span>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-green-400" />
            </div>

            <div className="text-xs text-white/40">
              Payment released 48hr after completion verified.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;