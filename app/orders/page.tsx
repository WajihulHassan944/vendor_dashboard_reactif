"use client";

import { useEffect, useState, useMemo } from "react";
import OrderFilterBar from "@/components/orders/OrderFilterBar";
import Header from "@/components/shared/Header";
import { Download, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type OrderStatus = "pending" | "in-progress" | "ready" | "delay" | "accepted"| "rejected";

interface Order {
  id: number;
  orderId: string;
  customer: string;
  service: string;
  status: OrderStatus;
  dueDate: string;
  createdAt: string;
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
    accepted: {
    bg: "bg-green-100 border border-green-300",
    text: "text-green-700",
    label: "Accepted",
  },
rejected: {
    bg: "bg-red-100 border border-red-300",
    text: "text-red-700",
    label: "Rejected",
  },
  delay: {
    bg: "bg-red-100 border border-red-300",
    text: "text-red-700",
    label: "Delayed",
  },
};

const mapStatus = (backendStatus: string): OrderStatus => {
  switch (backendStatus) {
    case "new_booking":
      return "pending";
    case "in_progress":
      return "in-progress";
    case "completed":
      return "ready";
       case "accepted":
      return "accepted";
       case "rejected":
      return "rejected";
    case "delayed":
      return "delay";
    default:
      return "pending";
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const AssignedOrders = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const fetchOrders = async () => {
    if (!user?.userId) return;

    try {
      setLoadingOrders(true);

      const token = localStorage.getItem("sessionToken");

      const res = await fetch(
        `${API_BASE_URL}/booking-list?designer_id=${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to fetch orders");
        return;
      }

      const formattedOrders: Order[] = data.data.map((item: any) => ({
        id: item.id,
        orderId: `ORD-${item.id}`,
        customer: item.user?.name || "Unknown",
        service: item.service?.name || "Service",
        status: mapStatus(item.status),
        dueDate: item.schedule_datetime
          ? formatDate(item.schedule_datetime)
          : formatDate(item.datetime),
        createdAt: item.created_at,
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (search) {
      filtered = filtered.filter(
        (o) =>
          o.customer.toLowerCase().includes(search.toLowerCase()) ||
          o.service.toLowerCase().includes(search.toLowerCase()) ||
          o.orderId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    if (timeFilter !== "all") {
      const now = new Date();

      filtered = filtered.filter((o) => {
        const orderDate = new Date(o.createdAt);

        if (timeFilter === "today") {
          return orderDate.toDateString() === now.toDateString();
        }

        if (timeFilter === "week") {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return orderDate >= weekAgo;
        }

        if (timeFilter === "month") {
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        }

        return true;
      });
    }

    return filtered;
  }, [orders, search, statusFilter, timeFilter]);

  const exportCSV = () => {
    if (!filteredOrders.length) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Order ID", "Customer", "Service", "Status", "Due Date"];

    const rows = filteredOrders.map((o) => [
      o.orderId,
      o.customer,
      o.service,
      o.status,
      o.dueDate,
    ]);

    const csv =
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "assigned-orders.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleRefresh = async () => {
    setSearch("");
    setStatusFilter("all");
    setTimeFilter("all");
    await fetchOrders();
  };

  if (loading) return null;

  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-0">
      <div className="w-full mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Header
            title="Assigned Orders"
            subtitle="Manage your active workload and track deliverables."
          />

          <div className="flex gap-3">

            <button
              onClick={exportCSV}
              className="h-10 px-4 rounded-md border border-neutral-600 text-neutral-200 text-sm font-medium flex items-center gap-2 hover:bg-neutral-800 transition"
            >
              <Download className="w-4 h-4 text-neutral-200" />
              Export
            </button>

            <button
              onClick={handleRefresh}
              className="h-10 px-4 rounded-md bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-500 transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  loadingOrders ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>

          </div>
        </div>

        {/* FILTER */}
        <OrderFilterBar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
        />

        {/* MOBILE */}
        <div className="md:hidden space-y-4">
          {loadingOrders && (
            <p className="text-neutral-400 text-sm">Loading orders...</p>
          )}

          {filteredOrders.map((order) => {
            const status = statusStyles[order.status];

            return (
              <div
                key={order.id}
                className="bg-zinc-800 border border-[#FAFAFA1A] rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-neutral-400">{order.orderId}</p>
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

                  <button
                    onClick={() =>
                      router.push(
                        order.status === "pending"
                          ? `/orders/simulation/${order.id}`
                          : `/orders/details/${order.id}`
                      )
                    }
                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-500 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP */}
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
                {filteredOrders.map((order) => {
                  const status = statusStyles[order.status];

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[#FAFAFA1A] hover:bg-neutral-800 transition"
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {order.orderId}
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
                        <button
                          onClick={() =>
                            router.push(
                              order.status === "pending"
                                ? `/orders/simulation/${order.id}`
                                : `/orders/details/${order.id}`
                            )
                          }
                          className="cursor-pointer px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-500 transition"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {!loadingOrders && filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-neutral-400">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AssignedOrders;