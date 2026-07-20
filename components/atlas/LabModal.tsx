"use client";

import { useEffect, useState, type ReactElement } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  CHECKPOINT_GROUPS,
  LAB001_DIMENSIONS,
  LAB001_QUESTIONS,
  computeLab001Result,
  type LabDimensionKey,
} from "./lab001-data";
import { generateLab001ResultPdf } from "./generateLab001Pdf";
import {
  trackAtlasCheckpointReached,
  trackAtlasLabCompleted,
  trackAtlasLabOpened,
  trackAtlasLabStarted,
  trackAtlasQuestionAnswered,
  trackAtlasResultContactClick,
  trackAtlasResultNextLabClick,
  trackAtlasResultPdfDownload,
  trackAtlasResultViewedReturning,
} from "@/lib/analytics/events";

const LAB_ID = "lab-001";

const LAB001_STORAGE_KEY = "atlas:lab001:answers";

/**
 * Reusable floating diagnostic modal shell for Atlas Labs.
 *
 * Architecture (confirmed):
 * - Fixed-size centered panel, backdrop-blur behind it (never full opacity dimming).
 * - Same panel size across every internal view (welcome / question / checkpoint / result).
 * - The close (X) lives ONCE at the shell level, top-right of the whole panel.
 * - Checkpoint mechanic: silent auto-advance on every question EXCEPT the last question
 *   of each macro-dimension (Q3 = end of Assets, Q6 = end of Processes for LAB-001),
 *   where an insight box appears and the user must click "Continuar" manually.
 * - Answers persist per question index, so navigating back and forth keeps the
 *   previously selected option highlighted.
 * - The result view is LAB-001's OWN result (not the combined 3-lab "Brand Operating
 *   System" — that only appears once all 3 labs are done). Sidebar + shell are shared
 *   between the question flow and the result view so the transition doesn't jar.
 *
 * Icons: sidebar dimension icons (check / circle / lock / document / plug / shield) are
 * TEMPORARY placeholders drawn inline. Option-card icons and stat icons use the real
 * SVGs from her public/ folder.
 */

type ModalView = "welcome" | "question" | "result";

interface LabModalProps {
  isOpen: boolean;
  onClose: () => void;
  labTag: string; // e.g. "LAB-001 · ACTIVOS Y ORGANIZACIÓN"
}

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

function BackArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 2h6M10 2v6.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8.5V2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 1.5h5L11 5v7.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 7h4M5 9.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4.5 1.5v3M9.5 1.5v3M3 4.5h8v2a4 4 0 0 1-8 0v-2z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 10.5V13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1.5l4.5 1.6v3.4c0 3-1.9 5.2-4.5 6.1-2.6-.9-4.5-3.1-4.5-6.1V3.1L7 1.5z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ResultIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 9V6M6 9V3M10 9V5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 1.5a5 5 0 0 0-3 9v2h6v-2a5 5 0 0 0-3-9z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M7.5 15.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const DIMENSION_ICONS: Record<LabDimensionKey, () => ReactElement> = {
  assets: CheckIcon,
  access: () => <span className="block size-[10px] rounded-full border-[1.3px] border-current" />,
  autonomy: LockIcon,
  documentation: DocumentIcon,
  operation: PlugIcon,
  approvals: ShieldIcon,
};

// ---- radar geometry (6-axis hexagon, dependency score 0-100 per axis) ----
const RADAR_SIZE = 220;
const RADAR_CENTER = RADAR_SIZE / 2;
const RADAR_MAX_R = 75;

function radarPoint(index: number, total: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * RADAR_MAX_R;
  return {
    x: RADAR_CENTER + r * Math.cos(angle),
    y: RADAR_CENTER + r * Math.sin(angle),
  };
}

function radarLabelPoint(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = RADAR_MAX_R + 16;
  return {
    x: RADAR_CENTER + r * Math.cos(angle),
    y: RADAR_CENTER + r * Math.sin(angle),
  };
}

