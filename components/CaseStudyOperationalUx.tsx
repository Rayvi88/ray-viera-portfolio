"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CaseStudyOperationalUx() {
  const t = useTranslations("caseStudyOperationalUx");
  const [activeTab, setActiveTab] = useState(0);

  const tabs = t.raw("tabs") as string[];
  const scopeItems = t.raw("overview.scopeItems") as string[];
  const processSteps = t.raw("process.steps") as string[];
  const learningItems = t.raw("impact.learningItems") as string[];

  const prev = () => setActiveTab((i) => (i === 0 ? tabs.length - 1 : i - 1));
  const next = () => setActiveTab((i) => (i === tabs.length - 1 ? 0 : i + 1));

  const vehicleStates = [
    { label: "Activo", icon: "✓", color: "#4CAF50", bg: "#F0FFF4", objective: "Operación normal", action: "Monitorear disponibilidad" },
    { label: "Batería baja", icon: "🔋", color: "#FF5722", bg: "#FFF3F0", objective: "Prevenir interrupción", action: "Dirigir a zona de recarga" },
    { label: "Fuera de zona", icon: "⚠", color: "#F44336", bg: "#FFF0F0", objective: "Corregir desviación", action: "Mover a zona permitida" },
    { label: "Tiempo por vencer", icon: "⏱", color: "#FF9800", bg: "#FFFBF0", objective: "Evitar bloqueo", action: "Regresar antes del tiempo límite" },
  ];

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-8 lg:py-12 bg-[#FFFCF6]">
      <div className="flex-1 flex items-stretch gap-3 lg:gap-6">
        <button onClick={prev} className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-200" aria-label="Previous">←</button>

        <div className="flex-1 min-w-0 flex flex-col justify-center">

          {/* TAB 0 — Overview */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <p className="text-xs font-bold tracking-widest mb-3 text-[#888] uppercase">{t("overview.tag")}</p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00C3D0] leading-tight mb-4">{t("overview.title")}</h1>
                  <p className="text-sm text-[#555] leading-relaxed max-w-lg">{t("overview.desc")}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#00C3D0] mb-2">Reto</p>
                  <p className="text-sm text-[#555] leading-relaxed max-w-lg">{t("problem.challenge")}</p>
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
                    <ul className="space-y-0.5">
                      {scopeItems.map((item) => (
                        <li key={item} className="text-sm text-[#555] list-disc list-inside">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("overview.yearLabel")}</p>
                    <p className="text-sm text-[#1a1a1a]">{t("overview.yearValue")}</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block relative" style={{ height: "640px" }}>
                <Image src="/mobile-overview-1.png" alt={t("overview.title")} fill className="object-contain object-center" sizes="500px" priority />
              </div>
            </div>
          )}

          {/* TAB 1 — Problem */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("problem.title")}</h2>
                <p className="text-xl italic text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>
                  {t("problem.info")}
                </p>
                <p className="text-sm text-[#555] leading-relaxed">{t("problem.desc")}</p>
                <div>
                  <h3 className="text-lg font-bold text-[#00C3D0] mb-2">{t("problem.title1")}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">{t("problem.challenge")}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative w-full rounded-sm overflow-hidden" style={{ height: "640px" }}>
                  <Image src="/cognitive load-es.png" alt="Cognitive load diagram" fill className="object-contain" sizes="45vw" />
                </div>
                <p className="text-s text-[#888] text-center">{t("problem.detailimg")}</p>
              </div>
            </div>
          )}

          {/* TAB 2 — Process */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("process.title")}</h2>
                <h3 className="text-xl font-light text-[#1a1a1a] leading-snug">{t("process.title1")}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{t("process.desc")}</p>
                <div className="flex flex-col gap-2 mt-1">
                  {processSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#00C3D0] shrink-0">0{i + 1}</span>
                      <span className="text-sm text-[#555]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-2 mb-1 px-2">
                  <span className="text-xs font-bold text-[#1a1a1a]"></span>
                  <span className="text-xs font-bold text-[#1a1a1a]">Objetivo</span>
                  <span className="text-xs font-bold text-[#1a1a1a]">Acción Requerida</span>
                </div>
                {vehicleStates.map((state) => (
                  <div key={state.label} className="grid grid-cols-3 gap-2 items-center px-4 py-4 rounded-lg" style={{ background: state.bg, border: `1px solid ${state.color}30` }}>
                    <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: state.color }}>
                      <span>{state.icon}</span> {state.label}
                    </span>
                    <span className="text-sm text-[#555]">{state.objective}</span>
                    <span className="text-sm text-[#555]">{state.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3 — Solution */}
          {activeTab === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col gap-6 pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("solution.title")}</h2>
                <p className="text-sm text-[#555] leading-relaxed">{t("solution.desc")}</p>
                <div className="px-5 py-4 rounded-sm" style={{ background: "#F7F4EE", border: "1px solid #E8E4DC" }}>
                  <p className="text-sm font-bold text-[#00C3D0] mb-1">{t("solution.title1")}</p>
                  <p className="text-sm text-[#555] italic">{t("solution.keyPrinciple")}</p>
                </div>
                <div className="relative w-full" style={{ height: "160px" }}>
                  <Image src="/General info-clave.png" alt="General key info" fill className="object-contain object-top" sizes="45vw" />
                </div>
              </div>
              {/* Right column: both image same full width, stacked */}
              <div className="flex flex-col gap-4 w-full">
                <div className="relative items-center w-full" style={{ height: "550px" }}>
                  <Image src="/estados1.png" alt="Vehicle states" fill className="object-contain object-top" sizes="45vw" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4 — Interface */}
          {activeTab === 4 && (
            <div className="flex flex-col gap-6 h-full">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0] mb-3">{t("interface.title")}</h2>
                <p className="text-sm text-[#555] leading-relaxed max-w-2xl">{t("interface.desc")}</p>
              </div>
              <div className="relative w-full flex-1 rounded-sm overflow-hidden" style={{ minHeight: "560px" }}>
                <Image src="/interfaz.png" alt="Interface detail" fill className="object-contain object-center" sizes="90vw" />
              </div>
            </div>
          )}

          {/* TAB 5 — Impact & Learning */}
          {activeTab === 5 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00C3D0]">{t("impact.title")}</h2>
                <div>
                  <p className="text-sm font-bold text-[#00C3D0] mb-2">{t("impact.impactTitle")}</p>
                  <p className="text-sm text-[#555] leading-relaxed">{t("impact.impactDesc")}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#00C3D0] mb-3">{t("impact.learningTitle")}</p>
                  <ul className="flex flex-col gap-3">
                    {learningItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#555]">
                        <span className="shrink-0 mt-0.5 text-[#00C3D0]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative w-full rounded-sm overflow-hidden" style={{ height: "660px" }}>
                <Image src="/impact-ux movilidad.png" alt="Impact visual" fill className="object-contain" sizes="45vw" />
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
              <button
                onClick={() => setActiveTab(i)}
                className={`text-sm outline-none focus:outline-none transition-colors duration-300 whitespace-nowrap ${
                  i === activeTab ? "text-[#00C3D0] font-bold" : "text-[#888] hover:text-[#00C3D0]"
                }`}
              >
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