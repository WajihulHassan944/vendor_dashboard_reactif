"use client";

import OrderFilterBar from "@/components/orders/OrderFilterBar";
import Header from "@/components/shared/Header";
import { Download, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

type OrderStatus = "pending" | "in-progress" | "ready" | "delay";

interface Order {
  id: string;
  customer: string;
  service: string;
  status: OrderStatus;
  dueDate: string;
}

const statusStyles: Record<
  OrderStatus,
  { bg: string; text: string; label: string }
> = {
  pending: {
    bg: "bg-yellow-100 border border-yellow-300",
    text: "text-yellow-700",
    label: "Pending",
  },
  "in-progress": {
    bg: "bg-blue-100 border border-blue-300",
    text: "text-blue-700",
    label: "In Progress",
  },
  ready: {
    bg: "bg-green-100 border border-green-300",
    text: "text-green-700",
    label: "Ready",
  },
  delay: {
    bg: "bg-red-100 border border-red-300",
    text: "text-red-700",
    label: "Delayed",
  },
};

const orders: Order[] = [
  {
    id: "ORD-688",
    customer: "Metro Ford",
    service: "Vehicle Wrap",
    status: "pending",
    dueDate: "12-12-2025",
  },
  {
    id: "ORD-689",
    customer: "Metro Ford",
    service: "Vehicle Wrap",
    status: "in-progress",
    dueDate: "12-12-2025",
  },
  {
    id: "ORD-690",
    customer: "Metro Ford",
    service: "Vehicle Wrap",
    status: "ready",
    dueDate: "12-12-2025",
  },
  {
    id: "ORD-691",
    customer: "Metro Ford",
    service: "Vehicle Wrap",
    status: "delay",
    dueDate: "12-12-2025",
  },
];

const AssignedOrders = () => {
  const router = useRouter();
  return (
 <section className="relative min-h-screen px-4 sm:px-6 lg:px-0">
<div className="w-full mx-auto  space-y-8">

      {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
         <Header
        title="Assigned Orders"
        subtitle="Manage your active workload and track deliverables."
      />


<div className="flex gap-3">
  {/* Export Button */}
  <button className="h-10 px-4 rounded-md border border-neutral-600 text-neutral-200 text-sm font-medium flex items-center gap-2 hover:bg-neutral-800 transition">
    <Download className="w-4 h-4 text-neutral-200" />
    Export
  </button>

  {/* Refresh Button */}
  <button className="h-10 px-4 rounded-md bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-500 transition">
    <RefreshCw className="w-4 h-4 text-white" />
    Refresh
  </button>
</div>
      </div>

      {/* ================= FILTER BAR ================= */}
    <OrderFilterBar />
      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => {
          const status = statusStyles[order.status];

          return (
            <div
              key={order.id}
              className="bg-zinc-800 border border-[#FAFAFA1A] rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-neutral-400">{order.id}</p>
                  <h3 className="text-base font-semibold text-white">
                    {order.customer}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                >
                  {status.label}
                </span>
              </div>

              <p className="text-sm text-neutral-400 mt-2">
                Service: {order.service}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-neutral-500">
                  Due: {order.dueDate}
                </span>

                <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-500 transition">
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-zinc-800 rounded-xl border border-[#FAFAFA1A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-neutral-200">
            <thead className="border-b border-[#FAFAFA1A] text-neutral-400">
              <tr>
                <th className="px-6 py-6 font-semibold">Order ID</th>
                <th className="px-6 py-6 font-semibold">Customer</th>
                <th className="px-6 py-6 font-semibold">Service Type</th>
                <th className="px-6 py-6 font-semibold">Status</th>
                <th className="px-6 py-6 font-semibold">Due Date</th>
                <th className="px-6 py-6 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const status = statusStyles[order.status];

                return (
                  <tr
                    key={order.id}
                    className="border-b border-[#FAFAFA1A] hover:bg-neutral-800 transition"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.service}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.dueDate}</td>
                    <td className="px-6 py-4">
                      <button onClick={()=>router.push('/orders/details')} className="cursor-pointer px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-500 transition">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div> </section>
  );
};

export default AssignedOrders;