// app/layout.tsx
import type { Metadata } from "next";
import TopNavigationBar from "../components/general/TopNavigationBar";

export const metadata: Metadata = {
  title: "Aivox Point of Sales",
  description: "Point of Sale Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      
      {/* Right Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar - Secondary Actions (User, Notifications, Breadcrumbs) */}
        <TopNavigationBar />
        
        {/* Main Content - Tertiary Focus */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
