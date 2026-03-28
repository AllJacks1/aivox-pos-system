import { LucideIcon } from "lucide-react";

export interface NavigationLinks {
    label: string;
    href: string;
}
export interface NavigationBarProps {
    navLinks: NavigationLinks[];
}

export interface AuthenticationProps {
    onSignIn?: (email: string, password: string) => Promise<void> | void;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export interface Branch {
  id: string;
  name: string;
  status: "active" | "inactive";
}

export interface PaymentMethod {
  method: "Cash" | "Card" | "GCash";
  amount: string;
  percentage: number;
  color: string;
}

export interface LowStockItem {
  name: string;
  branch: string;
  stock: number;
  status: "warning" | "critical";
}

export interface RecentTransaction {
  id: string;
  customer: string;
  items: number;
  time: string;
  total: string;
  method: "Cash" | "Card" | "GCash";
  status: "completed" | "pending";
}

export interface TopProduct {
  name: string;
  sold: number;
  revenue: string;
  trend: "up" | "down";
}

export interface POSDashboardProps {
  stats: DashboardStat[];
  paymentMethods: PaymentMethod[];
  lowStockItems: LowStockItem[];
  recentTransactions: RecentTransaction[];
  topProducts: TopProduct[];
  branches: Branch[];
}