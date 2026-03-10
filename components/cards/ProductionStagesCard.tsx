"use client";

import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

interface Props {
  stages?: string[];
}

export default function ProductionStagesCard({ stages }: Props) {

  const defaultStages = stages || [
    "Artwork Approval",
    "Material Prep & Print",
    "Vehicle Surface Prep",
    "Installation",
    "Post-Heat & QA",
    "Final Review",
  ];

  const [completed, setCompleted] = useState<number[]>([0, 1]);

  const toggleStage = (index: number) => {
    setCompleted((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl shadow-black/30 space-y-4">

      <div className="flex justify-between items-center font-semibold">
        <span>Production Stages</span>

        <span className="text-white/40 text-sm">
          {completed.length}/{defaultStages.length} Done
        </span>
      </div>

      <div className="space-y-2">

        {defaultStages.map((stage, i) => {

          const isDone = completed.includes(i);

          return (
            <div key={i} className="flex items-center gap-3 text-sm">

              <button onClick={() => toggleStage(i)}>

                <BsCheckCircleFill
                  className={`w-4 h-4 transition ${
                    isDone
                      ? "text-green-400"
                      : "text-white/20 hover:text-white/40"
                  }`}
                />

              </button>

              <span
                className={`transition ${
                  isDone
                    ? "text-white line-through opacity-70"
                    : "text-white/60"
                }`}
              >
                {stage}
              </span>

            </div>
          );
        })}
      </div>
    </div>
  );
}