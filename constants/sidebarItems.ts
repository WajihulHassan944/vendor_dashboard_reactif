import {
  LayoutGrid,
  FileText,
  ShoppingCart,
  CreditCard,
  MessageCircle,
  Bell,
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  href: string;
}

export const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutGrid, href: "/" },
  { title: "Assigned Orders", icon: FileText, href: "/orders" },
  { title: "Earnings", icon: CreditCard, href: "/earnings" }, // CreditCard fits earnings/payments
  { title: "Message to Admin", icon: MessageCircle, href: "/support" }, // More intuitive chat/message icon
  { title: "Notifications", icon: Bell, href: "/notifications" },
];
