"use client";

// components/how-i-think/systemic-design/SystemicDesignModal.tsx
//
// Shell calcado de LabModal.tsx (mismo tamaño de panel 873x1280/90vh, mismo
// backdrop, misma paleta #fffcf6/#f4f4f4/#e4e0dc/#00c3d0) pero con su propia
// navegación de 6 pasos en vez del flujo de preguntas de LAB-001.
//
// Estado hoy: SOLO "Explorar" está construido y habilitado. Los otros 5 pasos
// ya aparecen en el sidebar (para no tener que rehacer la navegación cada
// vez) pero están deshabilitados a propósito — se activan uno a uno en
// próximas sesiones, sin adelantarse.

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import TextNav from "@/components/interaction/TextNav";
import IconControl from "@/components/interaction/IconControl";
import { FOCUS_RING, TRANSITION_MICRO } from "@/components/interaction/tokens";
import EcosystemCanvas from "./EcosystemCanvas";
import EcosystemEditorial from "./EcosystemEditorial";
import { ECOSYSTEM_STEPS, type EcosystemStep } from "./ecosystemData";

interface SystemicDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Único paso confirmado/probado hoy. Ampliar esta lista según construyamos
// cada pantalla (ver PROJECT-KNOWLEDGE-modal-diseno-sistemico.md).
const ENABLED_STEPS: EcosystemStep[] = [
  "explorar",
  "ver",
  "detectar",
  "entender",
  "organizar",
  "resultado",
];

// ASUNCIÓN A CONFIRMAR: nombres de archivo según el PK ("explore-1.svg a
// explore-6.svg" + "explore-over-1.svg a explore-over-6.svg", uno por paso,
// en el mismo orden que ECOSYSTEM_STEPS). Confírmame si el orden real en
// Figma es distinto.
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

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

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

export default function SystemicDesignModal({ isOpen, onClose }: SystemicDesignModalProps) {
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

  function handleClose() {
    onClose();
    setStep("explorar");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-0 backdrop-blur-none md:p-4 md:backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="systemic-design-modal-title"
        >
          <motion.div
            className="relative flex h-[100dvh] w-full overflow-hidden rounded-none bg-[#fffcf6] shadow-2xl md:h-[873px] md:max-h-[90vh] md:w-full md:max-w-[1280px] md:rounded-[22px]"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconControl
              label={t("close")}
              onClick={handleClose}
              framed={false}
              className="absolute right-4 top-4 z-20 md:right-6 md:top-6"
            >
              <CloseIcon />
            </IconControl>

            <div className="hidden h-full w-full font-sans md:flex">
              {/* sidebar — 6 pasos, calcado del patrón de LabModal.tsx */}
              <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[#e4e0dc] bg-[#f4f4f4] px-6 py-8 md:flex">
                <p className="mb-8 text-xl font-bold tracking-tight text-[#1b1c1c]">NEXA</p>

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
                <div className="border-b border-[#e4e0dc] px-6 py-5 md:px-10 md:py-6">
                  <h2
                    id="systemic-design-modal-title"
                    className="text-xl font-bold text-[#1b1c1c] md:text-2xl"
                  >
                    {t(`steps.${step}.label`)}
                  </h2>
                </div>
                <div className="relative flex-1">
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

            {/* mobile — pieza editorial de lectura, sin canvas 3D */}
            <div className="flex h-full w-full flex-col font-sans md:hidden">
              <div className="flex-1 overflow-y-auto">
                <EcosystemEditorial />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}