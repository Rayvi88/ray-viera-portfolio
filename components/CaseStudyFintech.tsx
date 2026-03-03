"use client";

import { useState } from "react";
import Image from "next/image";

const tabs = ["Overview", "Problem", "Process", "Impact", "Learning"];

const stats = [
  { img: "/study-70.png", label: "% Response Time" },
  { img: "/study-53.png", label: "% Resolution Time" },
  { img: "/study-38.png", label: "% Escalated Cases" },
];

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-stretch h-full">
      <div className="flex flex-col justify-between gap-6 lg:gap-0">
        <div>
          <p className="text-xs font-bold tracking-widest mb-4 text-gray-400">CASE STUDY</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight mb-4 lg:mb-6">
            Identity Verification Knowledge System - Fintech B2B
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            I led the design of a centralized knowledge and decision-making system
            to optimize identity verification workflows. The initiative reduced
            manual effort, improved decision consistency, and enabled scalable
            operations within a high-risk fintech environment.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:gap-8">
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">Role</p>
            <p className="text-sm text-black">Product Design</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">Time</p>
            <p className="text-sm text-black">2023-2025</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">Platform</p>
            <p className="text-sm text-black">System Internal</p>
          </div>
        </div>
      </div>
      {/* Stats — fila en mobile, columna en desktop */}
      <div className="flex flex-row lg:flex-col justify-around lg:justify-between items-center lg:w-64">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image
              src={stat.img}
              alt={stat.label}
              width={200}
              height={140}
              className="object-contain w-24 sm:w-32 lg:w-[200px]"
            />
            <p className="mt-1 lg:mt-2 text-[#00C3D0] text-xs sm:text-sm text-center">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemTab() {
  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight">
        The verification process lacked consistency, speed, and scalability
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="pb-4 sm:pb-0 sm:pr-8 border-b sm:border-b-0 border-[#E8E4DC]">
          <h3 className="text-sm font-bold text-[#00C3D0] mb-3 sm:mb-4 text-center">Operational Issues</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>Inconsistent decision criteria</li>
            <li>8+ weeks onboarding</li>
            <li>Frequent escalations</li>
          </ul>
        </div>
        <div className="py-4 sm:py-0 sm:px-8 border-b sm:border-b-0 sm:border-l sm:border-r border-[#E8E4DC]">
          <h3 className="text-sm font-bold text-[#00C3D0] mb-3 sm:mb-4 text-center">Business Risks</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>Compliance dependent on tribal knowledge</li>
            <li>SLA breaches</li>
          </ul>
        </div>
        <div className="pt-4 sm:pt-0 sm:pl-8">
          <h3 className="text-sm font-bold text-[#00C3D0] mb-3 sm:mb-4 text-center">Customer Impact</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>Delay</li>
            <li>Frustration</li>
            <li>Negative reviews</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12 items-center mt-2 lg:mt-8">
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-black mb-4 lg:mb-6">Voice of the Customer</h3>
          <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-gray-700 italic">
            <p>&quot;I sent the documents but no one responded.&quot;</p>
            <p>&quot;They rejected my documents without explanation.&quot;</p>
            <p>&quot;My account was limited and I received no clarity.&quot;</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/problem.png" alt="Problem diagram" className="w-full object-contain" />
          <p className="text-xs text-gray-500 mt-3 text-center">
            Different analysts applied different criteria, leading to inconsistent outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProcessTab() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">
          Building a Scalable Verification System
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          A structured decision framework replacing analyst judgment.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center border border-[#E8E4DC] rounded bg-[#F7F4EE] px-6 lg:px-8 py-4 gap-3 sm:gap-0">
        <span className="flex-1 text-sm text-gray-700">
          <span className="font-bold">Before:</span> Analyst dependent decisions
        </span>
        <div className="hidden sm:block w-px h-6 bg-[#E8E4DC] mx-6" />
        <span className="flex-1 text-sm text-gray-700">
          <span className="font-bold">After:</span> Structured risk driven system
        </span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#00C3D0] mb-1">Risk Model</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { level: "Level 1", risk: "Low risk", desc: "Automated, Fast track", color: "#4CAF50" },
            { level: "Level 2", risk: "Medium risk", desc: "Guided verification", color: "#FF9800" },
            { level: "Level 3", risk: "High risk", desc: "Escalation required", color: "#F44336" },
          ].map((item) => (
            <div key={item.level} className="border border-[#E8E4DC] rounded overflow-hidden">
              <div className="h-1.5 w-full" style={{ backgroundColor: item.color }} />
              <div className="p-4 text-center">
                <p className="font-bold text-gray-800 text-sm">{item.level}</p>
                <p className="font-bold text-gray-800 text-sm mt-2">{item.risk}</p>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#00C3D0] mb-1">Decision Framework</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-4" />
        {/* En mobile: columna con flechas entre steps */}
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-center">
          {["Case Submitted", "Country & Document Validation", "Risk Classification", "Standardized Outcome"].map(
            (step, i, arr) => (
              <div key={step} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="border border-[#E8E4DC] rounded px-4 py-2 text-sm text-gray-700 text-center w-full sm:w-auto">
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <span className="text-gray-400 text-base rotate-90 sm:rotate-0">&#8594;</span>
                )}
              </div>
            )
          )}
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          Replaced analyst-dependent decisions with rule-based classification.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#00C3D0] mb-1">Knowledge System</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-4" />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          {[
            { icon: "/guidelines.svg", label: "Guidelines" },
            { icon: "/decision.svg", label: "Decision Trees" },
            { icon: "/escalation.svg", label: "Escalation Paths" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 border border-[#E8E4DC] rounded px-6 py-3 text-sm text-gray-700"
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImpactTab() {
  return (
    <div className="flex flex-col gap-3 lg:gap-2">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">Results &amp; Impact</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          A structured decision framework replacing analyst judgment.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-[#E8E4DC] rounded-xl p-3 flex flex-col gap-2">
          <h3 className="text-sm font-bold text-[#00C3D0]">System Shift</h3>
          <div>
            <p className="text-xs font-bold text-gray-800">
              Operational redesign reduced Dependency on individual analysts
            </p>
            <ul className="text-xs text-gray-600 list-disc list-inside mt-1 space-y-0.5">
              <li>Team optimized from 14 to 8 analysts</li>
              <li>Onboarding time reduced by 50%</li>
            </ul>
          </div>
          <div className="bg-[#F7F4EE] rounded-lg p-2 flex items-center justify-center">
            <img src="/group-11.png" alt="Team reduction diagram" className="w-full object-contain max-h-32" />
          </div>
          <p className="text-xs text-gray-400 text-center">Same verification volume</p>
        </div>
        <div className="border border-[#E8E4DC] rounded-xl p-3 flex flex-col gap-2">
          <h3 className="text-sm font-bold text-[#00C3D0]">Performance impact</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">-70%</span>
            <span className="text-base font-bold text-gray-800">Average Response Time</span>
          </div>
          <div className="flex-1 border border-[#E8E4DC] rounded-lg p-3 flex flex-col justify-between">
            <div>
              <p className="text-3xl font-bold text-[#00C3D0]">15 min</p>
              <p className="text-xs text-gray-500">(Before: 80 min)</p>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Standardized flows and templates reduced variability in case handling.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#00C3D0] mb-1">Operational Metrics</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-3" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Average Response Time", value: "120 - 15", unit: "mins", delta: "85%" },
            { label: "Reduction in training", value: "16 - 8", unit: "weeks", delta: "40%" },
            { label: "Average Resolution Time", value: "24", unit: "Hours", delta: "53%" },
            { label: "Customer Satisfaction", value: "4.3", unit: "", delta: "46%" },
          ].map((m) => (
            <div key={m.label} className="border border-[#E8E4DC] rounded-lg p-4 lg:p-8">
              <p className="text-xs sm:text-base font-bold text-gray-800 mb-1">{m.label}</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                {m.value} <span className="text-sm font-normal">{m.unit}</span>
              </p>
              <p className="text-xs mt-1 font-semibold text-[#00C3D0]">{m.delta}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#00C3D0] mb-1">Business Impact</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ul className="text-xs text-gray-800 list-disc list-inside space-y-1">
            <li>Enabled expansion to new markets with standardized criteria</li>
            <li>Reduced compliance risk through rule based classification</li>
          </ul>
          <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
            <li>Increased operational scalability without linear headcount growth</li>
            <li>Improve communication consistency.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function LearningTab() {
  const items = [
    {
      title: "Adapt compliance standards into scalable, action-driven processes.",
      desc: "Learned to translate regulatory requirements into efficient verification workflows.",
    },
    {
      title: "Design internal systems to align multiple teams around one source of truth.",
      desc: "Practice creating unified documentation and frameworks for consistent decision.",
    },
    {
      title: "Mature a tribal knowledge process into a structured, scalable solution.",
      desc: "Discovered how to build systems that reduce dependency on individual expertise.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 py-4">
      <div className="text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#00C3D0]">What I Learned</h2>
        <p className="text-sm text-gray-500 mt-1">
          Insights gained from scaling a global verification process.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full sm:w-4/5 lg:w-2/3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-4 border border-[#E8E4DC] rounded-xl px-4 sm:px-5 py-4">
            <img src="/check-fill.svg" alt="check" className="w-7 h-7 lg:w-8 lg:h-8 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#00C3D0] mb-1">{item.title}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderTab({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 text-sm">{name} — contenido próximamente</p>
    </div>
  );
}

export default function CaseStudyFintech() {
  const [activeTab, setActiveTab] = useState(0);

  const prev = () => setActiveTab((t) => (t === 0 ? tabs.length - 1 : t - 1));
  const next = () => setActiveTab((t) => (t === tabs.length - 1 ? 0 : t + 1));

  const renderTab = () => {
    switch (activeTab) {
      case 0: return <OverviewTab />;
      case 1: return <ProblemTab />;
      case 2: return <ProcessTab />;
      case 3: return <ImpactTab />;
      case 4: return <LearningTab />;
      default: return <PlaceholderTab name={tabs[activeTab]} />;
    }
  };

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-8 lg:py-16 bg-[#FFFCF6]">
      <div className="flex-1 flex items-stretch gap-3 lg:gap-6">
        {/* Flechas ocultas en mobile */}
        <button
          onClick={prev}
          className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300"
        >
          &#8592;
        </button>
        <div className="flex-1 transition-all duration-500 ease-in-out">
          {renderTab()}
        </div>
        <button
          onClick={next}
          className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300"
        >
          &#8594;
        </button>
      </div>

      {/* Tab bar — scroll horizontal en mobile */}
      <div className="mt-8 lg:mt-12 border-t border-[#E8E4DC] pt-4 lg:pt-6">
        <div className="flex items-center gap-4 lg:gap-6 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab, i) => (
            <div key={i} className="flex items-center gap-4 lg:gap-6 shrink-0">
              <button
                onClick={() => setActiveTab(i)}
                className={`text-sm outline-none focus:outline-none transition-colors duration-300 whitespace-nowrap ${
                  i === activeTab ? "text-[#00C3D0] font-bold" : "text-gray-500 hover:text-[#00C3D0]"
                }`}
              >
                {tab}
              </button>
              {i < tabs.length - 1 && <span className="text-gray-300 text-xs">|</span>}
            </div>
          ))}
          {/* Flechas en mobile dentro del tab bar */}
          <div className="flex sm:hidden items-center gap-2 ml-auto shrink-0">
            <button
              onClick={prev}
              className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-gray-500"
            >
              &#8592;
            </button>
            <button
              onClick={next}
              className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-gray-500"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}