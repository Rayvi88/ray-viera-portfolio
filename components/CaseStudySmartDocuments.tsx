"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function OverviewTab() {
  const t = useTranslations("caseStudySmartDocuments");
  const scopeItems = t.raw("overview.scopeItems") as string[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold tracking-widest mb-4 text-gray-400">{t("overview.tag")}</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight mb-4">
            {t("overview.title")}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">{t("overview.desc1")}</p>
          <p className="text-sm text-gray-500 leading-relaxed">{t("overview.desc2")}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 border-t border-[#E8E4DC] pt-6">
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
      <div className="flex items-center justify-center">
        <Image
          src="/overview-smart.png"
          alt={t("overview.title")}
          width={500}
          height={400}
          className="object-contain w-full max-w-sm lg:max-w-full max-h-[280px] lg:max-h-[400px]"
        />
      </div>
    </div>
  );
}

function ProblemTab() {
  const t = useTranslations("caseStudySmartDocuments");
  const docs = t.raw("problem.docs") as { title: string; desc: string }[];
  const docColors = ["#7C3AED", "#F59E0B", "#EF4444", "#3B82F6"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("problem.contextTitle")}</h2>
        <div className="flex flex-col gap-4 text-sm text-gray-700 leading-relaxed">
          <p>{t("problem.context1")}</p>
          <p>{t("problem.context2")}</p>
          <p>{t("problem.context3")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-[#00C3D0]">{t("problem.frictionLabel")}</p>
          <div className="border border-[#E8E4DC] rounded-xl p-6 flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-[#00C3D0] flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-bold text-[#00C3D0]">{t("problem.frictionTitle")}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{t("problem.frictionDesc")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("problem.problemTitle")}</h2>
          <p className="text-sm font-bold text-[#00C3D0] mt-1">{t("problem.riskLabel")}</p>
          <p className="text-sm text-gray-600 mt-1">{t("problem.riskDesc")}</p>
        </div>
        <div className="flex flex-col gap-3">
          {docs.map((item, i) => (
            <div key={i} className="border border-[#E8E4DC] rounded-xl p-5 flex items-start gap-4">
              <div className="w-1.5 self-stretch rounded-full shrink-0" style={{ backgroundColor: docColors[i] }} />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductTab() {
  const t = useTranslations("caseStudySmartDocuments");
  const features = t.raw("product.features") as { title: string; desc: string }[];
  const slides = t.raw("product.slides") as string[];
  const featureIcons = ["/automated.svg", "/data.svg", "/cross.svg"];

  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 h-full">
      {/* Columna izquierda */}
      <div className="flex flex-col justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("product.title")}</h2>
        <div className="flex flex-col gap-3 text-sm text-gray-700 leading-relaxed">
          <p>{t("product.desc1")}</p>
          <p>{t("product.desc2")}</p>
          <p>{t("product.desc3")}</p>
        </div>
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {features.map((item, i) => (
            <div key={i} className="flex items-start gap-4 border-b border-[#E8E4DC] pb-4 last:border-0 last:pb-0">
              <img src={featureIcons[i]} alt={item.title} className="w-8 h-8 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Columna derecha — carrusel sin borde, más grande */}
      <div className="flex flex-col gap-3">
        <div
          className="relative h-[480px] sm:h-[560px] lg:h-[640px] rounded-xl overflow-hidden cursor-pointer"
          onClick={next}
        >
          <img
            src={slides[current]}
            alt={`Smart Documents slide ${current + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-center gap-2 shrink-0 pb-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#00C3D0] w-6" : "bg-[#E8E4DC] w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesignApproachTab() {
  const t = useTranslations("caseStudySmartDocuments");
  const card1items = t.raw("designApproach.card1items") as string[];
  const card2items = t.raw("designApproach.card2items") as string[];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("designApproach.title")}</h2>
        <p className="text-sm text-gray-500 mt-1">{t("designApproach.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
        <div className="flex flex-col gap-4">
          <div className="border border-[#E8E4DC] rounded-xl p-6 flex flex-col gap-3">
            <h3 className="text-base font-bold text-gray-800 text-center">{t("designApproach.card1title")}</h3>
            <div className="w-full h-px bg-[#E8E4DC]" />
            <p className="text-sm text-gray-600 leading-relaxed">{t("designApproach.card1desc")}</p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {card1items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-[#00C3D0]">{t("designApproach.card1goal")}</span>{" "}
              {t("designApproach.card1goalDesc")}
            </p>
          </div>
          <div className="border border-[#E8E4DC] rounded-xl p-6 flex flex-col gap-3">
            <h3 className="text-base font-bold text-gray-800 text-center">{t("designApproach.card2title")}</h3>
            <div className="w-full h-px bg-[#E8E4DC]" />
            <p className="text-sm text-gray-600 leading-relaxed">{t("designApproach.card2desc")}</p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {card2items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <img
            src="/designapproach.png"
            alt={t("designApproach.title")}
            className="w-full object-contain rounded-xl max-h-[220px] sm:max-h-[300px] lg:max-h-[360px]"
          />
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-1">{t("designApproach.workflowTitle")}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t("designApproach.workflowDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterfaceSolutionTab() {
  const t = useTranslations("caseStudySmartDocuments");
  const slides = t.raw("interfaceSolution.slides") as { title: string; desc: string }[];
  const slideImgs = ["/interface1.png", "/interface2.png", "/interface3.png"];

  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("interfaceSolution.title")}</h2>
        <p className="text-sm text-gray-500 mt-1">{t("interfaceSolution.subtitle")}</p>
      </div>
      <div
        className="flex-1 rounded-xl overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-0"
        onClick={next}
      >
        <div className="flex flex-col justify-end gap-4 p-4 lg:p-8">
          <h3 className="text-base sm:text-lg font-bold text-gray-800">{slides[current].title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{slides[current].desc}</p>
        </div>
        <div className="relative min-h-[260px] sm:min-h-[320px] max-h-[320px] sm:max-h-[420px]">
          <img
            src={slideImgs[current]}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 shrink-0">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#00C3D0] w-6" : "bg-[#E8E4DC] w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function LearningTab() {
  const t = useTranslations("caseStudySmartDocuments");
  const impactItems = t.raw("learning.impactItems") as string[];
  const learningsItems = t.raw("learning.learningsItems") as string[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-start">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0]">{t("learning.title")}</h2>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#00C3D0]">{t("learning.impactTitle")}</h3>
          <div className="w-full h-px bg-[#E8E4DC]" />
          <div className="flex flex-col gap-3 text-sm text-gray-700 leading-relaxed">
            <p>{t("learning.impactDesc1")}</p>
            <p>{t("learning.impactDesc2")}</p>
          </div>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {impactItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#00C3D0]">{t("learning.learningsTitle")}</h3>
          <div className="w-full h-px bg-[#E8E4DC]" />
          <div className="flex flex-col gap-3 text-sm text-gray-700 leading-relaxed">
            <p>{t("learning.learningsDesc1")}</p>
            <p>{t("learning.learningsDesc2")}</p>
          </div>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {learningsItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        <img
          src="/impact.png"
          alt={t("learning.title")}
          className="w-full object-contain max-h-[240px] sm:max-h-[420px]"
        />
      </div>
    </div>
  );
}

export default function CaseStudySmartDocuments() {
  const t = useTranslations("caseStudySmartDocuments");
  const tabs = t.raw("tabs") as string[];

  const [activeTab, setActiveTab] = useState(0);

  const prev = () => setActiveTab((tab) => (tab === 0 ? tabs.length - 1 : tab - 1));
  const next = () => setActiveTab((tab) => (tab === tabs.length - 1 ? 0 : tab + 1));

  const renderTab = () => {
    switch (activeTab) {
      case 0: return <OverviewTab />;
      case 1: return <ProblemTab />;
      case 2: return <ProductTab />;
      case 3: return <DesignApproachTab />;
      case 4: return <InterfaceSolutionTab />;
      case 5: return <LearningTab />;
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
            <button onClick={prev} className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-gray-500">&#8592;</button>
            <button onClick={next} className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-gray-500">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
}