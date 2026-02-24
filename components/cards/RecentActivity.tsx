"use client";

import {
  FiShoppingCart,
  FiDollarSign,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

type ActivityItemProps = {
  title: string;
  time: string;
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  showLine?: boolean;
};

function ActivityItem({
  title,
  time,
  Icon,
  iconBg,
  iconColor,
  showLine = true,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-5">
      {/* Icon + Line */}
      <div className="flex flex-col items-center w-12">
        <div
          className={`w-12 h-12 rounded-lg outline outline-1 outline-offset-[-1px] flex items-center justify-center ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>

        {showLine && <div className="w-px h-8 bg-neutral-50/30 mt-2" />}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="text-neutral-50 text-[15.5px] font-bold leading-5">
          {title}
        </div>
        <div className="text-neutral-50/60 text-sm font-medium leading-5">
          {time}
        </div>
      </div>
    </div>
  );
}

export function RecentActivity() {
  return (
    <div className="p-8 bg-zinc-800 rounded-xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-neutral-50/10 flex flex-col gap-8 w-full">
      
      {/* Header */}
      <div className="text-neutral-50 text-xl font-semibold leading-6">
        Recent Activity
      </div>

      {/* Activity List */}
      <div className="flex flex-col gap-6">
        <ActivityItem
          title="New Order #1247 assigned"
          time="5 minutes ago"
          Icon={FiShoppingCart}
          iconBg="bg-slate-100 outline-teal-100"
          iconColor="text-cyan-600"
        />

        <ActivityItem
          title="Payment received for Order #1245"
          time="1 hour ago"
          Icon={FiDollarSign}
          iconBg="bg-orange-50 outline-red-200"
          iconColor="text-orange-600"
        />

        <ActivityItem
          title="Order #1243 marked as completed"
          time="3 hours ago"
          Icon={FiCheckCircle}
          iconBg="bg-green-50 outline-emerald-100"
          iconColor="text-green-600"
        />

        <ActivityItem
          title="Order #1241 shipped to customer"
          time="5 hours ago"
          Icon={FiTruck}
          iconBg="bg-indigo-50 outline-indigo-200"
          iconColor="text-blue-600"
        />

        <ActivityItem
          title="New Order #1246 assigned"
          time="8 hours ago"
          Icon={FiShoppingCart}
          iconBg="bg-slate-100 outline-teal-100"
          iconColor="text-cyan-600"
          showLine={false}
        />
      </div>

      {/* Footer Link */}
      <div className="text-center text-indigo-400 text-sm font-semibold leading-5 cursor-pointer hover:opacity-80 transition">
        View All Activity
      </div>
    </div>
  );
}
