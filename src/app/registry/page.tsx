"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, Search, Server } from "lucide-react";

interface AISystem {
  id: string;
  name: string;
  description: string;
  purpose: string;
  riskLevel: "unacceptable" | "high" | "limited" | "minimal";
  status: "active" | "development" | "retired" | "under_review";
  department: string;
  owner: string;
  frameworks: string[];
  complianceScore: number;
  lastAssessed: string;
  dataTypes: string[];
  usersAffected: string;
}

const systems: AISystem[] = [
  {
    id: "sys1", name: "Customer Service Chatbot", description: "AI-powered customer service agent handling tier-1 support queries",
    purpose: "Customer support automation", riskLevel: "limited", status: "active",
    department: "Customer Success", owner: "Jane Smith", frameworks: ["EU AI Act", "NIST AI RMF"],
    complianceScore: 85, lastAssessed: "2026-03-10", dataTypes: ["Customer queries", "Account info"], usersAffected: "50,000+ customers/month",
  },
  {
    id: "sys2", name: "HR Resume Screening AI", description: "Automated resume screening and candidate ranking for hiring pipeline",
    purpose: "Employment decision support", riskLevel: "high", status: "active",
    department: "Human Resources", owner: "Mike Johnson", frameworks: ["EU AI Act", "NIST AI RMF", "ISO 42001"],
    complianceScore: 72, lastAssessed: "2026-03-08", dataTypes: ["Resumes", "Personal data", "Employment history"], usersAffected: "10,000+ applicants/year",
  },
  {
    id: "sys3", name: "Fraud Detection Model", description: "Real-time fraud detection for financial transactions",
    purpose: "Financial security", riskLevel: "high", status: "active",
    department: "Finance", owner: "Sarah Lee", frameworks: ["EU AI Act", "NIST AI RMF"],
    complianceScore: 90, lastAssessed: "2026-03-12", dataTypes: ["Transaction data", "Account patterns"], usersAffected: "All customers",
  },
  {
    id: "sys4", name: "Content Moderation AI", description: "Automated content moderation for user-generated content platforms",
    purpose: "Content safety", riskLevel: "limited", status: "development",
    department: "Trust & Safety", owner: "Alex Wong", frameworks: ["EU AI Act", "OECD AI"],
    complianceScore: 60, lastAssessed: "2026-03-05", dataTypes: ["User content", "User behavior"], usersAffected: "1M+ users",
  },
  {
    id: "sys5", name: "Loan Decision AI", description: "Credit scoring and loan approval recommendation system",
    purpose: "Financial decision support", riskLevel: "high", status: "under_review",
    department: "Lending", owner: "Tom Brown", frameworks: ["EU AI Act", "NIST AI RMF", "ISO 42001"],
    complianceScore: 55, lastAssessed: "2026-03-01", dataTypes: ["Financial records", "Credit history", "Personal data"], usersAffected: "5,000+ applicants/month",
  },
];

const riskColors: Record<string, string> = { unacceptable: "badge-red", high: "badge-orange", limited: "badge-yellow", minimal: "badge-green" };
const statusColors: Record<string, string> = { active: "badge-green", development: "badge-blue", retired: "text-gray-500 badge bg-gray-700", under_review: "badge-yellow" };

export default function Registry() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>(systems[0].id);
  const [showNewForm, setShowNewForm] = useState(false);

  const sys = systems.find((s) => s.id === selected)!;
  const filtered = systems.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">AI System Registry</h1>
            <p className="text-gray-400 mt-1">Register and manage all AI systems for compliance tracking</p>
          </div>
          <button onClick={() => setShowNewForm(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Register System
          </button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search systems..." className="input-field w-full pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            {filtered.map((s) => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${s.id === selected ? "bg-green-600/20 border-green-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{s.name}</span>
                  <span className={riskColors[s.riskLevel]}>{s.riskLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{s.department}</span>
                  <span className={statusColors[s.status]}>{s.status.replace("_", " ")}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${s.complianceScore >= 80 ? "bg-green-500" : s.complianceScore >= 60 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${s.complianceScore}%` }} />
                  </div>
                  <span className="text-xs text-gray-600">{s.complianceScore}% compliant</span>
                </div>
              </button>
            ))}
          </div>

          <div className="col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{sys.name}</h2>
                  <p className="text-sm text-gray-400 mt-1">{sys.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className={riskColors[sys.riskLevel]}>{sys.riskLevel} risk</span>
                  <span className={statusColors[sys.status]}>{sys.status.replace("_", " ")}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><p className="text-gray-500">Purpose</p><p className="text-white">{sys.purpose}</p></div>
                <div><p className="text-gray-500">Department</p><p className="text-white">{sys.department}</p></div>
                <div><p className="text-gray-500">Owner</p><p className="text-white">{sys.owner}</p></div>
                <div><p className="text-gray-500">Users Affected</p><p className="text-white">{sys.usersAffected}</p></div>
                <div><p className="text-gray-500">Last Assessed</p><p className="text-white">{sys.lastAssessed}</p></div>
                <div><p className="text-gray-500">Compliance</p><p className={`font-bold ${sys.complianceScore >= 80 ? "text-green-400" : sys.complianceScore >= 60 ? "text-yellow-400" : "text-red-400"}`}>{sys.complianceScore}%</p></div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Applicable Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {sys.frameworks.map((f) => <span key={f} className="badge-green">{f}</span>)}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Data Types Processed</h3>
              <div className="flex flex-wrap gap-2">
                {sys.dataTypes.map((d) => <span key={d} className="badge-blue">{d}</span>)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
