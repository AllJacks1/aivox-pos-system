"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavigationBarProps } from "@/lib/interfaces";
import { THEME } from "@/lib/styles";

export default function NavigationBar({ navLinks }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/50"
          : "bg-white/60 backdrop-blur-md border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm"
              style={{ backgroundColor: THEME.primary }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: THEME.primary }}
            >
              AIVOX POS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100/80"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="h-9 px-4 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              onClick={() => router.push("/sign-in")}
            >
              Sign in
            </Button>
            <Button
              className="h-9 px-5 text-sm font-medium text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: THEME.primary }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Simple toggle, no animation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200/60">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-3 border-t border-slate-200/60 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                onClick={() => router.push("/sign-in")}
              >
                Sign in
              </Button>
              <Button
                className="w-full justify-center text-white rounded-lg"
                style={{ backgroundColor: THEME.primary }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
