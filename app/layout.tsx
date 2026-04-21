import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CricketLive — IPL 2026",
  description: "Live IPL 2026 scores, match updates, standings",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
