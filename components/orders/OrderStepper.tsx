"use client";

import { FiCheck } from "react-icons/fi";
import { Mode } from "@/app/orders/simulation/page";

interface Props {
  mode: Mode;
}

const OrderStepper = ({ mode }: Props) => {
  const stepIndex =
    mode === "pending"
      ? 0
      : mode === "inprogress"
      ? 1
      : mode === "awaiting_proofs"
      ? 2
      : 3;

  const progressWidth = `${(stepIndex / 3) * 100}%`;

  return (
    <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
      <div className="relative flex justify-between items-center">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-white/10" />
        <div
          className="absolute top-4 left-0 h-[2px] bg-indigo-500 transition-all duration-500"
          style={{ width: progressWidth }}
        />

        {["Order Placed", "Accepted", "In Production", "Shipped"].map(
          (step, idx) => {
            const completed = idx <= stepIndex;

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                    completed
                      ? "bg-indigo-500 border-indigo-400"
                      : "bg-[#252a3b] border-white/20"
                  }`}
                >
                  {completed && <FiCheck />}
                </div>

                <span
                  className={`text-xs ${
                    completed ? "text-white" : "text-white/50"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default OrderStepper;