"use client";

// components/how-i-think/systemic-design/SystemicDesignExperience.tsx
//
// Única fuente de la experiencia de Ecosistemas, sin shell modal.
// Extraído tal cual de SystemicDesignModal.tsx: mismos 6 pasos, misma
// navegación anterior/siguiente, mismo canvas desktop, misma pieza
// editorial móvil, mismas traducciones y mismo CTA. Sin `isOpen`,
// sin overlay `fixed`, sin cierre, sin AnimatePresence/motion.
// Altura en flujo natural de página: sin panel exterior ni altura de
// viewport impuesta como bloque fijo. El canvas absorbe el espacio
// restante mediante clamp (ver abajo): crece en pantallas altas hasta el
// tamaño de composición aprobado y cede en pantallas bajas, sin comprimir
// textos, sin ocultar contenido y sin overflow para disimular.
// En móvil la altura es natural y la página hace scroll (sin scroll
// anidado: la editorial se renderiza directa, sin contenedor intermedio
// con overflow).

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import TextNav from "@/components/interaction/TextNav";
import { FOCUS_RING, TRANSITION_MICRO } from "@/components/interaction/tokens";
import EcosystemCanvas from "./EcosystemCanvas";
import EcosystemEditorial from "./EcosystemEditorial";
import { ECOSYSTEM_STEPS, type EcosystemStep } from "./ecosystemData";

// Mismos pasos habilitados que en el modal. No duplicar: este es el único
// lugar junto al wrapper que los referencia (el wrapper ya no los define).
const ENABLED_STEPS: EcosystemStep[] = [
  "explorar",
  "ver",
  "detectar",
  "entender",
  "organizar",
  "resultado",
];

const STEP_ICONS: Record<EcosystemStep, string> = {
  explorar: "/explore-1.svg",
  ver: "/explore-2.svg",
  detectar: "/explore-3.svg",
  entender: "/explore-4.svg",
  organizar: "/explore-5.svg",
  resultado: "/explore-6.svg",
};

