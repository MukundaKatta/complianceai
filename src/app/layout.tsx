import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ComplianceAI - Regulatory Compliance Platform",
  description: "AI regulatory compliance management with EU AI Act, NIST, and global frameworks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
