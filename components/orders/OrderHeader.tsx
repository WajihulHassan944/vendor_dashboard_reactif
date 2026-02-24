"use client";

import SimulationSelect from "./SimulationSelect";
import { Mode } from "@/app/orders/simulation/page";

interface Props {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const OrderHeader = ({ mode, setMode }: Props) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="text-lg font-medium text-white/60">
        Assigned Orders
        <span className="text-white"> / ORD-7829-XJ</span>
      </div>

      <SimulationSelect mode={mode} setMode={setMode} />
    </div>
  );
};

export default OrderHeader;