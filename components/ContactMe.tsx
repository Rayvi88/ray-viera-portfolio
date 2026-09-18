"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  trackLinkedInClick,
  trackEmailClick,
  trackContactEmailCopy,
} from "@/lib/analytics/events";
import { ECOSYSTEM_PILL_CLASS } from "@/components/interaction/patterns";

const EMAIL = "raymvier@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ray-viera/";
const COPIED_FEEDBACK_MS = 2000;

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para contextos sin Clipboard API (HTTP, iOS antiguos).
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactMe() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    const ok = await copyToClipboard(EMAIL);
    if (!ok) return;
    trackContactEmailCopy();
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <div
      className="flex-1 flex items-center justify-center px-6 sm:px-8 py-16 sm:py-20 lg:py-28"
      style={{ backgroundColor: "#FFFCF6" }}
    >
      <div className="w-full max-w-[760px] flex flex-col items-center text-center">
        <p
          className="text-[11px] sm:text-xs font-semibold uppercase"
          style={{ color: "#00C3D0", letterSpacing: "0.2em" }}
        >
          {t("eyebrow")}
        </p>

        <h1
          className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight"
          style={{ color: "#1a1a1a" }}
        >
          {t("headline")}
        </h1>

        <p
          className="mt-4 text-sm sm:text-base leading-relaxed"
          style={{ color: "#6B7280" }}
        >
          {t("subheadline")}
        </p>

        <p
          className="mt-10 sm:mt-12 text-lg sm:text-xl font-semibold"
          style={{ color: "#1a1a1a" }}
        >
          {t("directLabel")}
        </p>
        <p
          className="mt-2 text-lg sm:text-xl break-all"
          style={{ color: "#374151" }}
        >
          {EMAIL}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCopy}
            className={`${ECOSYSTEM_PILL_CLASS} active:scale-[0.98]`}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {t("copyLabel")}
          </button>

          <a
            href={`mailto:${EMAIL}`}
            onClick={trackEmailClick}
            className={ECOSYSTEM_PILL_CLASS}
          >
            <MailIcon />
            {t("openLabel")}
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onClick={trackLinkedInClick}
            className={ECOSYSTEM_PILL_CLASS}
          >
            <LinkedInIcon />
            {t("linkedinLabel")}
          </a>
        </div>

        <div className="mt-4 min-h-[24px]" aria-live="polite">
          {copied && (
            <p role="status" className="text-sm font-medium" style={{ color: "#00C3D0" }}>
              {t("copiedLabel")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