export default function LabModal({ isOpen, onClose, labTag }: LabModalProps) {
  const t = useTranslations("atlas.lab001.welcome");
  const a = useTranslations("atlas.lab001.articleExcerpt");
  const s = useTranslations("atlas.lab001.sidebar");
  const cp = useTranslations("atlas.lab001.checkpoints");
  const r = useTranslations("atlas.lab001.result");

  const [view, setView] = useState<ModalView>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = LAB001_QUESTIONS[questionIndex];
  const currentIndex = questionIndex; // dimension order matches question order 1:1
  const selectedOptionId = answers[questionIndex] ?? null;
  const q = useTranslations(`atlas.lab001.questions.q${questionIndex + 1}`);

  const result = view === "result" ? computeLab001Result(answers) : null;

  // on open, track the open event and check if this browser already has saved
  // LAB-001 progress — complete (jump to result) or partial (resume at that question)
  useEffect(() => {
    if (!isOpen) return;
    trackAtlasLabOpened(LAB_ID);
    try {
      const raw = window.localStorage.getItem(LAB001_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { answers: Record<number, string>; questionIndex: number };
      if (!saved?.answers || Object.keys(saved.answers).length === 0) return;

      // Syncing with an external system (localStorage) on open — intentional, not render-derived.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(saved.answers);

      if (computeLab001Result(saved.answers)) {
        setView("result");
        trackAtlasResultViewedReturning(LAB_ID);
      } else {
        setQuestionIndex(Math.min(saved.questionIndex ?? 0, LAB001_QUESTIONS.length - 1));
        setView("question");
      }
    } catch {
      // corrupt or unavailable storage — ignore, just start fresh
    }
  }, [isOpen]);

  // save progress after every answer — complete or partial — so returning visitors
  // resume exactly where they left off (or see their finished result)
  useEffect(() => {
    if (Object.keys(answers).length === 0) return;
    try {
      window.localStorage.setItem(
        LAB001_STORAGE_KEY,
        JSON.stringify({ answers, questionIndex })
      );
    } catch {
      // storage unavailable (private browsing, etc.) — fail silently, not critical
    }
  }, [answers, questionIndex]);

  function handleDownloadPdf() {
    if (!result) return;
    trackAtlasResultPdfDownload(LAB_ID);
    const dimensionLabels: Record<string, string> = {};
    LAB001_DIMENSIONS.forEach((dim) => {
      dimensionLabels[dim.key] = s(`dimensions.${dim.labelKey}`);
    });
    generateLab001ResultPdf(result, {
      labTag,
      heading: r("heading"),
      scoreTitle: r("scoreTitle"),
      bandLabel: r(`bands.${result.band}`),
      bandDescription: r(`bandDescriptions.${result.band}`),
      byDimensionTitle: r("byDimensionTitle"),
      bannerTitle: r("bannerTitle"),
      bannerText: r("bannerText", {
        dim1: dimensionLabels[result.topOpportunities[0]] ?? "",
        dim2: dimensionLabels[result.topOpportunities[1]] ?? "",
      }),
      dimensionLabels,
      generatedOnLabel: r("generatedOnLabel"),
      footerNote: r("footerNote"),
    });
  }

  function handleSelectOption(optionId: string) {
    if (isTransitioning) return;
    const newAnswers = { ...answers, [questionIndex]: optionId };
    setAnswers(newAnswers);

    const tier = currentQuestion.options.find((o) => o.id === optionId)?.tier ?? 0;
    trackAtlasQuestionAnswered(LAB_ID, currentQuestion.dimension, questionIndex + 1, tier);

    if (currentQuestion.isCheckpoint && currentQuestion.checkpointGroup) {
      const indices = CHECKPOINT_GROUPS[currentQuestion.checkpointGroup];
      const tiers = indices.map(
        (i) => LAB001_QUESTIONS[i]?.options.find((o) => o.id === newAnswers[i])?.tier
      );
      if (!tiers.some((t) => t === undefined)) {
        const avg = (tiers as number[]).reduce((sum, t2) => sum + t2, 0) / tiers.length;
        const tierBand = avg < 2 ? "low" : avg < 3 ? "mid" : "high";
        trackAtlasCheckpointReached(LAB_ID, currentQuestion.checkpointGroup, tierBand);
      }
    }

    if (!currentQuestion.isCheckpoint) {
      setIsTransitioning(true);
      setTimeout(() => {
        if (questionIndex < LAB001_QUESTIONS.length - 1) {
          setQuestionIndex((i) => i + 1);
        }
        setIsTransitioning(false);
      }, 550);
    }
  }

  function handleReviewInfo() {
    if (questionIndex > 0) {
      setQuestionIndex((i) => i - 1);
    } else {
      setView("welcome");
    }
  }

  function handleContinueCheckpoint() {
    if (!selectedOptionId || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      if (questionIndex < LAB001_QUESTIONS.length - 1) {
        setQuestionIndex((i) => i + 1);
      } else {
        setView("result");
        const finalResult = computeLab001Result(answers);
        if (finalResult) {
          trackAtlasLabCompleted(LAB_ID, finalResult.overallScore, finalResult.band);
        }
      }
      setIsTransitioning(false);
    }, 300);
  }

  function getCheckpointTier(): "low" | "mid" | "high" | null {
    if (!currentQuestion.isCheckpoint || !currentQuestion.checkpointGroup) return null;
    const indices = CHECKPOINT_GROUPS[currentQuestion.checkpointGroup];
    const tiers = indices.map((i) => {
      const answerId = answers[i];
      const question = LAB001_QUESTIONS[i];
      return question?.options.find((o) => o.id === answerId)?.tier;
    });
    if (tiers.some((t) => t === undefined)) return null;
    const avg = (tiers as number[]).reduce((sum, t) => sum + t, 0) / tiers.length;
    if (avg < 2) return "low";
    if (avg < 3) return "mid";
    return "high";
  }

  const checkpointTier = getCheckpointTier();

  function resetAndClose() {
    setView("welcome");
    setQuestionIndex(0);
    setAnswers({});
    onClose();
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
          onClick={resetAndClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative flex h-[100dvh] w-full overflow-hidden rounded-none bg-[#fffcf6] shadow-2xl md:h-[873px] md:max-h-[90vh] md:w-full md:max-w-[1280px] md:rounded-[22px]"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* shell-level close — one instance, applies to every view */}
            <button
              type="button"
              onClick={resetAndClose}
              aria-label={t("close")}
              className="absolute right-4 top-4 z-20 text-[#1b1c1c] transition-colors hover:text-[#00c3d0] md:right-6 md:top-6"
            >
              <CloseIcon />
            </button>

            <AnimatePresence mode="wait">
              {view === "welcome" ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex h-full w-full items-center"
                >
                  <div className="hidden h-full flex-1 flex-col justify-center gap-4 px-16 font-sans md:flex">
                    <div>
                      <span className="border-l-2 border-[#00c3d0] pl-2 text-[13px] font-semibold uppercase tracking-[1px] text-[#1b1c1c]">
                        {a("tag")}
                      </span>
                      <p className="pl-2 text-[13px] uppercase tracking-[1px] text-[#00c3d0]">{a("kicker")}</p>
                    </div>
                    <p className="text-sm text-[#4c4546]">{a("byline")}</p>
                    <h2 className="text-3xl font-bold leading-tight text-[#1b1c1c] md:text-4xl">
                      {a("titleStart")} <span className="text-[#00c3d0]">{a("titleHighlight")}</span> {a("titleEnd")}
                    </h2>
                    <p className="text-base leading-relaxed text-[#4c4546]">{a("paragraph1")}</p>
                    <p className="text-base leading-relaxed text-[#4c4546]">{a("paragraph2")}</p>
                    <p className="text-base font-bold uppercase leading-snug text-[#00c3d0]">{a("closingLine")}</p>
                  </div>

                  <div className="relative flex h-full flex-1 items-center justify-center bg-[#f4f4f4] px-4 md:px-8">
                    <div className="relative flex w-full max-w-[336px] flex-col items-center border border-[#cfc4c5] bg-white p-6 md:p-[41px]">
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border border-[#cfc4c5] bg-[#e9e8e7] px-[17px] py-[4px]">
                        <p className="whitespace-nowrap text-center text-[10px] uppercase tracking-[1px] text-[#4c4546]">
                          {labTag}
                        </p>
                      </div>

                      <div className="mb-4 flex size-24 items-center justify-center rounded-xl border border-[#8e8e93] bg-[rgba(0,105,112,0.05)] text-[#1b1c1c]">
                        <FlaskIcon />
                      </div>

                      <h3 className="mb-4 text-center text-2xl font-bold text-[#1b1c1c]">{t("title")}</h3>
                      <p className="mb-6 text-center text-base font-light leading-[1.6] text-[#4c4546]">
                        {t("description")}
                      </p>

                      <div className="mb-6 flex w-full items-start justify-center border-y border-[#cfc4c5] py-[25px]">
                        <div className="flex flex-1 flex-col items-center gap-2 border-r border-[#cfc4c5]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/dimensino-lab001.svg" alt="" aria-hidden="true" className="size-[18px]" />
                          <span className="text-center text-[11px] uppercase tracking-[-0.5px] text-[#1b1c1c]">
                            {t("stats.dimensions")}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col items-center gap-2 border-r border-[#cfc4c5]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/time-lab001.svg" alt="" aria-hidden="true" className="size-[18px]" />
                          <span className="text-center text-[11px] uppercase tracking-[-0.5px] text-[#1b1c1c]">
                            {t("stats.time")}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/actions-lab001.svg" alt="" aria-hidden="true" className="size-[18px]" />
                          <span className="text-center text-[11px] uppercase leading-[1.5] tracking-[-0.5px] text-[#1b1c1c]">
                            {t("stats.resultsLine1")}
                            <br />
                            {t("stats.resultsLine2")}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          trackAtlasLabStarted(LAB_ID);
                          setView("question");
                        }}
                        className="flex w-full items-center justify-center gap-3 bg-black py-4 text-base uppercase tracking-[1.6px] text-white transition-colors hover:bg-[#00c3d0]"
                      >
                        {t("cta")}
                        <ArrowIcon />
                      </button>

                      <p className="mt-6 text-center text-[10px] uppercase tracking-[1px] text-[#4c4546]/60">
                        {t("privacy")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="shell"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex h-full w-full font-sans"
                >
                  {/* sidebar — shared between question flow and result view; hidden on mobile, replaced by a compact progress bar */}
                  <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[#e4e0dc] bg-[#f4f4f4] px-6 py-8 md:flex">
                    <p className="mb-8 text-xl font-bold tracking-tight text-[#1b1c1c]">NEXA</p>

                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-md bg-black text-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/Background-labprogress.svg" alt="" aria-hidden="true" className="size-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
                          {s("progressLabel")}
                        </p>
                        <p className="text-[13px] font-semibold text-[#00c3d0]">
                          {view === "result"
                            ? s("progressValue", { current: LAB001_DIMENSIONS.length, total: LAB001_DIMENSIONS.length })
                            : s("progressValue", { current: currentIndex + 1, total: LAB001_DIMENSIONS.length })}
                        </p>
                      </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                      {LAB001_DIMENSIONS.map((dim, i) => {
                        const Icon = DIMENSION_ICONS[dim.key];
                        const isActive = view === "question" && i === currentIndex;
                        const isDone = view === "result" || i < currentIndex;
                        return (
                          <div
                            key={dim.key}
                            className={`flex items-center gap-3 border-l-2 py-2 pl-3 text-[12px] uppercase tracking-[0.3px] transition-colors duration-300 ${
                              isActive
                                ? "border-[#00c3d0] font-semibold text-[#1b1c1c]"
                                : "border-transparent text-[#8e8e93]"
                            }`}
                          >
                            <span className={isDone ? "text-[#00c3d0]" : ""}>
                              <Icon />
                            </span>
                            {s(`dimensions.${dim.labelKey}`)}
                          </div>
                        );
                      })}

                      {/* result — only shown as a nav step once every question is answered */}
                      <div
                        className={`flex items-center gap-3 border-l-2 py-2 pl-3 text-[12px] uppercase tracking-[0.3px] transition-colors duration-300 ${
                          view === "result"
                            ? "border-[#00c3d0] font-semibold text-[#1b1c1c]"
                            : "border-transparent text-[#c8c4c0]"
                        }`}
                      >
                        <ResultIcon />
                        {s("resultLabel")}
                      </div>
                    </nav>

                    <div className="mt-auto flex flex-col gap-3 border-t border-[#e4e0dc] pt-6 text-[12px] text-[#8e8e93]">
                      <button type="button" className="text-left uppercase tracking-[0.3px] hover:text-[#00c3d0]">
                        {s("viewFullDiagnostic")}
                      </button>
                      <div className="flex items-center gap-2">
                        <ShieldIcon />
                        <span className="uppercase tracking-[0.3px]">{s("confidentiality")}</span>
                      </div>
                    </div>
                  </aside>

                  {/* main content */}
                  <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 md:px-14 md:py-10">
                    {/* mobile-only compact progress bar — replaces the sidebar below md */}
                    <div className="mb-5 flex items-center gap-3 md:hidden">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-black text-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/Background-labprogress.svg" alt="" aria-hidden="true" className="size-3.5" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
                            {view === "result" ? s("resultLabel") : s(`dimensions.${currentQuestion.dimension}`)}
                          </p>
                          <p className="text-[11px] font-semibold text-[#00c3d0]">
                            {view === "result"
                              ? s("progressValue", {
                                  current: LAB001_DIMENSIONS.length,
                                  total: LAB001_DIMENSIONS.length,
                                })
                              : s("progressValue", { current: currentIndex + 1, total: LAB001_DIMENSIONS.length })}
                          </p>
                        </div>
                        <div className="h-1 w-full bg-[#e4e0dc]">
                          <div
                            className="h-full bg-[#00c3d0] transition-all duration-300"
                            style={{
                              width:
                                view === "result"
                                  ? "100%"
                                  : `${((currentIndex + 1) / LAB001_DIMENSIONS.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
                      <FlaskIcon />
                      <span>{labTag}</span>
                    </div>

                    {view === "question" ? (
                      <>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={questionIndex}
                            initial={{ opacity: 0, x: 28 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -28 }}
                            transition={{ duration: 0.32, ease: "easeOut" }}
                            className="mx-auto flex w-full max-w-[860px] flex-1 flex-col justify-center"
                          >
                            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[1px] text-[#00c3d0]">
                              {s(`dimensions.${currentQuestion.dimension}`)}
                            </p>
                            <h3 className="mb-2 text-2xl font-bold leading-snug text-[#1b1c1c]">{q("scenario")}</h3>
                            <p className="mb-8 text-sm text-[#4c4546]">{q("context")}</p>

                            <div className="mb-8 grid grid-cols-1 gap-3 md:mb-10 md:grid-cols-4 md:gap-5">
                              {currentQuestion.options.map((opt, i) => {
                                const isSelected = selectedOptionId === opt.id;
                                return (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => handleSelectOption(opt.id)}
                                    className={`group flex min-h-0 flex-row items-center gap-4 border p-4 text-left transition-all duration-300 ease-out md:min-h-[340px] md:flex-col md:items-center md:justify-center md:gap-4 md:p-8 md:text-center md:hover:-translate-y-1 ${
                                      isSelected ? "border-[#00c3d0]" : "border-[#cfc4c5] hover:border-[#00c3d0]"
                                    }`}
                                  >
                                    <div
                                      className={`flex size-12 shrink-0 items-center justify-center rounded-md bg-[#f0efed] transition-colors duration-300 md:size-20 ${
                                        isSelected ? "bg-[#e6faf9]" : "group-hover:bg-[#e6faf9]"
                                      }`}
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={opt.icon} alt="" aria-hidden="true" className="size-6 md:size-10" />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-1 md:contents">
                                      <p
                                        className={`text-[13px] font-semibold transition-colors duration-300 ${
                                          isSelected ? "text-[#00c3d0]" : "text-[#1b1c1c] group-hover:text-[#00c3d0]"
                                        }`}
                                      >
                                        {q(`options.${i}.title`)}
                                      </p>
                                      <p className="text-[12px] text-[#4c4546]">{q(`options.${i}.subtitle`)}</p>
                                    </div>
                                    <span
                                      className={`flex size-4 shrink-0 items-center justify-center rounded-full border md:mt-1 ${
                                        isSelected ? "border-[#1b1c1c]" : "border-[#cfc4c5]"
                                      }`}
                                    >
                                      {isSelected && <span className="size-2 rounded-full bg-[#1b1c1c]" />}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {currentQuestion.isCheckpoint && checkpointTier && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex gap-3 border border-[#00c3d0]/40 bg-[#e6faf9] p-5"
                              >
                                <span className="mt-0.5 text-[#00c3d0]">⚠</span>
                                <div>
                                  <p className="mb-1 text-[13px] font-bold uppercase tracking-[0.5px] text-[#00c3d0]">
                                    {cp("title")}
                                  </p>
                                  <p className="text-sm text-[#4c4546]">
                                    {cp(`${currentQuestion.checkpointGroup}.${checkpointTier}`)}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-4 border-t border-[#e4e0dc] pt-6 md:grid md:grid-cols-3 md:items-center md:gap-0">
                          <button
                            type="button"
                            onClick={handleReviewInfo}
                            className="flex items-center gap-2 justify-self-start text-[13px] uppercase tracking-[0.5px] text-[#4c4546] hover:text-[#00c3d0]"
                          >
                            <BackArrowIcon />
                            {s("reviewInfo")}
                          </button>

                          <div className="flex justify-center gap-1.5 md:justify-self-center">
                            {LAB001_DIMENSIONS.map((_, i) => (
                              <span
                                key={i}
                                className={`size-1.5 rounded-full transition-colors duration-300 ${
                                  i === currentIndex ? "bg-[#00c3d0]" : "bg-[#d8d3ce]"
                                }`}
                              />
                            ))}
                          </div>

                          {currentQuestion.isCheckpoint && (
                            <button
                              type="button"
                              onClick={handleContinueCheckpoint}
                              disabled={!selectedOptionId}
                              className="flex w-full items-center justify-center gap-3 bg-black px-8 py-4 text-sm uppercase tracking-[1.6px] text-white transition-colors hover:bg-[#00c3d0] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-black md:w-auto md:justify-self-end"
                            >
                              {cp("continue")}
                              <ArrowIcon />
                            </button>
                          )}
                        </div>
                      </>
                    ) : result ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col overflow-y-auto"
                      >
                        <p className="mb-2 border-b border-[#e4e0dc] pb-3 text-[13px] font-semibold uppercase tracking-[1px] text-[#00c3d0]">
                          {r("eyebrow")}
                        </p>
                        <h3 className="mb-6 text-2xl font-bold leading-snug text-[#1b1c1c]">{r("heading")}</h3>

                        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                          {/* score ring */}
                          <div className="flex flex-col items-center border border-[#e4e0dc] p-6 text-center">
                            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
                              {r("scoreTitle")}
                            </p>
                            <svg width="140" height="140" viewBox="0 0 140 140">
                              <circle cx="70" cy="70" r="58" fill="none" stroke="#e4e0dc" strokeWidth="12" />
                              <circle
                                cx="70"
                                cy="70"
                                r="58"
                                fill="none"
                                stroke="#00c3d0"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 58}
                                strokeDashoffset={2 * Math.PI * 58 * (1 - result.overallScore / 100)}
                                transform="rotate(-90 70 70)"
                              />
                              <text x="70" y="66" textAnchor="middle" fontSize="28" fontWeight="700" fill="#1b1c1c">
                                {result.overallScore}
                              </text>
                              <text x="70" y="84" textAnchor="middle" fontSize="11" fill="#8e8e93">
                                /100
                              </text>
                            </svg>
                            <span className="mt-4 bg-[#e6faf9] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#00c3d0]">
                              {r(`bands.${result.band}`)}
                            </span>
                            <p className="mt-4 text-[13px] leading-relaxed text-[#4c4546]">
                              {r(`bandDescriptions.${result.band}`)}
                            </p>
                          </div>

                          {/* by dimension */}
                          <div className="border border-[#e4e0dc] p-6">
                            <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
                              {r("byDimensionTitle")}
                            </p>
                            <div className="flex flex-col gap-4">
                              {result.dimensionScores.map((d) => (
                                <div key={d.key}>
                                  <div className="mb-1 flex items-center justify-between text-[12px]">
                                    <span className="font-semibold text-[#1b1c1c]">
                                      {s(`dimensions.${d.labelKey}`)}
                                    </span>
                                    <span className="text-[#8e8e93]">{d.score}/100</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-[#e4e0dc]">
                                    <div className="h-full bg-[#00c3d0]" style={{ width: `${d.score}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* radar */}
                          <div className="flex flex-col items-center border border-[#e4e0dc] p-6">
                            <p className="mb-5 text-center text-[12px] font-semibold uppercase tracking-[0.5px] text-[#1b1c1c]">
                              {r("radarTitle")}
                            </p>
                            <svg width={RADAR_SIZE} height={RADAR_SIZE} viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}>
                              {[0.33, 0.66, 1].map((f) => (
                                <polygon
                                  key={f}
                                  points={result.dimensionScores
                                    .map((_, i) => {
                                      const p = radarPoint(i, result.dimensionScores.length, 100 * f);
                                      return `${p.x},${p.y}`;
                                    })
                                    .join(" ")}
                                  fill="none"
                                  stroke="#e4e0dc"
                                  strokeWidth="1"
                                />
                              ))}
                              <polygon
                                points={result.dimensionScores
                                  .map((d, i) => {
                                    const p = radarPoint(i, result.dimensionScores.length, d.score);
                                    return `${p.x},${p.y}`;
                                  })
                                  .join(" ")}
                                fill="#00c3d0"
                                fillOpacity="0.25"
                                stroke="#00c3d0"
                                strokeWidth="2"
                              />
                              {result.dimensionScores.map((d, i) => {
                                const p = radarPoint(i, result.dimensionScores.length, d.score);
                                return <circle key={d.key} cx={p.x} cy={p.y} r="3" fill="#00c3d0" />;
                              })}
                              {result.dimensionScores.map((d, i) => {
                                const lp = radarLabelPoint(i, result.dimensionScores.length);
                                return (
                                  <text
                                    key={d.key}
                                    x={lp.x}
                                    y={lp.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="11"
                                    fontWeight="700"
                                    fill="#1b1c1c"
                                  >
                                    {d.score}
                                  </text>
                                );
                              })}
                            </svg>
                            <div className="mt-3 flex w-full flex-col gap-1.5">
                              {result.dimensionScores.map((d) => (
                                <div key={d.key} className="flex items-center gap-2 text-[11px]">
                                  <span className="w-8 shrink-0 text-right font-bold text-[#00c3d0]">{d.score}</span>
                                  <span className="uppercase tracking-[0.3px] text-[#4c4546]">
                                    {s(`dimensions.${d.labelKey}`)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 border border-[#00c3d0]/40 bg-[#e6faf9] p-6 sm:flex-row sm:items-center">
                          <div className="flex flex-1 gap-3">
                            <span className="mt-0.5 text-[#00c3d0]">
                              <BulbIcon />
                            </span>
                            <div>
                              <p className="mb-1 text-[13px] font-bold uppercase tracking-[0.5px] text-[#00c3d0]">
                                {r("bannerTitle")}
                              </p>
                              <p className="text-sm text-[#4c4546]">
                                {r("bannerText", {
                                  dim1: s(`dimensions.${LAB001_DIMENSIONS.find((d) => d.key === result.topOpportunities[0])?.labelKey}`),
                                  dim2: s(`dimensions.${LAB001_DIMENSIONS.find((d) => d.key === result.topOpportunities[1])?.labelKey}`),
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                            <button
                              type="button"
                              onClick={() => trackAtlasResultNextLabClick(LAB_ID)}
                              className="flex items-center justify-center gap-2 bg-black px-6 py-3 text-[13px] uppercase tracking-[1px] text-white transition-colors hover:bg-[#00c3d0]"
                            >
                              {r("ctaNextLab")}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 pt-8">
                          <Link
                            href="/contact"
                            onClick={() => trackAtlasResultContactClick(LAB_ID)}
                            className="flex items-center gap-2 border border-[#1b1c1c] px-6 py-3 text-[13px] uppercase tracking-[1px] text-[#1b1c1c] transition-colors hover:border-[#00c3d0] hover:text-[#00c3d0]"
                          >
                            {r("ctaContact")}
                          </Link>
                          <button
                            type="button"
                            onClick={handleDownloadPdf}
                            className="text-[11px] uppercase tracking-[0.5px] text-[#8e8e93] underline hover:text-[#00c3d0]"
                          >
                            {r("downloadPdf")}
                          </button>
                        </div>
                      </motion.div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}