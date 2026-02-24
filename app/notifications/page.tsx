"use client";

import React from "react";

type Notification = {
  id: number;
  title: string;
  description: React.ReactNode;
  time: string;
  variant?: "info" | "success" | "warning" | "default";
  actions?: { label: string; onClick?: () => void; variant?: "primary" | "secondary" }[];
  opacity?: number;
  isNew?: boolean;
};

const notifications: Notification[] = [
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
    actions: [{ label: "View Transaction History", variant: "primary" }],
  },
  {
    id: 3,
    title: "Action Required: Proofs Rejected",
    description: "The customer has requested changes to the proofs for Order #ORD-9921. Please review their comments.",
    time: "5 hours ago",
    variant: "warning",
    actions: [{ label: "Review Feedback", variant: "primary" }],
  },
  {
    id: 4,
    title: "New Reply from Support",
    description: 'Admin Support replied to Ticket #8820: "The adjustment has been applied..."',
    time: "Yesterday",
    variant: "default",
  },
  {
    id: 5,
    title: "System Maintenance Scheduled",
    description: "The Vendor Portal will be undergoing maintenance on Nov 1st from 2AM to 4AM UTC.",
    time: "Oct 20",
    variant: "default",
    opacity: 0.75,
  },
];

const variantColors = {
  info: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  default: "bg-slate-100 text-slate-500",
};

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const bg = variantColors[notification.variant || "default"];

  return (
    <div
      className={`w-full p-4 bg-white rounded-lg shadow-sm outline outline-1 outline-slate-200 flex flex-col gap-2 ${
        notification.opacity ? `opacity-${notification.opacity * 100}` : ""
      }`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${bg}`}>
          {/* Bell icon placeholder (darkened) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white/90"
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
            <span className="text-xs font-normal text-slate-500">{notification.time}</span>
          </div>
          <p className="text-sm text-slate-600">{notification.description}</p>

          {/* Actions */}
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
                        ? "bg-amber-100 text-amber-700 shadow-sm outline outline-1 outline-black/0"
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

const NotificationsPage = () => {
  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-white">Notifications</h1>
        <button className="text-sm font-semibold text-white hover:opacity-80">
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {["All Notifications", "Orders", "Financial", "System"].map((tab, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 text-sm font-medium ${
              idx === 0
                ? "border-b-2 border-white text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
