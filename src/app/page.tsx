"use client";

import Sidebar from "@/components/Sidebar";
import { Scale, CheckCircle, AlertTriangle, Clock, FileText, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const complianceStatus = [
  { name: "Compliant", value: 12, color: "#22c55e" },
  { name: "Partial", value: 8, color: "#eab308" },
  { name: "Non-Compliant", value: 3, color: "#ef4444" },
  { name: "Not Assessed", value: 5, color: "#6b7280" },
];

const frameworkCompliance = [
  { framework: "EU AI Act", compliance: 78 },
  { framework: "NIST AI RMF", compliance: 85 },
  { framework: "ISO 42001", compliance: 62 },
  { framework: "OECD AI", compliance: 90 },
  { framework: "China AI Law", compliance: 45 },
  { framework: "UK AI Code", compliance: 72 },
];

const recentActivity = [
  { action: "Risk assessment completed", system: "Customer Service Bot", date: "2026-03-16", type: "assessment" },
  { action: "EU AI Act checklist updated", system: "HR Screening AI", date: "2026-03-15", type: "checklist" },
  { action: "Audit report generated", system: "Fraud Detection Model", date: "2026-03-14", type: "audit" },
  { action: "New system registered", system: "Content Moderation AI", date: "2026-03-13", type: "registry" },
  { action: "Compliance gap identified", system: "Loan Decision AI", date: "2026-03-12", type: "gap" },
];

const upcomingDeadlines = [
  { regulation: "EU AI Act Article 6", deadline: "2026-04-01", status: "at_risk" },
  { regulation: "NIST AI RMF Review", deadline: "2026-04-15", status: "on_track" },
  { regulation: "ISO 42001 Audit", deadline: "2026-05-01", status: "on_track" },
  { regulation: "EU AI Act Article 52", deadline: "2026-03-30", status: "overdue" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Compliance Dashboard</h1>
          <p className="text-gray-400 mt-1">Overview of AI regulatory compliance status</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <Scale className="w-5 h-5 text-green-400" />
              <TrendingUp className="w-3 h-3 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">28</p>
            <p className="text-sm text-gray-400">AI Systems Registered</p>
          </div>
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">73%</p>
            <p className="text-sm text-gray-400">Overall Compliance Rate</p>
          </div>
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-yellow-400">11</p>
            <p className="text-sm text-gray-400">Open Gaps</p>
          </div>
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">6</p>
            <p className="text-sm text-gray-400">Active Frameworks</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Compliance Pie */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">System Compliance Status</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={complianceStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {complianceStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Framework Compliance */}
          <div className="card col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Framework Compliance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={frameworkCompliance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="framework" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
                <Bar dataKey="compliance" fill="#22c55e" radius={[4, 4, 0, 0]} name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm text-gray-200">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.system}</p>
                  </div>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm text-gray-200">{item.regulation}</p>
                    <p className="text-xs text-gray-500">{item.deadline}</p>
                  </div>
                  <span className={
                    item.status === "overdue" ? "badge-red" :
                    item.status === "at_risk" ? "badge-yellow" : "badge-green"
                  }>{item.status.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
