"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { trackCaseStudyTabChange, trackCaseStudyCompleted } from "@/lib/analytics/events";

function OverviewTab() {
  const t = useTranslations("caseStudyGTM");
  const scopeItems = t.raw("overview.scopeItems") as string[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start h-full">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-bold tracking-widest mb-2 text-gray-400">{t("overview.tag")}</p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#00C3D0] leading-tight mb-3">
            {t("overview.title")}
          </h1>
          <p className="text-sm font-semibold text-gray-800 leading-relaxed mb-2">{t("overview.desc1")}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">{t("overview.desc2")}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{t("overview.desc3")}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#E8E4DC] pt-4">
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.roleLabel")}</p>
            <p className="text-sm text-black">{t("overview.roleValue")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.typeLabel")}</p>
            <p className="text-sm text-black">{t("overview.typeValue")}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.scopeLabel")}</p>
            <ul className="text-sm text-black list-disc list-inside space-y-1">
              {scopeItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.yearLabel")}</p>
            <p className="text-sm text-black">{t("overview.yearValue")}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-center">
        <Image
          src="/gotomarket-c.png"
          alt={t("overview.title")}
          width={900}
          height={600}
          className="w-full h-auto object-contain max-h-[55vh]"
        />
      </div>
    </div>
  );
}

function ProductPositioningTab() {
  const t = useTranslations("caseStudyGTM");
  const audiences = t.raw("positioning.audiences") as { title: string; sub: string; badge: string }[];
  const comparison = t.raw("positioning.comparison") as { aspect: string; generic: string; smart: string; boldPart: string; suffix: string }[];
  const audienceIcons = ["/shippers.svg", "/customsagents.svg", "/logistics.svg"];

  return (
    <div className="flex flex-col gap-5 h-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("positioning.title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {audiences.map((a, i) => (
          <div key={i} className="border border-[#E8E4DC] rounded-xl p-4 flex flex-col items-center gap-2 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-[#00C3D0]">
            <div className="flex items-center gap-2">
              <img src={audienceIcons[i]} alt={a.title} className="w-7 h-7" />
              <p className="text-sm font-bold text-gray-800">{a.title}</p>
            </div>
            <p className="text-sm text-gray-500 text-center">{a.sub}</p>
            <div className="mt-1 w-full bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 text-center">
              <p className="text-xs text-green-600 font-medium">{a.badge}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_224px] gap-4 items-stretch">
        <div className="border border-[#E8E4DC] rounded-xl overflow-hidden text-sm flex flex-col">
          <div className="grid grid-cols-[1fr_1fr_1.5fr] bg-[#F7F4EE]">
            <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide" />
            <div className="px-4 py-3 text-xs font-bold text-gray-700">
              {t("positioning.colGeneric")}<br />
              <span className="font-normal text-gray-400">{t("positioning.colGenericSub")}</span>
            </div>
            <div className="px-4 py-3 text-xs font-bold text-gray-700">{t("positioning.colSmart")}</div>
          </div>
          <div className="flex flex-col flex-1 divide-y divide-[#E8E4DC]">
            {comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_1fr_1.5fr] flex-1 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}`}>
                <div className="px-4 py-3 flex items-center text-sm text-gray-600">{row.aspect}</div>
                <div className="px-4 py-3 flex items-center text-sm text-gray-500">{row.generic}</div>
                <div className="px-4 py-3 flex items-center text-sm text-gray-700 gap-1">
                  <span>&#9989;</span>
                  {row.boldPart ? <span><strong>{row.boldPart}</strong>{row.suffix}</span> : <span>{row.smart}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#E8E4DC] rounded-xl p-5 bg-white flex flex-col items-center justify-center gap-3">
          <img src="/idea.svg" alt="idea" className="w-10 h-10" />
          <p className="text-base font-bold text-[#00C3D0] leading-snug text-center">{t("positioning.calloutTitle")}</p>
          <p className="text-xs text-gray-600 leading-relaxed text-center">{t("positioning.calloutDesc")}</p>
        </div>
      </div>
    </div>
  );
}

function MasterGraphicTab() {
  const t = useTranslations("caseStudyGTM");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start h-full">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("masterGraphic.title")}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{t("masterGraphic.desc1")}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{t("masterGraphic.desc2")}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{t("masterGraphic.desc3")}</p>
      </div>
      <div className="w-full flex items-start">
        <Image src="/graphic.png" alt={t("masterGraphic.title")} width={900} height={600} className="w-full h-auto object-contain max-h-[65vh]" />
      </div>
    </div>
  );
}

function MarketStrategyTab() {
  const t = useTranslations("caseStudyGTM");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start h-full">
      <div className="flex flex-col justify-between h-full gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("marketStrategy.title")}</h2>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-[#00C3D0]">{t("marketStrategy.impactLabel")}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{t("marketStrategy.impactDesc")}</p>
        </div>
      </div>
      <div className="w-full flex items-start">
        <img
          src={t("marketStrategy.marketStrategyImg")}
          alt={t("marketStrategy.title")}
          className="w-full h-auto object-contain max-h-[65vh]"
        />
      </div>
    </div>
  );
}

function ProductNarrativeTab() {
  const t = useTranslations("caseStudyGTM");
  const beforeItems = t.raw("narrative.beforeItems") as string[];
  const afterItems = t.raw("narrative.afterItems") as string[];
  const metrics = t.raw("narrative.metrics") as { value: string; label: string }[];

  const beforeIcons = ["/mdi_timer-sand-full.svg", "/bxs_error.svg", "/mingcute_time-fill.svg"];
  const afterIcons = ["/solar_rocket-bold.svg", "/vaadin_line-bar-chart.svg", "/line-md_security-filled.svg"];
  const metricColors = ["text-gray-800", "text-yellow-500", "text-[#00C3D0]"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-stretch h-full">
      <div className="flex flex-col gap-4 h-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("narrative.title")}</h2>
        <div className="border border-[#E8E4DC] rounded-xl overflow-hidden flex-1">
          <div className="h-1.5 w-full bg-red-500" />
          <div className="p-4 flex flex-col gap-4 h-full">
            <div className="flex items-center gap-2">
              <img src="/mingcute_sad-fill.svg" alt="before" className="w-6 h-6" />
              <p className="text-sm font-bold text-red-500">{t("narrative.beforeLabel")}</p>
            </div>
            <div className="flex flex-col gap-4 flex-1 justify-around">
              {beforeItems.map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <img src={beforeIcons[i]} alt="" className="w-6 h-6 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border border-[#E8E4DC] rounded-xl overflow-hidden flex-1">
          <div className="h-1.5 w-full bg-green-500" />
          <div className="p-4 flex flex-col gap-4 h-full">
            <div className="flex items-center gap-2">
              <img src="/boxicons_smile-filled.svg" alt="after" className="w-6 h-6" />
              <p className="text-sm font-bold text-green-500">{t("narrative.afterLabel")}</p>
            </div>
            <div className="flex flex-col gap-4 flex-1 justify-around">
              {afterItems.map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <img src={afterIcons[i]} alt="" className="w-6 h-6 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">{t("narrative.ahaTitle")}</h2>
            <p className="text-sm text-gray-500 italic leading-relaxed">
              &quot;{t("narrative.ahaQuote")}{" "}
              <span className="text-[#00C3D0] not-italic font-medium">&apos;{t("narrative.ahaAlert")}&apos;</span>&quot;
            </p>
          </div>
          <img src="/mingcute_ai-fill.png" alt="sparkle" className="w-14 h-14 shrink-0" />
        </div>
        <div className="border border-green-200 rounded-xl bg-green-50 p-4 flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <p className="text-sm font-bold text-green-600">{t("narrative.validationTitle")}</p>
              </div>
              <p className="text-xs text-gray-400 ml-5">{t("narrative.validationSub")}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {metrics.map((m, i) => (
                <div key={i} className="border border-[#E8E4DC] rounded-lg p-2 text-center bg-white">
                  <p className={`text-xl font-bold ${metricColors[i]}`}>{m.value}</p>
                  <p className="text-xs text-gray-400 leading-tight mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
              <p className="text-xs text-gray-500">
                {t("narrative.savedText")} <strong>{t("narrative.savedValue")}</strong>{t("narrative.savedSuffix")}
              </p>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-bold py-3 rounded-lg">
            {t("narrative.ctaButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

function ImpactTab() {
  const t = useTranslations("caseStudyGTM");
  const metrics = t.raw("impact.metrics") as { value: string; label: string; sub: string }[];
  const metrics2 = t.raw("impact.metrics2") as { value: string; label: string }[];

  const metricIcons = ["/mdi_clock.svg", "/file-icons_precision.svg", "/icon-park-solid_people (1).svg", "/vaadin_line-bar-chart.svg"];
  const metrics2Icons = ["/fluent_document-checkmark-20-filled.svg", "/stash_hand-holding-dollar-solid.svg"];

  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("impact.title")}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="border border-[#E8E4DC] rounded-xl p-4 flex flex-col items-center gap-1 bg-white text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-[#00C3D0]">
            <img src={metricIcons[i]} alt={m.label} className="w-8 h-8 mb-1" />
            <p className="text-4xl lg:text-5xl font-extrabold text-gray-800">{m.value}</p>
            <p className="text-xs font-semibold text-gray-600">{m.label}</p>
            <p className="text-xs text-gray-400">{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics2.map((m, i) => (
          <div key={i} className="border border-[#E8E4DC] rounded-xl px-5 py-4 flex items-center gap-4 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-[#00C3D0]">
            <img src={metrics2Icons[i]} alt={m.label} className="w-8 h-8 shrink-0" />
            <p className="text-3xl font-extrabold text-[#00C3D0] shrink-0">{m.value}</p>
            <p className="text-sm text-gray-600 leading-snug">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="border border-[#E8E4DC] rounded-xl px-8 py-5 bg-white flex flex-col items-center gap-3 max-w-lg w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-[#00C3D0]">
          <p className="text-sm text-gray-500 text-center">{t("impact.roiLabel")}</p>
          <div className="flex items-center gap-3">
            <img src="/fa6-solid_coins.svg" alt="coins" className="w-10 h-10 shrink-0" />
            <div className="bg-[#00C3D0] rounded-xl px-6 py-3">
              <p className="text-xl sm:text-2xl font-extrabold text-white whitespace-nowrap">{t("impact.roiValue")}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">{t("impact.roiNote")}</p>
        </div>
      </div>
      <p className="text-xs text-gray-300 text-center">{t("impact.disclaimer")}</p>
    </div>
  );
}

export default function CaseStudySmartDocumentsGTM() {
  const t = useTranslations("caseStudyGTM");
  const tabs = t.raw("tabs") as string[];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    trackCaseStudyTabChange("smart-documents-gtm", tabs[index]);
    if (index === tabs.length - 1) {
      trackCaseStudyCompleted("smart-documents-gtm");
    }
  };

  const prev = () => handleTabChange(activeTab === 0 ? tabs.length - 1 : activeTab - 1);
  const next = () => handleTabChange(activeTab === tabs.length - 1 ? 0 : activeTab + 1);
  const renderTab = () => {
    switch (activeTab) {
      case 0: return <OverviewTab />;
      case 1: return <ProductPositioningTab />;
      case 2: return <MasterGraphicTab />;
      case 3: return <MarketStrategyTab />;
      case 4: return <ProductNarrativeTab />;
      case 5: return <ImpactTab />;
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
              <button onClick={() => handleTabChange(i)} className={`text-sm outline-none focus:outline-none transition-colors duration-300 whitespace-nowrap ${i === activeTab ? "text-[#00C3D0] font-bold" : "text-gray-500 hover:text-[#00C3D0]"}`}>
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