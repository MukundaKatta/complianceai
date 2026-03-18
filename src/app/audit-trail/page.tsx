"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Search, Filter, Download, Clock } from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  category: "system_change" | "assessment" | "document" | "checklist" | "user_action" | "compliance_event";
  actor: string;
  system: string;
  details: string;
  metadata: Record<string, string>;
}

const auditEntries: AuditEntry[] = [
  { id: "a1", timestamp: "2026-03-16T14:30:00", action: "Risk Assessment Completed", category: "assessment", actor: "Jane Smith", system: "HR Resume Screening AI", details: "Completed EU AI Act risk assessment wizard. System classified as High Risk.", metadata: { riskLevel: "High", framework: "EU AI Act" } },
  { id: "a2", timestamp: "2026-03-16T12:15:00", action: "Checklist Item Updated", category: "checklist", actor: "Mike Johnson", system: "HR Resume Screening AI", details: "Marked 'Risk management system established' as complete in EU AI Act checklist.", metadata: { checklist: "EU AI Act High-Risk", item: "Risk management system" } },
  { id: "a3", timestamp: "2026-03-16T10:00:00", action: "Document Generated", category: "document", actor: "System", system: "Fraud Detection Model", details: "Technical documentation generated from EU AI Act Art. 11 template.", metadata: { template: "Technical Documentation", status: "Draft" } },
  { id: "a4", timestamp: "2026-03-15T16:45:00", action: "System Registered", category: "system_change", actor: "Alex Wong", system: "Content Moderation AI", details: "New AI system registered in the system registry.", metadata: { riskLevel: "Limited", department: "Trust & Safety" } },
  { id: "a5", timestamp: "2026-03-15T14:00:00", action: "Compliance Status Changed", category: "compliance_event", actor: "System", system: "Loan Decision AI", details: "Compliance status changed from 'Partial' to 'Non-Compliant' due to missed deadline.", metadata: { previousStatus: "Partial", newStatus: "Non-Compliant" } },
  { id: "a6", timestamp: "2026-03-15T11:30:00", action: "Framework Mapping Updated", category: "system_change", actor: "Sarah Lee", system: "Fraud Detection Model", details: "Added ISO 42001 to applicable frameworks for Fraud Detection Model.", metadata: { addedFramework: "ISO 42001" } },
  { id: "a7", timestamp: "2026-03-14T09:00:00", action: "User Access Granted", category: "user_action", actor: "Admin", system: "All Systems", details: "Granted Tom Brown auditor access to compliance dashboard.", metadata: { user: "Tom Brown", role: "Auditor" } },
  { id: "a8", timestamp: "2026-03-13T17:00:00", action: "Assessment Report Exported", category: "document", actor: "Jane Smith", system: "Fraud Detection Model", details: "Exported compliance assessment report as PDF for external audit.", metadata: { format: "PDF", pages: "24" } },
  { id: "a9", timestamp: "2026-03-13T10:00:00", action: "Regulation Update Detected", category: "compliance_event", actor: "System", system: "All Systems", details: "EU AI Act implementing regulation updated. Review required for affected checklists.", metadata: { regulation: "EU AI Act", updateType: "Implementing regulation" } },
  { id: "a10", timestamp: "2026-03-12T15:30:00", action: "Gap Analysis Completed", category: "assessment", actor: "Mike Johnson", system: "Loan Decision AI", details: "Identified 5 compliance gaps in NIST AI RMF assessment.", metadata: { gaps: "5", framework: "NIST AI RMF" } },
];

const categoryLabels: Record<string, string> = {
  system_change: "System Change", assessment: "Assessment", document: "Document",
  checklist: "Checklist", user_action: "User Action", compliance_event: "Compliance Event",
};
const categoryColors: Record<string, string> = {
  system_change: "badge-blue", assessment: "badge-green", document: "badge-purple",
  checklist: "badge-yellow", user_action: "badge-orange", compliance_event: "badge-red",
};

export default function AuditTrail() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const filtered = auditEntries.filter((e) => {
    if (filterCategory !== "all" && e.category !== filterCategory) return false;
    if (search && !e.action.toLowerCase().includes(search.toLowerCase()) && !e.system.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const entry = selectedEntry ? auditEntries.find((e) => e.id === selectedEntry) : null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Audit Trail</h1>
            <p className="text-gray-400 mt-1">Complete log of all compliance-related activities</p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Log
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audit log..." className="input-field w-full pl-10" />
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-field">
            <option value="all">All Categories</option>
            {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="space-y-1">
              {filtered.map((e) => (
                <button key={e.id} onClick={() => setSelectedEntry(e.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${e.id === selectedEntry ? "bg-green-600/20" : "hover:bg-gray-900"}`}>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-white">{e.action}</span>
                        <span className={categoryColors[e.category]}>{categoryLabels[e.category]}</span>
                      </div>
                      <p className="text-xs text-gray-500">{e.system} &middot; {e.actor} &middot; {new Date(e.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card h-fit sticky top-8">
            {entry ? (
              <div>
                <span className={categoryColors[entry.category]}>{categoryLabels[entry.category]}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-1">{entry.action}</h3>
                <p className="text-xs text-gray-500 mb-4">{new Date(entry.timestamp).toLocaleString()}</p>
                <p className="text-sm text-gray-300 mb-4">{entry.details}</p>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Actor:</span> <span className="text-white">{entry.actor}</span></div>
                  <div><span className="text-gray-500">System:</span> <span className="text-white">{entry.system}</span></div>
                  {Object.entries(entry.metadata).map(([k, v]) => (
                    <div key={k}><span className="text-gray-500">{k}:</span> <span className="text-white">{v}</span></div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Select an entry to view details</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