const STEP_ICONS_ACTIVE: Record<EcosystemStep, string> = {
  explorar: "/explore-over-1.svg",
  ver: "/explore-over-2.svg",
  detectar: "/explore-over-3.svg",
  entender: "/explore-over-4.svg",
  organizar: "/explore-over-5.svg",
  resultado: "/explore-over-6.svg",
};

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Mobile → pieza editorial de lectura; desktop → canvas interactivo.
// Solo Tailwind `md:` + matchMedia: el canvas nunca se monta en mobile
// (ahorro del racimo 3D) y la editorial nunca se ve en desktop.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function SystemicDesignExperience() {
  const t = useTranslations("howIThinkPage.ecosystem");
  const [step, setStep] = useState<EcosystemStep>("explorar");
  const isDesktop = useIsDesktop();

  // Botón "Siguiente" al fondo del canvas — pedido explícito porque
  // depender solo del sidebar para avanzar no era obvio (falta de UX).
  // Solo se muestra si el siguiente paso YA está construido/habilitado;
  // si el que sigue todavía no existe, no se muestra nada (no prometemos
  // un paso que aún no funciona).
  const currentIndex = ECOSYSTEM_STEPS.indexOf(step);
  const prevStep = ECOSYSTEM_STEPS[currentIndex - 1];
  const nextStep = ECOSYSTEM_STEPS[currentIndex + 1];
  const showBackButton = Boolean(prevStep && ENABLED_STEPS.includes(prevStep));
  const showNextButton = Boolean(nextStep && ENABLED_STEPS.includes(nextStep));

  return (
    <>
      <div className="hidden w-full font-sans md:flex">
        {/* sidebar — 6 pasos. Sin fondo propio: hereda el #FFFCF6 del home
            para no crear una mancha visual; el paso activo se distingue por
            tipografía (semibold), indicador lateral turquesa e icono activo,
            sin bloques de color, bordes exteriores ni sombras. */}
        <aside className="hidden w-[280px] shrink-0 flex-col px-6 py-6 md:flex">
          <p className="mb-6 text-xl font-bold tracking-tight text-[#1b1c1c]">NEXA</p>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
            {t("modalTitle")}
          </p>

          <nav className="flex flex-col gap-1">
            {ECOSYSTEM_STEPS.map((s) => {
              const isActive = step === s;
              const isEnabled = ENABLED_STEPS.includes(s);
              const icon = isActive ? STEP_ICONS_ACTIVE[s] : STEP_ICONS[s];
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!isEnabled}
                  onClick={() => isEnabled && setStep(s)}
                  className={`flex items-center gap-3 border-l-2 py-2 pl-3 text-left text-[12px] uppercase tracking-[0.3px] ${TRANSITION_MICRO} ${FOCUS_RING} ${
                    isActive
                      ? "border-[#00c3d0] font-semibold text-[#1b1c1c]"
                      : isEnabled
                        ? "border-transparent text-[#8e8e93] hover:text-[#1b1c1c]"
                        : "cursor-not-allowed border-transparent text-[#c8c4c0]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt="" aria-hidden="true" className="size-4" />
                  {t(`steps.${s}.label`)}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* contenido — racimo de cubos del paso activo */}
        <div className="relative flex flex-1 flex-col">
          <div className="border-b border-[#e4e0dc] px-6 py-4 md:px-10">
            <h2
              id="systemic-design-modal-title"
              className="text-xl font-bold text-[#1b1c1c] md:text-2xl"
            >
              {t(`steps.${step}.label`)}
            </h2>
          </div>
          {/* Canvas con altura proporcional al viewport disponible: el
              sustraendo 422px suma navbar (~92) + footer (~44) + paddings
              de sección (64) + cabecera (80) + cabecera de experiencia
              (~66) + barra de navegación (~76). Topado entre 280px
              (composición mínima legible: el radio orbital se deriva del
              lado menor) y 560px (tamaño de composición aprobado). El
              canvas mide su contenedor vía ResizeObserver, así que las
              dimensiones siempre son calculables y nada se recorta. */}
          <div className="relative md:h-[clamp(280px,calc(100dvh-422px),560px)]">
            {isDesktop ? <EcosystemCanvas step={step} /> : null}
          </div>

          {step === "resultado" ? (
          <div className="flex min-h-[76px] flex-col justify-center gap-1 border-t border-[#e4e0dc] px-6 py-3 md:min-h-[76px] md:flex-row md:items-center md:justify-between md:gap-4 md:px-10 md:py-4">
            <p className="order-1 w-full px-2 text-center text-[13px] leading-snug text-[#4c4546] md:order-2 md:min-w-0 md:flex-1 md:line-clamp-2">
              {t("resultCaption")}
            </p>

            <div className="order-2 flex items-center justify-between gap-4 md:contents">
              <TextNav
                onClick={() => setStep(prevStep)}
                micro
                muted
                className="flex shrink-0 items-center gap-2 bg-transparent px-2 py-2 min-h-[44px] md:order-1"
              >
                <span className="inline-flex rotate-180">
                  <ArrowIcon />
                </span>
                {t(`steps.${prevStep}.label`)}
              </TextNav>

              <TextNav
                href="/projects"
                micro
                className="flex shrink-0 items-center gap-2 bg-transparent px-2 py-2 min-h-[44px] md:order-3"
              >
                {t("cta")}
                <ArrowIcon />
              </TextNav>
            </div>
          </div>
          ) : (
          <div className="flex min-h-[76px] items-center justify-between gap-4 border-t border-[#e4e0dc] px-6 py-4 md:px-10">
            {showBackButton ? (
              <TextNav
                onClick={() => setStep(prevStep)}
                micro
                muted
                className="flex shrink-0 items-center gap-2 bg-transparent px-2 py-2 min-h-[44px]"
              >
                <span className="inline-flex rotate-180">
                  <ArrowIcon />
                </span>
                {t(`steps.${prevStep}.label`)}
              </TextNav>
            ) : (
              <span
                aria-hidden="true"
                className="invisible flex shrink-0 items-center gap-2 px-2 py-2 text-[11px] uppercase tracking-[1px]"
              >
                <ArrowIcon />
              </span>
            )}

            <p className="min-w-0 flex-1 px-2 text-center text-[13px] leading-snug text-[#4c4546] max-md:line-clamp-4 md:truncate">
              {t(`steps.${step}.hint`)}
            </p>

            {showNextButton ? (
              <TextNav
                onClick={() => setStep(nextStep)}
                micro
                className="flex shrink-0 items-center gap-2 bg-transparent px-2 py-2 min-h-[44px]"
              >
                {t(`steps.${nextStep}.label`)}
                <ArrowIcon />
              </TextNav>
            ) : (
              <span
                aria-hidden="true"
                className="invisible flex shrink-0 items-center gap-2 px-2 py-2 text-[11px] uppercase tracking-[1px]"
              >
                {t("steps.resultado.label")}
                <ArrowIcon />
              </span>
            )}
          </div>
          )}
        </div>
      </div>

      {/* mobile — pieza editorial de lectura, sin canvas 3D. Altura
          natural: la página hace scroll, sin contenedor con overflow
          (evita scroll anidado y contenido cortado). */}
      <div className="w-full font-sans md:hidden">
        <EcosystemEditorial />
      </div>
    </>
  );
}
