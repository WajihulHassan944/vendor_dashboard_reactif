"use client";

import { FiSliders, FiChevronDown } from "react-icons/fi";
import { Mode } from "@/app/orders/simulation/page";

const modes = [
  { label: "1. New Request (Pending)", value: "pending" },
  { label: "2. In Progress", value: "inprogress" },
  { label: "3. Awaiting Proofs", value: "awaiting_proofs" },
  { label: "4. Ready To Ship", value: "ready_to_ship" },
];

interface Props {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const SimulationSelect = ({ mode, setMode }: Props) => {
  return (
    <div className="relative w-full sm:w-auto">
      <div className="relative flex items-center w-full sm:w-auto gap-2 sm:gap-3 pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition focus-within:ring-2 focus-within:ring-indigo-500 cursor-pointer">

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-black"
        >
          {modes.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <FiSliders className="absolute left-3 w-4 h-4 text-white/70 pointer-events-none" />

        <span className="hidden xs:inline text-white/70 text-xs sm:text-sm whitespace-nowrap md:block pointer-events-none">
          Simulation Mode:
        </span>

        <span className="text-white font-semibold text-xs sm:text-sm truncate pointer-events-none">
          {modes.find((m) => m.value === mode)?.label}
        </span>

        <FiChevronDown className="absolute right-3 w-4 h-4 text-white/70 pointer-events-none" />
      </div>
    </div>
  );
};

export default SimulationSelect;