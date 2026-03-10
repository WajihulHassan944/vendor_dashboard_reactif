"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderCard from "@/components/cards/OrderCard";
import OrderStepper from "@/components/orders/OrderStepper";
import OrderContent from "@/components/orders/OrderContent";
import { API_BASE_URL } from "@/lib/constants";
import { toast } from "sonner";

export type Mode =
  | "pending"
  | "inprogress"
  | "awaiting_proofs"
  | "ready_to_ship";

const Page = () => {
  const params = useParams();
  const bookingId = params?.id;

  const [mode, setMode] = useState<Mode>("pending");
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("sessionToken");

      const res = await fetch(
        `${API_BASE_URL}/booking-detail?id=${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to fetch booking");
        return;
      }

      setBooking(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-400">
        Loading booking details...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Booking not found
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-['HK_Grotesk']">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        <OrderHeader
          mode={mode}
          setMode={setMode}
        />

        <OrderCard
          mode={mode}
        />

        <OrderStepper
          mode={mode}
        />

        <OrderContent
          mode={mode}
          booking={booking}
        />

      </div>
    </div>
  );
};

export default Page;