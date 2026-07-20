"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { computeLab001Result } from "@/components/atlas/lab001-data";

type Lab001Status = "loading" | "not-started" | "in-progress" | "completed";

const LAB001_STORAGE_KEY = "atlas:lab001:answers";

export default function AtlasIndex() {
  const t = useTranslations("atlas.index");
  const [status, setStatus] = useState<Lab001Status>("loading");
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    // Syncing local status with an external system (localStorage) on mount — intentional.
    try {
      const raw = window.localStorage.getItem(LAB001_STORAGE_KEY);
      if (!raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStatus("not-started");
        return;
      }
      const saved = JSON.parse(raw) as { answers?: Record<number, string> };
      const answers = saved?.answers ?? {};
      if (Object.keys(answers).length === 0) {
        setStatus("not-started");
        return;
      }
      const result = computeLab001Result(answers);
      if (result) {
        setStatus("completed");
        setScore(result.overallScore);
      } else {
        setStatus("in-progress");
      }
    } catch {
      setStatus("not-started");
    }
  }, []);

  const completedCount = status === "completed" ? 1 : 0;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-0">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[1px] text-[#00c3d0]">
        {t("eyebrow")}
      </p>
      <h1 className="mb-3 text-3xl font-bold leading-tight text-[#1b1c1c] sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mb-8 max-w-xl text-sm text-[#4c4546]">{t("subheading")}</p>

      <div className="mb-10 flex items-center gap-3">
        <span className="text-[13px] font-semibold text-[#1b1c1c]">
          {t("progress", { completed: completedCount, total: 3 })}
        </span>
        <div className="h-1 max-w-[240px] flex-1 overflow-hidden rounded-full bg-[#e4e0dc]">
          <div
            className="h-full bg-[#00c3d0] transition-all duration-500"
            style={{ width: `${(completedCount / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* LAB-001 — real, dynamic */}
        <div
          className={`flex flex-col border bg-white p-5 ${
            status === "completed" ? "border-[#00c3d0]" : "border-[#cfc4c5]"
          }`}
        >
          <div className="mb-3 flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#00c3d0]">
              {t("labs.lab001.tag")}
            </span>
            {status === "completed" && <span className="text-base text-[#00c3d0]">✓</span>}
          </div>
          <p className="mb-1 text-[15px] font-bold text-[#1b1c1c]">{t("labs.lab001.name")}</p>
          <p className="mb-4 text-[12px] text-[#4c4546]">
            {status === "loading" && "\u00A0"}
            {status === "not-started" && t("available")}
            {status === "in-progress" && t("inProgress")}
            {status === "completed" && t("scoreLabel", { score: score ?? 0 })}
          </p>
          <Link
            href="/atlas/lab-001"
            className="mt-auto flex items-center justify-center bg-[#1b1c1c] px-4 py-2.5 text-[11px] uppercase tracking-[0.5px] text-white transition-colors hover:bg-[#00c3d0]"
          >
            {status === "completed"
              ? t("viewResult")
              : status === "in-progress"
                ? t("resume")
                : t("start")}
          </Link>
        </div>

        {/* LAB-002 — coming soon, no email capture, just label + contact */}
        <div className="flex flex-col border border-[#cfc4c5] bg-[#f8f6f2] p-5 opacity-90">
          <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8e8e93]">
            {t("labs.lab002.tag")}
          </span>
          <p className="mb-1 text-[15px] font-bold text-[#4c4546]">{t("labs.lab002.name")}</p>
          <p className="mb-4 text-[12px] text-[#8e8e93]">{t("building", { lab: "Lab-002" })}</p>
          <Link
            href="/contact"
            className="mt-auto flex items-center justify-center border border-[#1b1c1c] px-4 py-2.5 text-[11px] uppercase tracking-[0.5px] text-[#1b1c1c] transition-colors hover:border-[#00c3d0] hover:text-[#00c3d0]"
          >
            {t("talk")}
          </Link>
        </div>

        {/* LAB-003 — coming soon */}
        <div className="flex flex-col border border-[#cfc4c5] bg-[#f8f6f2] p-5 opacity-90">
          <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#8e8e93]">
            {t("labs.lab003.tag")}
          </span>
          <p className="mb-1 text-[15px] font-bold text-[#4c4546]">{t("labs.lab003.name")}</p>
          <p className="mb-4 text-[12px] text-[#8e8e93]">{t("comingSoon")}</p>
          <Link
            href="/contact"
            className="mt-auto flex items-center justify-center border border-[#1b1c1c] px-4 py-2.5 text-[11px] uppercase tracking-[0.5px] text-[#1b1c1c] transition-colors hover:border-[#00c3d0] hover:text-[#00c3d0]"
          >
            {t("talk")}
          </Link>
        </div>
      </div>
    </div>
  );
}