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

const variantStyles = {
  info: {
    bg: "bg-blue-100",
    icon: "text-blue-700",
  },
  success: {
    bg: "bg-emerald-100",
    icon: "text-emerald-700",
  },
  warning: {
    bg: "bg-amber-100",
    icon: "text-amber-700",
  },
  default: {
    bg: "bg-slate-100",
    icon: "text-slate-600",
  },
};
const NotificationCard = ({ notification }: { notification: Notification }) => {
  const { bg, icon } =
  variantStyles[notification.variant || "default"];

  return (
    <div
      className={`w-full p-4 bg-white rounded-lg shadow-sm outline outline-1 outline-slate-200 flex flex-col gap-2 ${
        notification.opacity ? `opacity-${notification.opacity * 100}` : ""
      }`}
    >
      <div className="flex gap-4">
        {/* Icon */}
       <div
  className={`w-10 h-10 flex items-center justify-center rounded-full ${bg}`}
>
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
  const [checked, setChecked] = React.useState(false);

  const toggleCheckbox = () => setChecked(!checked);
  return (
    <div className="relative flex flex-col gap-6 pb-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
      
      {/* Title with icon */}
     <h1 className="flex items-center gap-3 text-2xl font-semibold text-white">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18.134 11C18.715 16.375 21 18 21 18H3C3 18 6 15.867 6 8.4C6 6.703 6.632 5.075 7.757 3.875C8.882 2.675 10.41 2 12 2C12.338 2 12.6713 2.03 13 2.09M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M19 8C19.7956 8 20.5587 7.68393 21.1213 7.12132C21.6839 6.55871 22 5.79565 22 5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2C18.2044 2 17.4413 2.31607 16.8787 2.87868C16.3161 3.44129 16 4.20435 16 5C16 5.79565 16.3161 6.55871 16.8787 7.12132C17.4413 7.68393 18.2044 8 19 8Z"
      stroke="#FAFAFA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  Notifications

  <span className="px-2.5 py-0.5 bg-indigo-400 rounded-full text-white text-xs font-medium tracking-wide">
    New
  </span>
</h1>

      {/* Right side: Checkbox + Mark all */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-4 h-4 accent-indigo-500 cursor-pointer"
          checked={checked}
          onChange={toggleCheckbox}
        />
        <button className="text-sm font-semibold text-white hover:opacity-80">
          Mark all as read
        </button>
      </div>
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
