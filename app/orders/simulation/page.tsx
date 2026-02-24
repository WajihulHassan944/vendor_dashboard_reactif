"use client";

import { useState } from "react";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderCard from "@/components/cards/OrderCard";
import OrderStepper from "@/components/orders/OrderStepper";
import OrderContent from "@/components/orders/OrderContent";

export type Mode =
  | "pending"
  | "inprogress"
  | "awaiting_proofs"
  | "ready_to_ship";

const Page = () => {
  const [mode, setMode] = useState<Mode>("inprogress");

  return (
    <div className="min-h-screen text-white font-['HK_Grotesk']">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <OrderHeader mode={mode} setMode={setMode} />
        <OrderCard mode={mode} />
        <OrderStepper mode={mode} />
        <OrderContent mode={mode} />
      </div>
    </div>
  );
};

export default Page;