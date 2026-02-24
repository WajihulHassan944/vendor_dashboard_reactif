"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", orders: 35 },
  { day: "Tue", orders: 50 },
  { day: "Wed", orders: 70 },
  { day: "Thu", orders: 55 },
  { day: "Fri", orders: 65 },
  { day: "Sat", orders: 40 },
  { day: "Sun", orders: 30 },
];

export function OrderVolume() {
  return (
    <div className="h-fit py-6 bg-zinc-800 rounded-xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-neutral-50/10 flex flex-col gap-6 w-full">
      
      {/* Header */}
      <div className="px-6 flex justify-between items-start p-3">
        <div className="flex flex-col gap-2 ">
          <div className="text-neutral-50 text-xl font-bold leading-5">
            Order Volume
          </div>
          <div className="text-neutral-50/60 text-sm font-medium leading-5">
            Last 7 days
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-300 via-indigo-300 to-indigo-400" />
          <div className="text-neutral-50/60 text-sm font-medium leading-5">
            Orders
          </div>
        </div>
      </div>

      <div className="h-px bg-neutral-50/10 w-full" />

      {/* Chart */}
      <div className="px-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B7EFF" />
                <stop offset="50%" stopColor="#A59BFF" />
                <stop offset="100%" stopColor="#D7D3F7" />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#FFFFFF10" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#FFFFFF99" 
              tick={{ fontSize: 12, fill: "#FFFFFF99" }} 
              axisLine={{ stroke: "#FFFFFF10" }}
            />
            <YAxis 
              stroke="#FFFFFF99" 
              tick={{ fontSize: 12, fill: "#FFFFFF99" }} 
              axisLine={{ stroke: "#FFFFFF10" }} 
              tickCount={5} 
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: 6 }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar 
              dataKey="orders" 
              fill="url(#gradient)" 
              radius={[6, 6, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
