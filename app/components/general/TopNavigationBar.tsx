"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Settings,
  LogOut,
  User,
  Home,
  ChevronRight,
  ChevronDown,
  HandCoins,
  Bell,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { THEME } from "@/lib/styles";

export default function TopNavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  return (
    <div
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: THEME.bgCard,
        borderColor: THEME.borderLight,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 hover:bg-gray-100"
                style={{ color: THEME.textPrimary }}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 p-0 overflow-y-auto border-r-0"
              style={{ backgroundColor: THEME.bgSidebar }}
            >
              <SheetHeader
                className="border-b p-6"
                style={{
                  backgroundColor: THEME.primaryHover,
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <SheetTitle className="flex items-center gap-3">
                  <Image
                    src="/astra_logo_small.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                    className="brightness-0 invert"
                  />
                  <div className="flex flex-col">
                    <span
                      className="text-lg font-bold"
                      style={{ color: THEME.textSidebar }}
                    >
                      Aivox POS
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 p-4 pb-24">
                {/* Dashboard */}
                <Link
                  href="/home"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all"
                  style={{ color: THEME.textSidebarMuted }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = THEME.primaryHover;
                    e.currentTarget.style.color = THEME.textSidebar;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = THEME.textSidebarMuted;
                  }}
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                {/* Employee Portal - Expandable */}
                <div className="flex flex-col">
                  <button
                    onClick={() => toggleExpand("Employee Portal")}
                    className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all text-left w-full"
                    style={{ color: THEME.textSidebarMuted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        THEME.primaryHover;
                      e.currentTarget.style.color = THEME.textSidebar;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = THEME.textSidebarMuted;
                    }}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium flex-1">Employee Portal</span>
                    {expandedItems.includes("Employee Portal") ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {expandedItems.includes("Employee Portal") && (
                    <div
                      className="mt-1 ml-4 pl-4 flex flex-col gap-1"
                      style={{ borderLeft: `2px solid ${THEME.primaryHover}` }}
                    >
                      {/* Requests Subsection */}
                      <div className="flex flex-col">
                        <button
                          onClick={() => toggleExpand("Requests")}
                          className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-left w-full"
                          style={{ color: THEME.textSidebarMuted }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              THEME.primaryHover;
                            e.currentTarget.style.color = THEME.textSidebar;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color =
                              THEME.textSidebarMuted;
                          }}
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: THEME.gray500 }}
                          />
                          <span className="font-medium flex-1">Requests</span>
                          {expandedItems.includes("Requests") ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>

                        {expandedItems.includes("Requests") && (
                          <div className="mt-1 ml-2 pl-2 flex flex-col gap-1">
                            {[
                              {
                                href: "/home/employee-portal/requests/service-requests",
                                label: "Service Request",
                              },
                              {
                                href: "/home/employee-portal/requests/purchase-requests",
                                label: "Purchase Request",
                              },
                              {
                                href: "/home/employee-portal/requests/request-for-payment",
                                label: "Request for Payment",
                              },
                              {
                                href: "/home/employee-portal/requests/liquidation",
                                label: "Liquidation",
                              },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                                style={{ color: THEME.textSidebarMuted }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    THEME.primaryHover;
                                  e.currentTarget.style.color = THEME.accent;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.color =
                                    THEME.textSidebarMuted;
                                }}
                              >
                                <div
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: THEME.gray500 }}
                                />
                                <span className="font-medium text-sm">
                                  {item.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Finance - Expandable */}
                <div className="flex flex-col">
                  <button
                    onClick={() => toggleExpand("Finance")}
                    className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all text-left w-full"
                    style={{ color: THEME.textSidebarMuted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        THEME.primaryHover;
                      e.currentTarget.style.color = THEME.textSidebar;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = THEME.textSidebarMuted;
                    }}
                  >
                    <HandCoins className="h-5 w-5" />
                    <span className="font-medium flex-1">Finance</span>
                    {expandedItems.includes("Finance") ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {expandedItems.includes("Finance") && (
                    <div
                      className="mt-1 ml-4 pl-4 flex flex-col gap-1"
                      style={{ borderLeft: `2px solid ${THEME.primaryHover}` }}
                    >
                      {[
                        {
                          href: "/home/finance/service-requests",
                          label: "Service Request",
                        },
                        {
                          href: "/home/finance/purchase-requests",
                          label: "Purchase Request",
                          badge: "12",
                        },
                        {
                          href: "/home/finance/review-requests",
                          label: "Review Requests",
                        },
                        {
                          href: "/home/finance/service-orders",
                          label: "Service Order",
                        },
                        {
                          href: "/home/finance/purchase-orders",
                          label: "Purchase Order",
                        },
                        {
                          href: "/home/finance/review-orders",
                          label: "Review Orders",
                        },
                        {
                          href: "/home/finance/request-for-payment",
                          label: "Request for Payment",
                        },
                        {
                          href: "/home/finance/liquidation",
                          label: "Liquidation",
                        },
                        { href: "/home/finance/settings", label: "Settings" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                          style={{ color: THEME.textSidebarMuted }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              THEME.primaryHover;
                            e.currentTarget.style.color = THEME.accent;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color =
                              THEME.textSidebarMuted;
                          }}
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: THEME.gray500 }}
                          />
                          <span className="font-medium text-sm flex-1">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: THEME.accent,
                                color: THEME.textInverse,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Settings */}
                <Link
                  href="/home/settings"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all"
                  style={{ color: THEME.textSidebarMuted }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = THEME.primaryHover;
                    e.currentTarget.style.color = THEME.textSidebar;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = THEME.textSidebarMuted;
                  }}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </Link>
              </nav>

              <div
                className="absolute bottom-0 left-0 right-0 border-t p-4"
                style={{
                  backgroundColor: THEME.primaryHover,
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex items-center gap-3 rounded-lg p-3">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback
                      className="font-semibold"
                      style={{
                        backgroundColor: THEME.accent,
                        color: THEME.textInverse,
                      }}
                    >
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: THEME.textSidebar }}
                    >
                      John Doe
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: THEME.textSidebarMuted }}
                    >
                      john@astra.com
                    </span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 group">
            <Image
              src="/astra_logo_small.png"
              alt="Logo"
              width={40}
              height={40}
              priority
            />
            <div className="hidden sm:flex flex-col">
              <span
                className="text-lg font-bold leading-tight"
                style={{ color: THEME.textPrimary }}
              >
                Aivox POS
              </span>
            </div>
          </Link>
        </div>

        {/* Right Section: Notifications + Avatar */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <DropdownMenu
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100"
                style={{ color: THEME.textSecondary }}
              >
                <Bell className="h-5 w-5" />
                <span
                  className="absolute top-1 right-1 h-2 w-2 rounded-full"
                  style={{ backgroundColor: THEME.accent }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80"
              style={{ backgroundColor: THEME.bgCard }}
            >
              <DropdownMenuLabel
                className="font-normal border-b pb-2"
                style={{ borderColor: THEME.borderLight }}
              >
                <span style={{ color: THEME.textPrimary }}>Notifications</span>
              </DropdownMenuLabel>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="gap-3 cursor-pointer py-3">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: THEME.accent }}
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-sm font-medium"
                      style={{ color: THEME.textPrimary }}
                    >
                      New purchase request
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: THEME.textMuted }}
                    >
                      2 minutes ago
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 cursor-pointer py-3">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: THEME.gray300 }}
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-sm font-medium"
                      style={{ color: THEME.textPrimary }}
                    >
                      Service order approved
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: THEME.textMuted }}
                    >
                      1 hour ago
                    </span>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator
                style={{ backgroundColor: THEME.borderLight }}
              />
              <DropdownMenuItem
                className="gap-2 cursor-pointer justify-center text-sm"
                style={{ color: THEME.accent }}
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full p-0 hover:bg-gray-100"
              >
                <Avatar
                  className="h-9 w-9 border-2 transition-colors"
                  style={{ borderColor: THEME.borderLight }}
                >
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback
                    className="font-semibold text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.primary} 0%, ${THEME.primaryHover} 100%)`,
                      color: THEME.textInverse,
                    }}
                  >
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56"
              style={{ backgroundColor: THEME.bgCard }}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: THEME.textPrimary }}
                  >
                    John Doe
                  </p>
                  <p className="text-xs" style={{ color: THEME.textMuted }}>
                    john.doe@astra.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator
                style={{ backgroundColor: THEME.borderLight }}
              />
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                style={{ color: THEME.textSecondary }}
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                style={{ color: THEME.textSecondary }}
              >
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator
                style={{ backgroundColor: THEME.borderLight }}
              />
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                style={{ color: THEME.error }}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
