"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Grid3X3, BookOpen, Server, ClipboardCheck, FileText, History, AlertTriangle } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Grid3X3 },
  { href: "/regulations", label: "Regulation Database", icon: BookOpen },
  { href: "/registry", label: "AI System Registry", icon: Server },
  { href: "/risk-assessment", label: "Risk Assessment", icon: AlertTriangle },
  { href: "/checklists", label: "Compliance Checklists", icon: ClipboardCheck },
  { href: "/documentation", label: "Doc Generator", icon: FileText },
  { href: "/audit-trail", label: "Audit Trail", icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <Scale className="w-8 h-8 text-green-500" />
        <div>
          <h1 className="text-lg font-bold text-white">ComplianceAI</h1>
          <p className="text-xs text-gray-500">Regulatory Compliance</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-green-600/20 text-green-400" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"}`}>
              <Icon className="w-4 h-4" />{item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-800"><p className="text-xs text-gray-600 px-2">ComplianceAI v1.0</p></div>
    </aside>
  );
}
