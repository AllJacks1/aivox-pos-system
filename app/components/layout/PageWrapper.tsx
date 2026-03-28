"use client";

import { useState } from "react";
import Sidebar from "../general/Sidebar";
import Topbar from "../general/Topbar";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Right Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Page */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
