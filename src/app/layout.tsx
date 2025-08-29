import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "7DAY - Curated Team Event Marketplace for HR Teams",
  description: "Transform team event planning with our curated marketplace. Self-service platform, budget controls, one-click approvals. Setup in 5 minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}