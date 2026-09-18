"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { trackAboutMeOpened } from "@/lib/analytics/events";
import { FOCUS_RING, TRANSITION_MICRO } from "@/components/interaction/tokens";

const AboutMeModal = dynamic(() => import("@/components/AboutMeModal"), { ssr: false });

export default function AboutMeWrapper() {
  const t = useTranslations("aboutMe");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          trackAboutMeOpened();
        }}
        className={`group relative inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border border-[#00C3D0] text-sm font-mono tracking-[0.12em] uppercase ${TRANSITION_MICRO} hover:bg-[#00C3D0] hover:text-[#FFFCF6] text-[#00C3D0] ${FOCUS_RING}`}
        style={{ borderRadius: "2px" }}
      >
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {t("openButton")}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && <AboutMeModal onClose={() => setOpen(false)} />}
    </>
  );
}