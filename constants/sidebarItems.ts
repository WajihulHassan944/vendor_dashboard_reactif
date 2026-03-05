import {
  LayoutGrid,
  FileText,
  ShoppingCart,
  CreditCard,
  MessageCircle,
  Bell,
  Briefcase,
  User,
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
  { title: "Earnings", icon: CreditCard, href: "/earnings" },
  { title: "Message to Admin", icon: MessageCircle, href: "/support" },
  { title: "Notifications", icon: Bell, href: "/notifications" },
  { title: "Services", icon: Briefcase, href: "/services" },
  { title: "Profile", icon: User, href: "/profile" },
];