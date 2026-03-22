"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function OverviewTab() {
  const t = useTranslations("caseStudyFintech");

  const stats = [
    { img: "/study-70.png", label: t("stats.0.label") },
    { img: "/study-53.png", label: t("stats.1.label") },
    { img: "/study-38.png", label: t("stats.2.label") },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-stretch h-full">
      <div className="flex flex-col justify-between gap-6 lg:gap-0">
        <div>
          <p className="text-xs font-bold tracking-widest mb-4 text-gray-400">{t("overview.tag")}</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight mb-4 lg:mb-6">
            {t("overview.title")}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">{t("overview.desc")}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:gap-8">
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.roleLabel")}</p>
            <p className="text-sm text-black">{t("overview.roleValue")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.timeLabel")}</p>
            <p className="text-sm text-black">{t("overview.timeValue")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.platformLabel")}</p>
            <p className="text-sm text-black">{t("overview.platformValue")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row lg:flex-col justify-around lg:justify-between items-center lg:w-64">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image
              src={stat.img}
              alt={stat.label}
              width={200}
              height={140}
              className="object-contain w-20 sm:w-32 lg:w-[200px]"
            />
            <p className="mt-1 lg:mt-2 text-[#00C3D0] text-[10px] sm:text-sm text-center">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemTab() {
  const t = useTranslations("caseStudyFintech");

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight">
        {t("problem.title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="pb-4 sm:pb-0 sm:pr-8 border-b sm:border-b-0 border-[#E8E4DC]">
          <h3 className="text-sm font-bold text-[#00C3D0] mb-3 sm:mb-4 text-center">{t("problem.col1title")}</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            {(t.raw("problem.col1items") as string[]).map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="py-4 sm:py-0 sm:px-8 border-b sm:border-b-0 sm:border-l sm:border-r border-[#E8E4DC]">
          <h3 className="text-sm font-bold text-[#00C3D0] mb-3 sm:mb-4 text-center">{t("problem.col2title")}</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            {(t.raw("problem.col2items") as string[]).map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="pt-4 sm:pt-0 sm:pl-8">
          <h3 className="text-sm font-bold text-[#00C3D0] mb-3 sm:mb-4 text-center">{t("problem.col3title")}</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            {(t.raw("problem.col3items") as string[]).map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12 items-center mt-2 lg:mt-8">
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-black mb-4 lg:mb-6">{t("problem.vocTitle")}</h3>
          <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-gray-700 italic">
            <p>&quot;{t("problem.voc1")}&quot;</p>
            <p>&quot;{t("problem.voc2")}&quot;</p>
            <p>&quot;{t("problem.voc3")}&quot;</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src="/problem.png" alt="Problem diagram" className="w-full object-contain" />
          <p className="text-xs text-gray-500 mt-3 text-center">{t("problem.diagramCaption")}</p>
        </div>
      </div>
    </div>
  );
}

function ProcessTab() {
  const t = useTranslations("caseStudyFintech");

  const levels = t.raw("process.levels") as { level: string; risk: string; desc: string }[];
  const steps = t.raw("process.steps") as string[];
  const knowledgeItems = t.raw("process.knowledgeItems") as string[];

  const levelColors = ["#4CAF50", "#FF9800", "#F44336"];
  const knowledgeIcons = ["/guidelines.svg", "/decision.svg", "/escalation.svg"];

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("process.title")}</h2>
        <p className="text-sm text-gray-500 mt-1">{t("process.subtitle")}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center border border-[#E8E4DC] rounded bg-[#F7F4EE] px-6 lg:px-8 py-4 gap-3 sm:gap-0">
        <span className="flex-1 text-sm text-gray-700">
          <span className="font-bold">{t("process.beforeLabel")}</span> {t("process.beforeValue")}
        </span>
        <div className="hidden sm:block w-px h-6 bg-[#E8E4DC] mx-6" />
        <span className="flex-1 text-sm text-gray-700">
          <span className="font-bold">{t("process.afterLabel")}</span> {t("process.afterValue")}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#00C3D0] mb-1">{t("process.riskTitle")}</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {levels.map((item, i) => (
            <div key={i} className="border border-[#E8E4DC] rounded overflow-hidden">
              <div className="h-1.5 w-full" style={{ backgroundColor: levelColors[i] }} />
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
        <h3 className="text-lg font-bold text-[#00C3D0] mb-1">{t("process.frameworkTitle")}</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-4" />
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-2 justify-center">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="border border-[#E8E4DC] rounded px-3 py-2 text-sm text-gray-700 text-center w-full sm:w-auto whitespace-nowrap">
                {step}
              </div>
              {i < steps.length - 1 && (
                <span className="text-gray-400 text-base rotate-90 sm:rotate-0">&#8594;</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">{t("process.frameworkCaption")}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#00C3D0] mb-1">{t("process.knowledgeTitle")}</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-4" />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          {knowledgeItems.map((label, i) => (
            <div key={label} className="flex items-center gap-2 border border-[#E8E4DC] rounded px-6 py-3 text-sm text-gray-700">
              <img src={knowledgeIcons[i]} alt={label} className="w-5 h-5" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImpactTab() {
  const t = useTranslations("caseStudyFintech");

  const metrics = t.raw("impact.metrics") as { label: string; value: string; unit: string; delta: string }[];
  const businessItems1 = t.raw("impact.businessItems1") as string[];
  const businessItems2 = t.raw("impact.businessItems2") as string[];
  const systemShiftItems = t.raw("impact.systemShiftItems") as string[];

  return (
    <div className="flex flex-col gap-3 lg:gap-2">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("impact.title")}</h2>
        <p className="text-xs text-gray-500 mt-0.5">{t("impact.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-[#E8E4DC] rounded-xl p-3 flex flex-col gap-2">
          <h3 className="text-sm font-bold text-[#00C3D0]">{t("impact.systemShiftTitle")}</h3>
          <div>
            <p className="text-xs font-bold text-gray-800">{t("impact.systemShiftDesc")}</p>
            <ul className="text-xs text-gray-600 list-disc list-inside mt-1 space-y-0.5">
              {systemShiftItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-[#F7F4EE] rounded-lg p-2 flex items-center justify-center">
            <img src="/group-11.png" alt="Team reduction diagram" className="w-full object-contain max-h-32" />
          </div>
          <p className="text-xs text-gray-400 text-center">{t("impact.systemShiftCaption")}</p>
        </div>
        <div className="border border-[#E8E4DC] rounded-xl p-3 flex flex-col gap-2">
          <h3 className="text-sm font-bold text-[#00C3D0]">{t("impact.perfTitle")}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{t("impact.perfValue")}</span>
            <span className="text-base font-bold text-gray-800">{t("impact.perfMetric")}</span>
          </div>
          <div className="flex-1 border border-[#E8E4DC] rounded-lg p-3 flex flex-col justify-between">
            <div>
              <p className="text-3xl font-bold text-[#00C3D0]">{t("impact.perfAfter")}</p>
              <p className="text-xs text-gray-500">{t("impact.perfBefore")}</p>
            </div>
            <p className="text-xs text-gray-600 mt-2">{t("impact.perfDesc")}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#00C3D0] mb-1">{t("impact.metricsTitle")}</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-3" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="border border-[#E8E4DC] rounded-lg p-3 lg:p-8">
              <p className="text-xs sm:text-sm font-bold text-gray-800 mb-1 leading-snug">{m.label}</p>
              <p className="text-base sm:text-xl font-bold text-gray-800">
                {m.value} <span className="text-sm font-normal">{m.unit}</span>
              </p>
              <p className="text-xs mt-1 font-semibold text-[#00C3D0]">{m.delta}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#00C3D0] mb-1">{t("impact.businessTitle")}</h3>
        <div className="w-full h-px bg-[#E8E4DC] mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ul className="text-xs text-gray-800 list-disc list-inside space-y-1">
            {businessItems1.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
            {businessItems2.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function LearningTab() {
  const t = useTranslations("caseStudyFintech");
  const items = t.raw("learning.items") as { title: string; desc: string }[];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 py-4">
      <div className="text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("learning.title")}</h2>
        <p className="text-sm text-gray-500 mt-1">{t("learning.subtitle")}</p>
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

export default function CaseStudyFintech() {
  const t = useTranslations("caseStudyFintech");
  const tabs = t.raw("tabs") as string[];

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
      default: return null;
    }
  };

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-8 lg:py-16 bg-[#FFFCF6]">
      <div className="flex-1 flex items-stretch gap-3 lg:gap-6">
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