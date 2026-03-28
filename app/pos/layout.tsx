// app/layout.tsx
import type { Metadata } from "next";
import PageWrapper from "../components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Aivox Point of Sales",
  description: "Point of Sale Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
