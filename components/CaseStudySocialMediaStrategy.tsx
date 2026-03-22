"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function OverviewTab() {
  const t = useTranslations("caseStudySocialMedia");
  const scopeItems = t.raw("overview.scopeItems") as string[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start h-full">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold tracking-widest mb-4 text-gray-400">{t("overview.tag")}</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight mb-4">
            {t("overview.title")}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{t("overview.desc1")}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{t("overview.desc2")}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-[#E8E4DC] pt-6">
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.roleLabel")}</p>
            <p className="text-sm text-black">{t("overview.roleValue")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.typeLabel")}</p>
            <p className="text-sm text-black">{t("overview.typeValue")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.yearLabel")}</p>
            <p className="text-sm text-black">{t("overview.yearValue")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.scopeLabel")}</p>
            <ul className="text-sm text-black space-y-0.5">
              {scopeItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center lg:justify-end">
        <Image
          src="/Deviceoverview.png"
          alt={t("overview.title")}
          width={300}
          height={605}
          className="object-contain w-48 sm:w-56 lg:w-[300px]"
        />
      </div>
    </div>
  );
}

function ContentAnalysisTab() {
  const t = useTranslations("caseStudySocialMedia");
  const worksItems = t.raw("contentAnalysis.worksItems") as string[];
  const doesntItems = t.raw("contentAnalysis.doesntItems") as string[];

  return (
    <div className="flex flex-col justify-center h-full gap-6">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("contentAnalysis.title")}</h2>
        <p className="text-sm text-gray-600 mt-2">{t("contentAnalysis.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border border-[#E8E4DC] rounded-xl overflow-hidden flex flex-col">
          <div className="h-1.5 w-full bg-green-500" />
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-base font-bold text-gray-800">{t("contentAnalysis.worksTitle")}</p>
            </div>
            <div className="w-full h-px bg-[#E8E4DC]" />
            <ul className="text-sm text-gray-700 space-y-3">
              {worksItems.map((item, i) => <li key={i}>&#8226; {item}</li>)}
            </ul>
          </div>
        </div>
        <div className="border border-[#E8E4DC] rounded-xl overflow-hidden flex flex-col">
          <div className="h-1.5 w-full bg-red-500" />
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p className="text-base font-bold text-gray-800">{t("contentAnalysis.doesntTitle")}</p>
            </div>
            <div className="w-full h-px bg-[#E8E4DC]" />
            <ul className="text-sm text-gray-700 space-y-3">
              {doesntItems.map((item, i) => <li key={i}>&#8226; {item}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#00C3D0] mb-2">{t("contentAnalysis.insightTitle")}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{t("contentAnalysis.insightDesc")}</p>
      </div>
    </div>
  );
}

function OpportunitiesTab() {
  const t = useTranslations("caseStudySocialMedia");
  const items = t.raw("opportunities.items") as { title: string; desc: string }[];
  const opportunityIcons = ["/Ellipse 1.svg", "/Ellipse 2.svg", "/Ellipse 3.svg", "/Ellipse 4.svg"];

  return (
    <div className="flex flex-col justify-center h-full gap-8">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("opportunities.title")}</h2>
        <p className="text-sm text-gray-600 mt-2">{t("opportunities.subtitle")}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-4 transition-transform duration-300 hover:scale-105 cursor-default">
            <img src={opportunityIcons[i]} alt={item.title} className="w-20 h-20 sm:w-28 sm:h-28 object-contain" />
            <p className="text-sm font-bold text-[#00C3D0] leading-snug">{item.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualSystemTab() {
  const t = useTranslations("caseStudySocialMedia");
  const frames = t.raw("visualSystem.frames") as string[];
  const contentItems = t.raw("visualSystem.contentItems") as string[];
  const toneItems = t.raw("visualSystem.toneItems") as string[];
  const fonts = t.raw("visualSystem.fonts") as string[];

  const frameImgs = ["/hook.png", "/solution.png", "/close.png"];
  const contentIcons = ["/Rectangle 5945.svg", "/Rectangle 5946.svg", "/Rectangle 5948.svg", "/Rectangle 5950.svg"];
  const toneIcons = ["/Rectangle 5951.svg", "/Rectangle 5952.svg", "/Rectangle 5952.svg"];
  const colors = [
    { hex: "#c1ff72", label: "#c1ff72" },
    { hex: "#cb6ce6", label: "#cb6ce6" },
    { hex: "#ff751f", label: "#ff751f" },
    { hex: "#0cc0df", label: "#0cc0df" },
  ];

  return (
    <div className="flex flex-col gap-3 h-full">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("visualSystem.title")}</h2>
        <p className="text-sm text-gray-600 mt-1">{t("visualSystem.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-6 flex-1 min-h-0">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-[#00C3D0]">{t("visualSystem.reelStructureLabel")}</p>
          <div className="grid grid-cols-3 gap-3 flex-1">
            {frames.map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <p className="text-sm text-gray-600">{label}</p>
                <img src={frameImgs[i]} alt={label} className="w-full object-contain max-h-[220px] sm:max-h-[300px]" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-[#E8E4DC] rounded-xl p-4 flex flex-col gap-3">
              <p className="text-sm font-bold text-[#00C3D0]">{t("visualSystem.colorsLabel")}</p>
              <div className="flex gap-3 flex-wrap">
                {colors.map((c) => (
                  <div key={c.hex} className="flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-full border border-[#E8E4DC]" style={{ backgroundColor: c.hex }} />
                    <p className="text-[9px] text-gray-500">{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#E8E4DC] rounded-xl p-4 flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-800">{t("visualSystem.typographyLabel")}</p>
              <div className="grid grid-cols-2 gap-y-2">
                {fonts.map((f, i) => <p key={i} className="text-sm text-gray-700">{f}</p>)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-[#00C3D0]">{t("visualSystem.contentsLabel")}</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {contentItems.map((label, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <img src={contentIcons[i]} alt={label} className="w-12 h-12 object-contain" />
                  <p className="text-xs text-gray-600 text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-[#00C3D0]">{t("visualSystem.toneLabel")}</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {toneItems.map((label, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <img src={toneIcons[i]} alt={label} className="w-12 h-12 object-contain" />
                  <p className="text-xs text-gray-600 text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecutionTab() {
  const t = useTranslations("caseStudySocialMedia");
  const reels = t.raw("execution.reels") as { title: string; desc: string; link: string; linkLabel: string }[];
  const reelVideos = ["/11032026-Post.mp4", "/13022026-Post.mp4", "/198032026-Post.mp4"];

  return (
    <div className="flex flex-col justify-between h-full gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("execution.title")}</h2>
        <p className="text-sm text-gray-600 mt-1">{t("execution.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 flex-1 min-h-0">
        {reels.map((reel, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-full max-w-[270px] mx-auto">
              <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ paddingBottom: "177.77%" }}>
                <video
                  src={reelVideos[i]}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
            <p className="text-sm font-bold text-gray-800 text-center">{reel.title}</p>
            <p className="text-xs text-gray-500 text-center leading-relaxed">{reel.desc}</p>
            <a
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#00C3D0] border border-[#00C3D0] rounded-full px-4 py-1.5 hover:bg-[#00C3D0] hover:text-white transition-colors duration-300"
            >
              {reel.linkLabel}
            </a>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 text-center">{t("execution.disclaimer")}</p>
    </div>
  );
}

function ResultsLearnTab() {
  const t = useTranslations("caseStudySocialMedia");
  const stats = t.raw("results.stats") as { value: string; delta: string; label: string }[];
  const learningItems = t.raw("results.learningItems") as string[];
  const statIcons = ["/mdi_eye.svg", "/tabler_message-filled.svg", "/mdi_interaction-double-tap.svg"];

  return (
    <div className="flex flex-col justify-between h-full gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("results.title")}</h2>
        <p className="text-sm text-gray-600 mt-2 max-w-2xl">{t("results.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 flex-1 min-h-0">
        <div className="flex flex-col gap-4">
          <img src="/image 1.png" alt="Interactions chart" className="w-full object-contain max-h-48" />
          <img src="/visualizations.png" alt="Views chart" className="w-full object-contain max-h-48" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <div key={i} className="border border-[#E8E4DC] rounded-xl p-3 flex flex-col items-center gap-1">
                <img src={statIcons[i]} alt={s.label} className="w-6 h-6 object-contain" />
                <p className="text-lg font-bold text-gray-800">{s.value}</p>
                <p className="text-xs font-bold text-[#00C3D0]">{s.delta}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="border border-[#E8E4DC] rounded-xl overflow-hidden flex flex-col flex-1">
            <div className="h-1.5 w-full bg-[#00C3D0]" />
            <div className="p-5 flex flex-col gap-4">
              <h3 className="text-base font-bold text-[#00C3D0]">{t("results.learningTitle")}</h3>
              <ul className="flex flex-col gap-3">
                {learningItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center">{t("results.disclaimer")}</p>
    </div>
  );
}

export default function CaseStudySocialMediaStrategy() {
  const t = useTranslations("caseStudySocialMedia");
  const tabs = t.raw("tabs") as string[];

  const [activeTab, setActiveTab] = useState(0);

  const prev = () => setActiveTab((tab) => (tab === 0 ? tabs.length - 1 : tab - 1));
  const next = () => setActiveTab((tab) => (tab === tabs.length - 1 ? 0 : tab + 1));

  const renderTab = () => {
    switch (activeTab) {
      case 0: return <OverviewTab />;
      case 1: return <ContentAnalysisTab />;
      case 2: return <OpportunitiesTab />;
      case 3: return <VisualSystemTab />;
      case 4: return <ExecutionTab />;
      case 5: return <ResultsLearnTab />;
      default: return null;
    }
  };

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-8 lg:py-16 bg-[#FFFCF6]">
      <div className="flex-1 flex items-stretch gap-3 lg:gap-6">
        <button onClick={prev} className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300">
          &#8592;
        </button>
        <div className="flex-1 transition-all duration-500 ease-in-out">
          {renderTab()}
        </div>
        <button onClick={next} className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300">
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
            <button onClick={prev} className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-gray-500">&#8592;</button>
            <button onClick={next} className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-gray-500">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
}