"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FileText, Download, Plus, Eye } from "lucide-react";

interface DocTemplate {
  id: string;
  name: string;
  framework: string;
  description: string;
  sections: string[];
  generatedDocs: { id: string; system: string; date: string; status: "draft" | "final" }[];
}

const templates: DocTemplate[] = [
  {
    id: "t1", name: "Technical Documentation (EU AI Act Art. 11)", framework: "EU AI Act",
    description: "Comprehensive technical documentation required for high-risk AI systems under the EU AI Act.",
    sections: ["General Description", "Risk Management System", "Data Governance", "Technical Specifications", "Performance Metrics", "Human Oversight Measures", "Cybersecurity Measures", "Quality Management"],
    generatedDocs: [
      { id: "d1", system: "HR Resume Screening AI", date: "2026-03-15", status: "draft" },
      { id: "d2", system: "Fraud Detection Model", date: "2026-03-10", status: "final" },
    ],
  },
  {
    id: "t2", name: "Conformity Assessment Report", framework: "EU AI Act",
    description: "Self-assessment or third-party conformity assessment documentation.",
    sections: ["System Identification", "Risk Classification Rationale", "Requirements Compliance Matrix", "Test Results Summary", "Declaration of Conformity"],
    generatedDocs: [
      { id: "d3", system: "Loan Decision AI", date: "2026-03-08", status: "draft" },
    ],
  },
  {
    id: "t3", name: "AI Impact Assessment", framework: "NIST AI RMF",
    description: "Comprehensive impact assessment following NIST AI RMF guidance.",
    sections: ["System Overview", "Stakeholder Analysis", "Risk Identification", "Impact Analysis", "Mitigation Strategies", "Monitoring Plan"],
    generatedDocs: [],
  },
  {
    id: "t4", name: "Transparency Report", framework: "Multiple",
    description: "Public-facing transparency report about AI system usage and governance.",
    sections: ["Executive Summary", "AI Systems Inventory", "Governance Framework", "Safety Measures", "Incident Summary", "Future Plans"],
    generatedDocs: [
      { id: "d4", system: "All Systems", date: "2026-03-01", status: "final" },
    ],
  },
];

export default function Documentation() {
  const [selected, setSelected] = useState<string>(templates[0].id);
  const [generating, setGenerating] = useState(false);
  const template = templates.find((t) => t.id === selected)!;

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Documentation Generator</h1>
            <p className="text-gray-400 mt-1">Auto-generate compliance documentation from templates</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            {templates.map((t) => (
              <button key={t.id} onClick={() => setSelected(t.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${t.id === selected ? "bg-green-600/20 border-green-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-green-400" />
                  <span className="badge-blue">{t.framework}</span>
                </div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-gray-500 mt-1">{t.generatedDocs.length} documents generated</p>
              </button>
            ))}
          </div>

          <div className="col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="badge-blue mb-2 inline-block">{template.framework}</span>
                  <h2 className="text-xl font-bold text-white">{template.name}</h2>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </div>
                <button onClick={handleGenerate} className="btn-primary flex items-center gap-2" disabled={generating}>
                  {generating ? "Generating..." : <><Plus className="w-4 h-4" /> Generate</>}
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Document Sections</h3>
              <div className="space-y-2">
                {template.sections.map((section, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-green-600/20 text-green-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <span className="text-sm text-gray-200">{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {template.generatedDocs.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Generated Documents</h3>
                <div className="space-y-2">
                  {template.generatedDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-white">{doc.system}</p>
                          <p className="text-xs text-gray-500">{doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={doc.status === "final" ? "badge-green" : "badge-yellow"}>{doc.status}</span>
                        <button className="p-1 hover:bg-gray-700 rounded"><Eye className="w-4 h-4 text-gray-400" /></button>
                        <button className="p-1 hover:bg-gray-700 rounded"><Download className="w-4 h-4 text-gray-400" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
