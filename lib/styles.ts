// lib/styles.ts - Updated with responsive considerations
export const THEME = {
  // Primary - Deep charcoal
  primary: "#0f172a",
  primaryHover: "#1e293b",
  
  // Accent - Teal
  accent: "#14b8a6",
  accentHover: "#0d9488",
  accentLight: "#f0fdfa",
  
  // Secondary - Indigo
  secondary: "#6366f1",
  secondaryHover: "#4f46e5",
  
  // Semantic
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  
  // Neutrals - Cool grays
  gray50: "#f8fafc",
  gray100: "#f1f5f9",
  gray200: "#e2e8f0",
  gray300: "#cbd5e1",
  gray400: "#94a3b8",
  gray500: "#64748b",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1e293b",
  gray900: "#0f172a",
  
  // Backgrounds
  bgSidebar: "#0f172a",
  bgMain: "#f8fafc",
  bgCard: "#ffffff",
  bgHover: "#1e293b",
  bgOverlay: "rgba(15, 23, 42, 0.5)",
  
  // Text
  textSidebar: "#f8fafc",
  textSidebarMuted: "#94a3b8",
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#64748b",
  textInverse: "#ffffff",
  
  // Borders
  borderLight: "#e2e8f0",
  border: "#cbd5e1",
  
  // Shadows
  shadowSm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  shadowMd: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  shadowLg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
} as const;