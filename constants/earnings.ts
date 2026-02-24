import { TrendingUp, Clock, CreditCard } from "lucide-react";

export type EarningCardColor = "emerald" | "amber" | "blue";

export interface EarningCard {
  title: string;
  value: string;
  color: EarningCardColor;
  percent: string;
  percentColor: string;
  icon: any;
}

export const earningCards: EarningCard[] = [
  {
    title: "Total Earned (YTD)",
    value: "$48,250.00",
    color: "emerald",
    percent: "+12% from last month",
    icon: TrendingUp,
    percentColor: "text-emerald-500",
  },
  {
    title: "Pending Payout",
    value: "$2,450.00",
    color: "amber",
    percent: "Scheduled for Nov 15, 2025",
    icon: Clock,
    percentColor: "text-white",
  },
  {
    title: "Last Payout",
    value: "$3,120.50",
    color: "blue",
    percent: "Processed on Oct 31, 2025",
    icon: CreditCard,
    percentColor: "text-white",
  },
];

export const transactions = [
  {
    date: "Nov 15, 2025",
    description: "Fleet Wraps (5 Units)",
    vendor: "Metro Ford Dealership",
    ref: "ORD-7829-XJ",
    status: "Processing",
    statusColor: "bg-amber-100 text-amber-800",
    amount: "$2,450.00",
  },
  {
    date: "Oct 31, 2025",
    description: "Storefront Signage",
    vendor: "Burger King - Downtown",
    ref: "ORD-1102-KL",
    status: "Paid",
    statusColor: "bg-emerald-100 text-emerald-800",
    amount: "$1,850.00",
  },
];