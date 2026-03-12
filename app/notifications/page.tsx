"use client";

import React, { useMemo, useState } from "react";

type Notification = {
  id: number;
  title: string;
  description: React.ReactNode;
  time: string;
  variant?: "info" | "success" | "warning" | "default";
  category: "orders" | "financial" | "system";
  actions?: { label: string; onClick?: () => void; variant?: "primary" | "secondary" }[];
  opacity?: number;
  isNew?: boolean;
};

const notificationsData: Notification[] = [
  {
    id: 1,
    title: "New Order Assigned",
    description: (
      <>
        You have received a new order request:{" "}
        <span className="font-medium text-slate-900">Fleet Wraps (5 Units)</span> from Metro Ford.
      </>
    ),
    time: "10 mins ago",
    variant: "info",
    category: "orders",
    isNew: true,
    actions: [
      { label: "View Order", variant: "primary" },
      { label: "Dismiss", variant: "secondary" },
    ],
  },
  {
    id: 2,
    title: "Payout Processed",
    description: (
      <>
        A payout of <span className="font-bold text-slate-900">$2,450.00</span> has been sent to your
        registered bank account ending in •••• 4291.
      </>
    ),
    time: "2 hours ago",
    variant: "success",
    category: "financial",
    actions: [{ label: "View Transaction History", variant: "primary" }],
  },
  {
    id: 3,
    title: "Action Required: Proofs Rejected",
    description:
      "The customer has requested changes to the proofs for Order #ORD-9921. Please review their comments.",
    time: "5 hours ago",
    variant: "warning",
    category: "orders",
    actions: [{ label: "Review Feedback", variant: "primary" }],
  },
  {
    id: 4,
    title: "New Reply from Support",
    description: 'Admin Support replied to Ticket #8820: "The adjustment has been applied..."',
    time: "Yesterday",
    variant: "default",
    category: "system",
  },
  {
    id: 5,
    title: "System Maintenance Scheduled",
    description: "The Vendor Portal will be undergoing maintenance on Nov 1st from 2AM to 4AM UTC.",
    time: "Oct 20",
    variant: "default",
    category: "system",
    opacity: 0.75,
  },
];

const variantStyles = {
  info: { bg: "bg-blue-100", icon: "text-blue-700" },
  success: { bg: "bg-emerald-100", icon: "text-emerald-700" },
  warning: { bg: "bg-amber-100", icon: "text-amber-700" },
  default: { bg: "bg-slate-100", icon: "text-slate-600" },
};

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const { bg, icon } = variantStyles[notification.variant || "default"];

  return (
    <div
      className={`w-full p-4 bg-white rounded-lg shadow-sm outline outline-1 outline-slate-200 flex flex-col gap-2 ${
        notification.opacity ? "opacity-70" : ""
      }`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${bg}`}>
          <svg
            className={`w-5 h-5 ${icon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.64 5.36 6 7.92 6 11v3c0 .386-.147.735-.405 1.002L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              {notification.title}
              {notification.isNew && (
                <span className="px-2 py-0.5 bg-indigo-400 text-white text-[8px] font-medium rounded-full">
                  New
                </span>
              )}
            </h3>
            <span className="text-xs text-slate-500">{notification.time}</span>
          </div>

          <p className="text-sm text-slate-600">{notification.description}</p>

          {notification.actions && (
            <div className="flex gap-2 mt-2">
              {notification.actions.map((action, idx) => {
                const isReviewFeedback =
                  action.label === "Review Feedback" && notification.variant === "warning";

                return (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                      isReviewFeedback
                        ? "bg-amber-100 text-amber-700"
                        : action.variant === "primary"
                        ? "bg-black text-white hover:opacity-80"
                        : "bg-white text-slate-700 outline outline-1 outline-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {action.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const tabs = [
  { label: "All Notifications", value: "all" },
  { label: "Orders", value: "orders" },
  { label: "Financial", value: "financial" },
  { label: "System", value: "system" },
];

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter((n) => n.category === activeTab);
  }, [activeTab, notifications]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isNew: false,
      }))
    );
    setChecked(true);
  };

  return (
    <div className="relative flex flex-col gap-6 pb-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <h1 className="flex items-center gap-3 text-2xl font-semibold text-white">
          Notifications
          <span className="px-2.5 py-0.5 bg-indigo-400 rounded-full text-white text-xs font-medium tracking-wide">
            {notifications.filter((n) => n.isNew).length} New
          </span>
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="w-4 h-4 accent-indigo-500 cursor-pointer"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <button
            onClick={markAllAsRead}
            className="text-sm font-semibold text-white hover:opacity-80"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition cursor-pointer ${
              activeTab === tab.value
                ? "border-b-2 border-white text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="flex flex-col gap-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-slate-400 text-sm py-10 text-center">
            No notifications in this category
          </div>
        ) : (
          filteredNotifications.map((n) => <NotificationCard key={n.id} notification={n} />)
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;