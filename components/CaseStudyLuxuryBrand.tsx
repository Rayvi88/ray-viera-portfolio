"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { trackCaseStudyTabChange, trackCaseStudyCompleted } from "@/lib/analytics/events";

export default function CaseStudyLuxuryBrand() {
  const t = useTranslations("caseStudyLuxuryBrand");
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    trackCaseStudyTabChange("luxury-brand", tabs[index]);
    if (index === tabs.length - 1) {
      trackCaseStudyCompleted("luxury-brand");
    }
  };

  const prev = () => handleTabChange(activeTab === 0 ? tabs.length - 1 : activeTab - 1);
  const next = () => handleTabChange(activeTab === tabs.length - 1 ? 0 : activeTab + 1);
  const tabs = t.raw("tabs") as string[];
  const colors = t.raw("colorTypography.colors") as { name: string; hex: string }[];
  const fonts = t.raw("colorTypography.fonts") as { name: string; use: string }[];
  const scopeItems = t.raw("overview.scopeItems") as string[];
  const pillars = t.raw("brandConcept.pillars") as string[];
  const learningItems = t.raw("results.learningItems") as string[];

  const pillarDescriptions = [
    "Atmósfera envolvente que comunica sofisticación e intimidad.",
    "Composición elegante y tipografía con carácter editorial.",
    "Sugerencia y detalle, en lugar de exposición, menos es más.",
  ];

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-8 lg:py-12 bg-[#FFFCF6]">

      <div className="flex-1 flex items-stretch gap-3 lg:gap-6">
        <button onClick={prev} className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-200" aria-label="Previous">←</button>

        <div className="flex-1 min-w-0 flex flex-col justify-center">

          {/* TAB 0 — Overview */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <p className="text-xs font-bold tracking-widest mb-3 text-[#888] uppercase">{t("overview.tag")}</p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight mb-4">{t("overview.title")}</h1>
                  <p className="text-sm text-[#555] leading-relaxed max-w-lg">{t("overview.desc")}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#00C3D0] mb-2">Reto</p>
                  <p className="text-sm text-[#555] leading-relaxed max-w-lg">{t("brandConcept.desc")}</p>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-[#E8E4DC] pt-5">
                  <div>
                    <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.roleLabel")}</p>
                    <p className="text-sm text-[#1a1a1a]">{t("overview.roleValue")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.typeLabel")}</p>
                    <p className="text-sm text-[#1a1a1a]">{t("overview.typeValue")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.scopeLabel")}</p>
                    <ul className="space-y-0.5">{scopeItems.map((item) => <li key={item} className="text-sm text-[#555] list-disc list-inside">{item}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.yearLabel")}</p>
                    <p className="text-sm text-[#1a1a1a]">{t("overview.yearValue")}</p>
                  </div>
                </div>
              </div>
              {/* Tall vertical image filling the right column */}
              <div className="hidden md:block relative" style={{ height: "590px" }}>
                <Image src="/overview-luxury brand 1.png" alt={t("overview.title")} fill className="object-cover object-top" sizes="560px" priority />
              </div>
            </div>
          )}

          {/* TAB 1 — Brand Concept */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("brandConcept.title")}</h2>
                <p className="text-3xl lg:text-4xl font-light italic text-[#1a1a1a] leading-snug" style={{ fontFamily: "Georgia, serif" }}>
                  {t("brandConcept.conceptTitle")}
                </p>
                <p className="text-sm text-[#555] leading-relaxed">{t("brandConcept.conceptDesc")}</p>
              </div>
              <div className="flex flex-col gap-8 justify-center">
                {["Ellipse-marca-3.png", "Ellipse-marca-2.png", "Ellipse-marca-1.png"].map((img, i) => (
                  <div key={img} className="flex items-center gap-6">
                    <div className="relative shrink-0 rounded-full overflow-hidden" style={{ width: "200px", height: "200px" }}>
                      <Image src={`/${img}`} alt={pillars[i]} fill className="object-cover" sizes="200px" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#00C3D0] mb-1">{pillars[i]}</p>
                      <p className="text-sm text-[#555] leading-relaxed">{pillarDescriptions[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2 — Color & Typography */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 h-full">
              {/* Left — palette, fills height */}
              <div className="flex flex-col justify-between h-full py-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0] mb-6">{t("colorTypography.title")}</h2>
                  <p className="text-sm font-bold text-[#1a1a1a] mb-5">{t("colorTypography.paletteTitle")}</p>
                  {/* Large color chips filling width */}
                  <div className="flex gap-2 mb-5">
                    {colors.map((color) => (
                      <div key={color.name} className="flex flex-col gap-2 flex-1">
                        <div
                          className="w-full rounded-sm"
                          style={{
                            height: "120px",
                            background: color.hex,
                            border: color.hex === "#F5F0E8" ? "1px solid #E8E4DC" : "none",
                          }}
                        />
                        <p className="text-xs font-medium text-[#1a1a1a]">{color.name}</p>
                        <p className="text-[10px] font-mono text-[#888]">{color.hex}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-base text-[#1a1a1a] mb-1">{t("colorTypography.paletteDesc")}</p>
                  <p className="text-base font-bold text-[#00C3D0] tracking-wider">{t("colorTypography.paletteDesc1")}</p>
                </div>
              </div>
              {/* Right — typography, fills height */}
              <div className="flex flex-col justify-between h-full py-2">
                <p className="text-sm font-bold text-[#1a1a1a] mb-6">{t("colorTypography.typographyTitle")}</p>
                <div className="flex flex-col justify-around flex-1 gap-6">
                  <div className="border-b border-[#E8E4DC] pb-6">
                    <p className="text-5xl font-bold text-[#1a1a1a] mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Playfair Display
                    </p>
                    <p className="text-sm text-[#888]">{t("colorTypography.typographySubtitle")}</p>
                  </div>
                  <div className="border-b border-[#E8E4DC] pb-6">
                    <p className="text-4xl text-[#1a1a1a] mb-2 leading-tight" style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 300 }}>
                      Cormorant Light Italic
                    </p>
                    <p className="text-sm text-[#888]">{t("colorTypography.typographySubtitle1")}</p>
                  </div>
                  <div>
                    <p className="text-4xl text-[#1a1a1a] mb-2 leading-tight" style={{ fontWeight: 300 }}>
                      Inter Light
                    </p>
                    <p className="text-sm text-[#888]">{t("colorTypography.typographySubtitle2")}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

                {/* TAB 3 — Visual System */}
          {activeTab === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-8 lg:gap-12 items-center h-full">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("visualSystem.title")}</h2>
                <p className="text-sm text-[#555]">{t("visualSystem.intro")}</p>
                <ul className="space-y-2">
                  {(t.raw("visualSystem.items") as string[]).map((item) => (
                    <li key={item} className="text-sm text-[#555] list-disc list-inside">{item}</li>
                  ))}
                </ul>
                <p className="text-sm font-bold text-[#00C3D0] leading-relaxed mt-2">{t("visualSystem.desc")}</p>
              </div>
              {/* Large dominant image */}
              <div className="relative w-full rounded-sm overflow-hidden" style={{ height: "680px" }}>
                <Image src="/visual-system.png" alt="Visual system" fill className="object-cover object-top" sizes="640px" />
              </div>
            </div>
          )}
 
          {/* TAB 4 — Photography & Tone */}
          {activeTab === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("photographyTone.title")}</h2>
                <div className="flex flex-col gap-3">
                  {(t.raw("photographyTone.rules") as { label: string; value: string }[]).map((rule) => (
                    <p key={rule.label} className="text-sm text-[#555]">{rule.value}</p>
                  ))}
                </div>
                <p className="text-sm text-[#555] leading-relaxed">{t("photographyTone.desc")}</p>
              </div>
              {/* Mixed aspect ratio grid — top row wider/shorter, bottom row taller */}
              <div className="grid grid-cols-2 gap-2 h-full" style={{ minHeight: "440px" }}>
                <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image src="/tono 5955.png" alt="Photography tone 1" fill className="object-cover" sizes="22vw" />
                </div>
                <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image src="/tono.png" alt="Photography tone 2" fill className="object-cover" sizes="22vw" />
                </div>
                <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image src="/tono 5957.png" alt="Photography tone 3" fill className="object-cover object-top" sizes="22vw" />
                </div>
                <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image src="/tono 5956.png" alt="Photography tone 4" fill className="object-cover object-top" sizes="22vw" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5 — Results & Learn */}
          {activeTab === 5 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("results.title")}</h2>
                <p className="text-sm text-[#555] leading-relaxed">{t("results.desc")}</p>
                <ul className="flex flex-col gap-3 mt-2">
                  {learningItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#555]">
                      <span className="shrink-0 mt-0.5 text-[#00C3D0]">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Single large image filling the right column */}
              <div className="relative w-full rounded-sm overflow-hidden" style={{ height: "660px" }}>
                <Image
                  src="/aprendizaje-1.png"
                  alt="Brand manual"
                  fill
                  className="object-cover object-center"
                  sizes="45vw"
                />
              </div>
            </div>
          )}

        </div>

        <button onClick={next} className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-200" aria-label="Next">→</button>
      </div>

      {/* Tab nav */}
      <div className="mt-8 lg:mt-10 border-t border-[#E8E4DC] pt-4">
        <div className="flex items-center gap-4 lg:gap-6 overflow-x-auto pb-1">
          {tabs.map((tab, i) => (
            <div key={i} className="flex items-center gap-4 lg:gap-6 shrink-0">
              <button onClick={() => handleTabChange(i)} className={`text-sm outline-none focus:outline-none transition-colors duration-300 whitespace-nowrap ${i === activeTab ? "text-[#00C3D0] font-bold" : "text-[#888] hover:text-[#00C3D0]"}`}>
                {tab}
              </button>
              {i < tabs.length - 1 && <span className="text-[#ccc] text-xs">|</span>}
            </div>
          ))}
          <div className="flex sm:hidden items-center gap-2 ml-auto shrink-0">
            <button onClick={prev} className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-[#888]">←</button>
            <button onClick={next} className="w-8 h-8 flex items-center justify-center border border-[#E8E4DC] rounded-full text-[#888]">→</button>
          </div>
        </div>
      </div>

    </section>
  );
}