"use client";

// components/how-i-think/systemic-design/EcosystemEditorial.tsx
//
// Experiencia editorial SOLO mobile para "Ecosistemas". Pieza de lectura:
// jerarquía tipográfica, agrupaciones y líneas simples. NO usa canvas 3D,
// NO usa EcosystemCube, NO importa ecosystemData. Todo el copy sale de
// `howIThinkPage.ecosystem` (labels + hints + resultCaption ya existentes)
// más el bloque `editorial` (título, idea central y CTA, con paridad ES/EN).

import { useTranslations } from "next-intl";

// Orden pedido para la lectura mobile: Ver abre, Explorar sigue.
const SEQUENCE_KEYS = ["ver", "explorar", "detectar", "entender", "organizar"] as const;

// Las 8 áreas en el orden pedido para mobile. Las etiquetas se leen del
// copy existente (`elements.<id>.label`); aquí solo van las claves.
const AREA_KEYS = [
  "usuarios",
  "marca",
  "datos",
  "tecnologia",
  "equipo",
  "procesos",
  "operaciones",
  "producto",
] as const;

export default function EcosystemEditorial() {
  const t = useTranslations("howIThinkPage.ecosystem");
  const tElements = useTranslations("howIThinkPage.ecosystem.elements");
  const tSteps = useTranslations("howIThinkPage.ecosystem.steps");

  return (
    <div className="flex flex-col px-6 pb-8 pt-14">
      {/* ── Eyebrow + título ── */}
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
        {t("modalTitle")}
      </p>
      <h2 className="text-2xl font-bold uppercase tracking-tight text-[#1b1c1c]">
        {t("editorial.title")}
      </h2>
      <p className="mt-3 text-xl font-bold leading-snug text-[#00c3d0]">
        {t("editorial.claim")}
      </p>
      <div className="mb-8 mt-6 h-px w-full bg-[#e4e0dc]" />

      {/* ── Las 8 áreas alrededor del Negocio ── */}
      <div className="flex flex-col items-center">
        <div className="grid w-full grid-cols-2 gap-2">
          {AREA_KEYS.slice(0, 4).map((id) => (
            <span
              key={id}
              className="rounded-full border border-[#e4e0dc] bg-[#f4f4f4] px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.3px] text-[#1b1c1c]"
            >
              {tElements(`${id}.label`)}
            </span>
          ))}
        </div>

        {/* Conector simple hacia el centro — solo líneas planas, nada 3D */}
        <div aria-hidden="true" className="flex flex-col items-center">
          <span className="h-5 w-px bg-[#00c3d0]/50" />
          <span className="rounded-full bg-[#1b1c1c] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.5px] text-white">
            {t("heroLabel")}
          </span>
          <span className="h-5 w-px bg-[#00c3d0]/50" />
        </div>

        <div className="grid w-full grid-cols-2 gap-2">
          {AREA_KEYS.slice(4).map((id) => (
            <span
              key={id}
              className="rounded-full border border-[#e4e0dc] bg-[#f4f4f4] px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.3px] text-[#1b1c1c]"
            >
              {tElements(`${id}.label`)}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-8 mt-8 h-px w-full bg-[#e4e0dc]" />

      {/* ── Secuencia Ver → Explorar → Detectar → Entender → Organizar ── */}
      <ol className="flex flex-col">
        {SEQUENCE_KEYS.map((key, i) => (
          <li key={key} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Línea vertical + número — plana, sin efectos */}
            {i < SEQUENCE_KEYS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[15px] top-9 h-[calc(100%-2rem)] w-px bg-[#e4e0dc]"
              />
            )}
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#00c3d0]/40 bg-white text-[12px] font-bold text-[#00c3d0]"
            >
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-col gap-1 pb-1">
              <p className="text-[12px] font-bold uppercase tracking-[0.3px] text-[#1b1c1c]">
                {tSteps(`${key}.label`)}
              </p>
              <p className="text-[13px] leading-snug text-[#4c4546]">
                {tSteps(`${key}.hint`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mb-8 mt-8 h-px w-full bg-[#e4e0dc]" />

      {/* ── Cierre: convergencia hacia el negocio (copy existente) ── */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
        {tSteps("resultado.label")}
      </p>
      <p className="mt-2 text-[14px] leading-relaxed text-[#4c4546]">
        {t("resultCaption")}
      </p>

      {/* ── CTA discreta: la interactiva vive en desktop ── */}
      <div className="mt-8 rounded-2xl border border-[#e4e0dc] bg-[#f4f4f4] px-5 py-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#1b1c1c]">
          {t("editorial.cta")}
        </p>
        <p className="mt-1.5 text-[12px] leading-snug text-[#8e8e93]">
          {t("editorial.ctaNote")}
        </p>
      </div>
    </div>
  );
}
