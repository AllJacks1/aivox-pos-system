"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { THEME } from "@/lib/styles";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Building2,
  Shield,
  Settings,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/pos" },
  { icon: ShoppingCart, label: "POS Terminal", href: "/pos/terminal" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Building2, label: "Branches", href: "/branches" },
  { icon: Shield, label: "Audit Trail", href: "/audit" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== "/pos" && pathname.startsWith(`${href}/`)) return true;
    return false;
  };

  return (
    <aside
      className={`${sidebarOpen ? "w-64" : "w-20"} flex-shrink-0 flex flex-col transition-all duration-300`}
      style={{ backgroundColor: THEME.bgSidebar }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 pl-4.5 py-5 border-b border-white/10">
        <div
          className="h-11 w-11 rounded-lg flex items-center justify-center font-bold text-lg"
          style={{ backgroundColor: THEME.accent, color: "#ffffff" }}
        >
          P
        </div>
        {sidebarOpen && (
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight">POS Pro</span>
            <span className="text-xs" style={{ color: THEME.textSidebarMuted }}>
              Enterprise
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-4.5 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
                active
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              style={{
                backgroundColor: active ? THEME.accent : "transparent",
              }}
            >
              <item.icon className="h-5 w-5" />
              {sidebarOpen && (
                <>
                  <span className="font-medium text-sm">{item.label}</span>
                  {active && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div
          className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}
        >
          <Avatar className="h-10 w-10 ring-2 ring-white/10">
            <AvatarFallback
              style={{ backgroundColor: THEME.accent, color: "#ffffff" }}
            >
              JD
            </AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-white font-medium truncate">
                John Doe
              </span>
              <span className="text-xs text-gray-400">Manager</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
