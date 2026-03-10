"use client";

import React, { useState } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface Props {
  booking: any;
}

const Pending = ({ booking }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleAction = async (isAccept: number) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("sessionToken");
      const user = JSON.parse(localStorage.getItem("current_user") || "{}");

      const res = await fetch(
        `${API_BASE_URL}/booking/${booking.id}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            is_accept: isAccept,
            designer_id: user.userId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Action failed");
        return;
      }

      toast.success(data.message);
      router.push("/orders")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const dueDate = booking?.schedule_datetime
    ? new Date(booking.schedule_datetime).toLocaleDateString()
    : "N/A";

  return (
    <div>
      <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="text-white/70" />
            <span className="font-semibold">
              Action Required: Order Acceptance
            </span>
          </div>

          <span className="text-xs text-white/50">
            Expires in 24h
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-10 flex flex-col items-center gap-8">

          <p className="text-center text-white/60 max-w-lg">
            Please review the specifications above. By accepting this order,
            you agree to deliver the items by{" "}
            <span className="text-white font-semibold">
              {dueDate}
            </span>.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">

            <button
              disabled={loading}
              onClick={() => handleAction(1)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-md font-semibold hover:bg-white/90 transition disabled:opacity-50"
            >
              <FiCheckCircle /> Accept Order
            </button>

            <button
              disabled={loading}
              onClick={() => handleAction(0)}
              className="flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition disabled:opacity-50"
            >
              Decline
            </button>

            <button
              className="flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition"
            >
              Update Quote
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;