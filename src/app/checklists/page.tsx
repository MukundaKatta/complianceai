"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  notes: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

interface Checklist {
  id: string;
  framework: string;
  name: string;
  system: string;
  sections: ChecklistSection[];
  lastUpdated: string;
}

const defaultChecklists: Checklist[] = [
  {
    id: "cl1", framework: "EU AI Act", name: "High-Risk AI System Compliance", system: "HR Resume Screening AI",
    lastUpdated: "2026-03-15",
    sections: [
      {
        id: "s1", title: "Risk Management System (Article 9)",
        items: [
          { id: "i1", text: "Risk management system established and maintained throughout lifecycle", checked: true, notes: "" },
          { id: "i2", text: "Known and foreseeable risks identified and analyzed", checked: true, notes: "" },
          { id: "i3", text: "Risks estimated and evaluated from testing and real-world use", checked: false, notes: "Need to complete post-deployment monitoring analysis" },
          { id: "i4", text: "Risk management measures adopted for identified risks", checked: true, notes: "" },
          { id: "i5", text: "Residual risks communicated to deployer", checked: false, notes: "" },
        ],
      },
      {
        id: "s2", title: "Data Governance (Article 10)",
        items: [
          { id: "i6", text: "Training data subject to data governance practices", checked: true, notes: "" },
          { id: "i7", text: "Data sets are relevant, representative, and free of errors", checked: false, notes: "Representation audit pending for minority groups" },
          { id: "i8", text: "Appropriate data preparation measures applied", checked: true, notes: "" },
          { id: "i9", text: "Bias examination and appropriate measures taken", checked: false, notes: "Bias audit scheduled for Q2" },
        ],
      },
      {
        id: "s3", title: "Transparency (Article 13)",
        items: [
          { id: "i10", text: "System designed to be sufficiently transparent for deployers", checked: true, notes: "" },
          { id: "i11", text: "Instructions for use provided to deployers", checked: true, notes: "" },
          { id: "i12", text: "Human oversight measures clearly described", checked: true, notes: "" },
          { id: "i13", text: "Performance metrics and known limitations documented", checked: false, notes: "Need to update with latest eval results" },
        ],
      },
      {
        id: "s4", title: "Human Oversight (Article 14)",
        items: [
          { id: "i14", text: "System enables effective human oversight", checked: true, notes: "" },
          { id: "i15", text: "Human operator can understand system capabilities and limitations", checked: true, notes: "" },
          { id: "i16", text: "Override or stop mechanisms in place", checked: true, notes: "" },
        ],
      },
    ],
  },
  {
    id: "cl2", framework: "NIST AI RMF", name: "AI RMF Compliance Checklist", system: "Fraud Detection Model",
    lastUpdated: "2026-03-12",
    sections: [
      {
        id: "ns1", title: "GOVERN Function",
        items: [
          { id: "n1", text: "AI risk management policies and processes established", checked: true, notes: "" },
          { id: "n2", text: "Roles and responsibilities defined for AI risk management", checked: true, notes: "" },
          { id: "n3", text: "Organizational AI principles documented", checked: true, notes: "" },
        ],
      },
      {
        id: "ns2", title: "MAP Function",
        items: [
          { id: "n4", text: "Context of use and potential impacts mapped", checked: true, notes: "" },
          { id: "n5", text: "Relevant AI risks categorized", checked: true, notes: "" },
          { id: "n6", text: "Benefits and costs documented", checked: false, notes: "" },
        ],
      },
    ],
  },
];

export default function Checklists() {
  const [checklists, setChecklists] = useState<Checklist[]>(defaultChecklists);
  const [selected, setSelected] = useState<string>(defaultChecklists[0].id);
  const [expandedSection, setExpandedSection] = useState<string | null>(defaultChecklists[0].sections[0].id);

  const checklist = checklists.find((c) => c.id === selected)!;
  const totalItems = checklist.sections.reduce((a, s) => a + s.items.length, 0);
  const checkedItems = checklist.sections.reduce((a, s) => a + s.items.filter((i) => i.checked).length, 0);
  const pct = Math.round((checkedItems / totalItems) * 100);

  const toggleItem = (sectionId: string, itemId: string) => {
    setChecklists((prev) =>
      prev.map((cl) =>
        cl.id === selected
          ? {
              ...cl,
              sections: cl.sections.map((s) =>
                s.id === sectionId
                  ? { ...s, items: s.items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)) }
                  : s
              ),
            }
          : cl
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Compliance Checklists</h1>
          <p className="text-gray-400 mt-1">Track compliance requirements by framework</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Checklist Selector */}
          <div className="space-y-3">
            {checklists.map((cl) => {
              const total = cl.sections.reduce((a, s) => a + s.items.length, 0);
              const checked = cl.sections.reduce((a, s) => a + s.items.filter((i) => i.checked).length, 0);
              return (
                <button key={cl.id} onClick={() => setSelected(cl.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${cl.id === selected ? "bg-green-600/20 border-green-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"}`}>
                  <span className="badge-blue mb-2 inline-block">{cl.framework}</span>
                  <p className="text-sm font-medium text-white">{cl.name}</p>
                  <p className="text-xs text-gray-500">{cl.system}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${(checked / total) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-600">{checked}/{total}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Checklist Detail */}
          <div className="col-span-3 space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="badge-blue">{checklist.framework}</span>
                  <h2 className="text-xl font-bold text-white mt-2">{checklist.name}</h2>
                  <p className="text-sm text-gray-400">System: {checklist.system}</p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${pct >= 80 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}>{pct}%</p>
                  <p className="text-xs text-gray-500">{checkedItems}/{totalItems} complete</p>
                </div>
              </div>
            </div>

            {checklist.sections.map((section) => {
              const sChecked = section.items.filter((i) => i.checked).length;
              const expanded = expandedSection === section.id;
              return (
                <div key={section.id} className="card">
                  <button
                    className="w-full flex items-center justify-between"
                    onClick={() => setExpandedSection(expanded ? null : section.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-white">{section.title}</span>
                      <span className="text-xs text-gray-500">{sChecked}/{section.items.length}</span>
                    </div>
                    {expanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </button>
                  {expanded && (
                    <div className="mt-4 space-y-2">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                          <button onClick={() => toggleItem(section.id, item.id)} className="flex-shrink-0 mt-0.5">
                            {item.checked ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                          <div className="flex-1">
                            <p className={`text-sm ${item.checked ? "text-gray-400 line-through" : "text-gray-200"}`}>{item.text}</p>
                            {item.notes && <p className="text-xs text-yellow-400 mt-1">{item.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
