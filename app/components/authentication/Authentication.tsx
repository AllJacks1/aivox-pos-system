"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { THEME } from "@/lib/styles";

export default function Authentication() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your auth logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200/60 p-6">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg shadow-sm"
              style={{ backgroundColor: THEME.primary }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: THEME.primary }}
            >
              AIVOX POS
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold text-center text-slate-900">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-slate-500">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-slate-700"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-11 bg-slate-50/50 border-slate-200 pr-10 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="font-medium hover:underline"
                style={{ color: THEME.primary }}
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-medium text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: THEME.primary }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
