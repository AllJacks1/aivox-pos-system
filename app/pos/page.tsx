import React from "react";
import POSDashboard from "../components/dashboard/Dashboard";
import { DollarSign } from "lucide-react";

export default async function Home() {
  return (
    <POSDashboard
      stats={[]}
      paymentMethods={[]}
      lowStockItems={[]}
      recentTransactions={[]}
      topProducts={[]}
      branches={[]}
    />
  );
}
