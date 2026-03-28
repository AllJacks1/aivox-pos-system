"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { THEME } from "@/lib/styles";
import { POSDashboardProps } from "@/lib/interfaces";

export default function POSDashboard({
  stats,
  paymentMethods,
  lowStockItems,
  recentTransactions,
  topProducts,
  branches,
}: POSDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBranch, setSelectedBranch] = useState("all");

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: THEME.textPrimary }}
            >
              Dashboard Overview
            </h1>

            <p className="text-sm mt-1" style={{ color: THEME.textMuted }}>
              Real-time insights
            </p>
          </div>

          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="live">Live Monitor</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview */}
        <TabsContent value="overview">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* stat cards */}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* sales chart */}
            {/* payment methods */}
          </div>

          {/* Bottom grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* low stock */}
            {/* transactions */}
            {/* top products */}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-10 text-center">Analytics coming soon</Card>
        </TabsContent>

        <TabsContent value="live">
          <Card className="p-10 text-center">Live monitor coming soon</Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
