"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Search, ExternalLink, BookOpen } from "lucide-react";

interface Regulation {
  id: string;
  name: string;
  shortName: string;
  jurisdiction: string;
  status: "enacted" | "proposed" | "draft" | "effective";
  effectiveDate: string;
  description: string;
  keyRequirements: string[];
  riskCategories: string[];
  url: string;
}

const regulations: Regulation[] = [
  {
    id: "eu-ai-act", name: "EU Artificial Intelligence Act", shortName: "EU AI Act",
    jurisdiction: "European Union", status: "effective", effectiveDate: "2025-08-01",
    description: "Comprehensive risk-based regulatory framework for AI systems in the EU. Classifies AI systems by risk level and imposes requirements accordingly.",
    keyRequirements: [
      "Risk classification (Unacceptable, High, Limited, Minimal)",
      "Conformity assessment for high-risk systems",
      "Transparency obligations for certain AI systems",
      "Human oversight requirements",
      "Data governance and quality requirements",
      "Technical documentation and record-keeping",
      "Registration in EU database for high-risk AI",
    ],
    riskCategories: ["High-Risk", "Limited Risk", "Minimal Risk", "Unacceptable Risk"],
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689",
  },
  {
    id: "nist-ai-rmf", name: "NIST AI Risk Management Framework", shortName: "NIST AI RMF",
    jurisdiction: "United States", status: "effective", effectiveDate: "2023-01-26",
    description: "Voluntary framework providing guidance on managing AI risks. Organized around four functions: Govern, Map, Measure, and Manage.",
    keyRequirements: [
      "Govern: Establish AI risk management policies",
      "Map: Identify and contextualize AI risks",
      "Measure: Analyze, assess, and track AI risks",
      "Manage: Prioritize and act on AI risks",
      "Trustworthy AI characteristics assessment",
    ],
    riskCategories: ["Governance", "Mapping", "Measurement", "Management"],
    url: "https://www.nist.gov/artificial-intelligence/ai-risk-management-framework",
  },
  {
    id: "iso-42001", name: "ISO/IEC 42001:2023", shortName: "ISO 42001",
    jurisdiction: "International", status: "effective", effectiveDate: "2023-12-18",
    description: "International standard for AI Management Systems. Provides requirements for establishing, implementing, and improving an AIMS.",
    keyRequirements: [
      "AI management system establishment",
      "Risk assessment for AI systems",
      "AI policy and objectives",
      "Competence and awareness requirements",
      "Operational planning and control",
      "Performance evaluation",
    ],
    riskCategories: ["Management", "Operational", "Technical"],
    url: "https://www.iso.org/standard/81230.html",
  },
  {
    id: "oecd-ai", name: "OECD AI Principles", shortName: "OECD AI",
    jurisdiction: "International (46 countries)", status: "effective", effectiveDate: "2019-05-22",
    description: "Intergovernmental standard for responsible AI. Adopted by over 46 countries promoting trustworthy AI.",
    keyRequirements: [
      "Inclusive growth and sustainable development",
      "Human-centred values and fairness",
      "Transparency and explainability",
      "Robustness, security and safety",
      "Accountability",
    ],
    riskCategories: ["Values", "Transparency", "Security", "Accountability"],
    url: "https://oecd.ai/en/ai-principles",
  },
  {
    id: "china-ai", name: "China AI Regulations (Comprehensive)", shortName: "China AI Law",
    jurisdiction: "China", status: "effective", effectiveDate: "2023-08-15",
    description: "Collection of AI regulations including Generative AI measures, Algorithm Recommendations, Deep Synthesis, and forthcoming AI Law.",
    keyRequirements: [
      "Algorithm registration and filing",
      "Content safety requirements",
      "User consent and transparency",
      "Training data governance",
      "Security assessments for generative AI",
    ],
    riskCategories: ["Content", "Algorithms", "Data", "Security"],
    url: "https://www.cac.gov.cn",
  },
  {
    id: "uk-ai-code", name: "UK AI Regulation Framework", shortName: "UK AI Code",
    jurisdiction: "United Kingdom", status: "proposed", effectiveDate: "2026-TBD",
    description: "Principles-based approach to AI regulation implemented through existing sector regulators.",
    keyRequirements: [
      "Safety, security and robustness",
      "Transparency and explainability",
      "Fairness",
      "Accountability and governance",
      "Contestability and redress",
    ],
    riskCategories: ["Safety", "Transparency", "Fairness", "Governance"],
    url: "https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach",
  },
];

const statusColors: Record<string, string> = { enacted: "badge-green", effective: "badge-green", proposed: "badge-yellow", draft: "badge-blue" };

export default function Regulations() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>(regulations[0].id);
  const [filterJurisdiction, setFilterJurisdiction] = useState("all");

  const reg = regulations.find((r) => r.id === selected)!;
  const jurisdictions = [...new Set(regulations.map((r) => r.jurisdiction))];

  const filtered = regulations.filter((r) => {
    if (filterJurisdiction !== "all" && r.jurisdiction !== filterJurisdiction) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Regulation Database</h1>
          <p className="text-gray-400 mt-1">Global AI regulations and compliance frameworks</p>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search regulations..." className="input-field w-full pl-10" />
          </div>
          <select value={filterJurisdiction} onChange={(e) => setFilterJurisdiction(e.target.value)} className="input-field">
            <option value="all">All Jurisdictions</option>
            {jurisdictions.map((j) => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            {filtered.map((r) => (
              <button key={r.id} onClick={() => setSelected(r.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${r.id === selected ? "bg-green-600/20 border-green-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">{r.shortName}</span>
                  <span className={statusColors[r.status]}>{r.status}</span>
                </div>
                <p className="text-xs text-gray-500">{r.jurisdiction}</p>
              </button>
            ))}
          </div>

          <div className="col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{reg.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={statusColors[reg.status]}>{reg.status}</span>
                    <span className="text-xs text-gray-500">{reg.jurisdiction}</span>
                    <span className="text-xs text-gray-500">Effective: {reg.effectiveDate}</span>
                  </div>
                </div>
                <a href={reg.url} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-1 text-sm">
                  <ExternalLink className="w-3 h-3" /> Source
                </a>
              </div>
              <p className="text-sm text-gray-300">{reg.description}</p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Key Requirements</h3>
              <div className="space-y-2">
                {reg.keyRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-green-600/20 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-gray-200">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Categories</h3>
              <div className="flex flex-wrap gap-2">
                {reg.riskCategories.map((cat) => (
                  <span key={cat} className="badge-blue">{cat}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
