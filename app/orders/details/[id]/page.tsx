"use client";

import React, { useEffect, useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiPrinter,
  FiCamera,
} from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { Info, Send } from "lucide-react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import ProductionStagesCard from "@/components/cards/ProductionStagesCard";

interface Order {
  id: number;
  service: { name: string; description?: string };
  user: { name: string; contact_number: string };
  address: string;
  schedule_datetime: string;
  total_amount: string;
  status: string;
}

const statusMap: any = {
  new_booking: {
    label: "Pending",
    class:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-400/30",
  },
  in_progress: {
    label: "In Progress",
    class: "bg-blue-500/15 text-blue-400 border border-blue-400/30",
  },
  completed: {
    label: "Completed",
    class:
      "bg-green-500/15 text-green-400 border border-green-400/30",
  },
  accepted: {
    label: "Accepted",
    class:
      "bg-green-500/15 text-green-400 border border-green-400/30",
  },
  rejected: {
    label: "Rejected",
    class:
      "bg-green-500/15 text-green-400 border border-green-400/30",
  },
  delayed: {
    label: "Delayed",
    class: "bg-red-500/15 text-red-400 border border-red-400/30",
  },
};

const Page: React.FC = () => {
  const params = useParams();
  const orderId = params?.id;

  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("sessionToken");

      const res = await fetch(
        `${API_BASE_URL}/booking-detail?id=${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data?.data) {
        setOrder(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  const status = statusMap[order?.status || "new_booking"];

  return (
    <div className="min-h-screen text-white font-['HK_Grotesk']">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="text-xl font-medium">
          <span className="text-white/50">Active Orders</span>
          <span className="text-white">
            {" "}
            / ORD-{order?.id || "----"}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* STATUS */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${status?.class}`}
          >
            <BsCheckCircleFill />
            {status?.label}
          </div>

          {/* PRINT */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white/80 hover:bg-white/5 transition font-medium">
            <FiPrinter />
            Print Job Sheet
          </div>

          {/* COMPLETE */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white font-medium shadow-lg shadow-indigo-500/20 cursor-pointer">
            <BsCheckCircleFill />
            Mark Complete
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-6">

          {/* ORDER DETAILS */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 flex flex-col gap-6">

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">
                  {order?.service?.name || "Vehicle Wrap"}
                </div>

                <div className="text-white/50 text-sm">
                  {order?.service?.description ||
                    "Full vehicle wrap service."}
                </div>
              </div>

              <div className="text-right">
                <div className="text-white/40 text-sm">Due Date</div>
                <div className="text-red-500 font-semibold text-lg">
                  {order?.schedule_datetime
                    ? new Date(
                        order.schedule_datetime
                      ).toLocaleDateString()
                    : "TBD"}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10" />

            {/* TECH + VEHICLE */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* TECH SPECS */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="text-white/50 text-sm font-semibold">
                  Technical Specifications
                </div>

                {[
                  { label: "Material", value: "3M IJ180Cv3 Controltac" },
                  {
                    label: "Lamination Finish",
                    value: "8518 Gloss Overlaminate",
                  },
                  {
                    label: "Dimensions/Coverage",
                    value: "Full Wrap",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#1e2230] rounded-xl p-4 border border-white/5"
                  >
                    <div className="text-xs text-white/40">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* VEHICLE */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="text-white/50 text-sm font-semibold">
                  Vehicle Details
                </div>

                <div className="bg-[#1e2230] rounded-xl p-4 border border-white/5 space-y-3">

                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-white/40">
                        Customer
                      </div>
                      <div className="text-sm font-semibold">
                        {order?.user?.name}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-white/40">
                        Contact
                      </div>
                      <div className="text-sm font-semibold">
                        {order?.user?.contact_number}
                      </div>
                    </div>
                  </div>
                </div>

                {/* INSTALLATION NOTE */}
                <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex gap-2">
                  <Info className="w-4 h-4 text-[#92400E]" />

                  <div>
                    <div className="text-sm font-semibold text-[#92400E]">
                      Installation Note
                    </div>
                    <div className="text-sm text-[#702d04]">
                      Client requested careful installation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PROOF OF EXECUTION */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 space-y-6">

            <div>
              <div className="text-lg font-semibold">
                Proof of Execution
              </div>

              <div className="text-sm text-white/50">
                Upload photos of the finished vehicle.
              </div>
            </div>

            <div className="border-t border-white/10" />

            <div className="border-2 border-dashed border-white/20 rounded-xl h-36 flex flex-col items-center justify-center gap-2">
              <FiCamera size={24} className="text-white/40" />
              <div className="text-sm text-white">
                Upload images
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[360px] flex flex-col gap-6">

          {/* LOCATION */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl shadow-black/30 space-y-4">

            <div className="flex items-center gap-2 font-semibold">
              <FiMapPin />
              Customer Location
            </div>

            <div className="relative h-45 rounded-xl bg-gradient-to-br from-[#202532] to-[#1a1f2a] border border-white/10 flex items-center justify-center">

              <div className="w-48 flex flex-col items-center gap-1">

                <FiMapPin className="w-6 h-6 text-red-600" />

                <div className="text-base font-semibold text-neutral-50">
                  {order?.user?.name}
                </div>

                <div className="text-xs text-neutral-50/60 text-center">
                  {order?.address}
                </div>

                <button className="absolute bottom-2 right-2 px-3 py-1.5 hover:bg-neutral-700 transition rounded-md border border-white flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-neutral-200" />
                  <span className="text-xs font-medium text-neutral-100">
                    Direction
                  </span>
                </button>
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

          <ProductionStagesCard />

          {/* PAYOUT */}
          <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl shadow-black/30 space-y-3">

            <div className="flex justify-between items-center">
              <span className="text-white/50 text-sm">
                Est. Payout
              </span>

              <span className="text-green-400 font-semibold text-lg">
                ${order?.total_amount || "0.00"}
              </span>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-green-400" />
            </div>

            <div className="text-xs text-white/40">
              Payment released after completion verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;