"use client";

import { Button } from "@/components/ui/button";
import {
  Bell,
  ChevronDown,
  Menu,
  Store,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { THEME } from "@/lib/styles";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b"
      style={{
        backgroundColor: THEME.bgCard,
        borderColor: THEME.borderLight,
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          style={{ color: THEME.textSecondary }}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 font-semibold">
          <Store className="h-4 w-4" style={{ color: THEME.accent }} />
          Main Branch
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" style={{ color: THEME.textSecondary }} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  style={{ backgroundColor: THEME.primary, color: "#fff" }}
                >
                  JD
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <UserCircle className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
