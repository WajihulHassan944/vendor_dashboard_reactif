"use client";

import {
  FiShoppingCart,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

type StatCardProps = {
  title: string;
  value: string;
  percentage: string;
  isPositive?: boolean;
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

function StatCard({
  title,
  value,
  percentage,
  isPositive = true,
  Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="p-6 bg-zinc-800 rounded-xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-indigo-400 flex justify-between items-start w-full">
      
      {/* Left Content */}
      <div className="flex flex-col gap-2">
        <div className="text-slate-50 text-sm font-medium">{title}</div>
        <div className="text-slate-50 text-2xl font-bold">{value}</div>

        <div className="flex items-end gap-4 mt-2">
          <div className="flex flex-col items-center">
            {/* Arrow on top */}
            {isPositive ? (
              <IoArrowUp className="w-4 h-4 text-green-600" />
            ) : (
              <IoArrowDown className="w-4 h-4 text-red-600" />
            )}

            {/* Percentage */}
            <div
              className={`text-sm font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {percentage}
            </div>
          </div>

          <div className="text-slate-400 text-sm font-medium">vs last week</div>
        </div>
      </div>

      {/* Right Icon Box */}
      <div
        className={`w-12 h-12 p-3 rounded-xl outline outline-1 outline-offset-[-1px] flex items-center justify-center ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
  );
}

export default function DashboardStats() {
  return (
    <div className="w-full px-4 md:px-0">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        
        <StatCard
          title="New Order"
          value="24"
          percentage="+12%"
          isPositive
          Icon={FiShoppingCart}
          iconBg="bg-slate-100 outline-teal-100"
          iconColor="text-cyan-600"
        />

        <StatCard
          title="In Progress"
          value="08"
          percentage="+5%"
          isPositive
          Icon={FiClock}
          iconBg="bg-indigo-50 outline-indigo-200"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Completed"
          value="156"
          percentage="+8%"
          isPositive
          Icon={FiCheckCircle}
          iconBg="bg-green-50 outline-emerald-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Pending"
          value="$ 99"
          percentage="-12%"
          isPositive={false}
          Icon={FiDollarSign}
          iconBg="bg-orange-50 outline-red-200"
          iconColor="text-orange-600"
        />

      </div>
    </div>
  );
}
