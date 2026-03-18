"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ChevronRight, ChevronLeft, CheckCircle, AlertTriangle } from "lucide-react";

interface WizardStep {
  id: number;
  title: string;
  description: string;
  questions: { id: string; text: string; type: "select" | "text" | "multi"; options?: string[] }[];
}

const wizardSteps: WizardStep[] = [
  {
    id: 1, title: "System Identification", description: "Identify the AI system being assessed",
    questions: [
      { id: "q1", text: "What is the name of the AI system?", type: "text" },
      { id: "q2", text: "What is the primary purpose of this system?", type: "select", options: ["Decision Support", "Automation", "Content Generation", "Analytics", "Monitoring", "Other"] },
      { id: "q3", text: "Which department operates this system?", type: "text" },
    ],
  },
  {
    id: 2, title: "Risk Classification", description: "Determine the risk level per EU AI Act",
    questions: [
      { id: "q4", text: "Does this system make or support decisions affecting individuals' rights?", type: "select", options: ["Yes - directly makes decisions", "Yes - supports human decisions", "No"] },
      { id: "q5", text: "In which domain is this system used?", type: "select", options: ["Employment & HR", "Education", "Law Enforcement", "Healthcare", "Financial Services", "Critical Infrastructure", "General Purpose", "Other"] },
      { id: "q6", text: "Does the system use biometric data?", type: "select", options: ["Yes - real-time identification", "Yes - other biometric processing", "No"] },
      { id: "q7", text: "Could the system cause physical or psychological harm?", type: "select", options: ["High potential", "Moderate potential", "Low potential", "No potential"] },
    ],
  },
  {
    id: 3, title: "Data Assessment", description: "Evaluate data governance and quality",
    questions: [
      { id: "q8", text: "What types of personal data does the system process?", type: "multi", options: ["Names", "Contact info", "Financial data", "Health data", "Biometric", "Behavioral", "None"] },
      { id: "q9", text: "Is there a data governance framework in place?", type: "select", options: ["Yes - comprehensive", "Yes - partial", "No"] },
      { id: "q10", text: "Has data quality been validated?", type: "select", options: ["Yes - regularly", "Yes - once", "No"] },
    ],
  },
  {
    id: 4, title: "Transparency & Explainability", description: "Assess transparency measures",
    questions: [
      { id: "q11", text: "Can the system's decisions be explained to affected individuals?", type: "select", options: ["Yes - fully explainable", "Partially explainable", "Black box - not explainable"] },
      { id: "q12", text: "Are users informed they are interacting with an AI?", type: "select", options: ["Yes - always", "Sometimes", "No"] },
      { id: "q13", text: "Is there documentation of the system's logic and limitations?", type: "select", options: ["Comprehensive documentation", "Partial documentation", "No documentation"] },
    ],
  },
  {
    id: 5, title: "Human Oversight", description: "Evaluate human oversight mechanisms",
    questions: [
      { id: "q14", text: "What level of human oversight exists?", type: "select", options: ["Human-in-the-loop (approves every decision)", "Human-on-the-loop (monitors and can intervene)", "Human-in-command (can override)", "No human oversight"] },
      { id: "q15", text: "Can the system be stopped or overridden at any time?", type: "select", options: ["Yes - immediate stop capability", "Yes - with delay", "No"] },
    ],
  },
];

export default function RiskAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [completed, setCompleted] = useState(false);

  const step = wizardSteps[currentStep];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleMulti = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      return { ...prev, [questionId]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] };
    });
  };

  const next = () => {
    if (currentStep < wizardSteps.length - 1) setCurrentStep(currentStep + 1);
    else setCompleted(true);
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (completed) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="card text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Assessment Complete</h1>
              <p className="text-gray-400">Risk assessment has been completed for the AI system.</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Assessment Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">Risk Classification</span>
                  <span className="badge-orange">High Risk</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">Data Sensitivity</span>
                  <span className="badge-yellow">Medium</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">Transparency</span>
                  <span className="badge-green">Adequate</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-300">Human Oversight</span>
                  <span className="badge-green">Sufficient</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-300">3 compliance gaps identified. Review the checklist for remediation steps.</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setCompleted(false); setCurrentStep(0); setAnswers({}); }} className="btn-secondary">Start New Assessment</button>
                <button className="btn-primary">Generate Report</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Risk Assessment Wizard</h1>
          <p className="text-gray-400 mt-1">Step-by-step AI system risk assessment</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 max-w-3xl mx-auto">
          {wizardSteps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < currentStep ? "bg-green-600 text-white" : i === currentStep ? "bg-green-500 text-white" : "bg-gray-800 text-gray-500"
              }`}>
                {i < currentStep ? <CheckCircle className="w-4 h-4" /> : s.id}
              </div>
              {i < wizardSteps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded ${i < currentStep ? "bg-green-600" : "bg-gray-800"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-1">Step {step.id}: {step.title}</h2>
            <p className="text-sm text-gray-400 mb-6">{step.description}</p>

            <div className="space-y-6">
              {step.questions.map((q) => (
                <div key={q.id}>
                  <label className="text-sm font-medium text-gray-200 block mb-2">{q.text}</label>
                  {q.type === "text" && (
                    <input
                      value={(answers[q.id] as string) || ""}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      className="input-field w-full"
                    />
                  )}
                  {q.type === "select" && (
                    <select value={(answers[q.id] as string) || ""} onChange={(e) => handleAnswer(q.id, e.target.value)} className="input-field w-full">
                      <option value="">Select...</option>
                      {q.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  )}
                  {q.type === "multi" && (
                    <div className="flex flex-wrap gap-2">
                      {q.options?.map((opt) => {
                        const selected_ = ((answers[q.id] as string[]) || []).includes(opt);
                        return (
                          <button key={opt} onClick={() => handleMulti(q.id, opt)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selected_ ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-800">
              <button onClick={prev} disabled={currentStep === 0}
                className={`flex items-center gap-2 ${currentStep === 0 ? "text-gray-600" : "text-gray-400 hover:text-white"}`}>
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={next} className="btn-primary flex items-center gap-2">
                {currentStep === wizardSteps.length - 1 ? "Complete Assessment" : "Next"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
