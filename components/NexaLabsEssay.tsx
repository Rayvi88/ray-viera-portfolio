"use client";

import { useTranslations } from "next-intl";

interface NexaLabsEssayProps {
  onStartLab?: () => void;
}

/**
 * Full editorial article for LAB-001, paired with the diagnostic modal (LabModal.tsx).
 * The welcome screen of the modal shows a short excerpt of this same article
 * (atlas.lab001.articleExcerpt) — this component is the full version that lives
 * on the actual /atlas/lab-001 page, above/around the entry point to the modal.
 *
 * NOTE: this component still lives at components/NexaLabsEssay.tsx — the filename
 * is a leftover from the old NEXA LABS concept. Content and translations are fully
 * migrated to the new atlas.lab001.article namespace; renaming the file itself is a
 * cosmetic follow-up, not urgent (flagged, not done unilaterally).
 */
export default function NexaLabsEssay({ onStartLab }: NexaLabsEssayProps) {
  const t = useTranslations("atlas.lab001.article");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16 md:px-0">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#00C3D0]">
        {t("eyebrow")}
      </p>

      <p className="mb-8 font-mono text-xs text-[#888]">
        {t("author")} · {t("date")}
      </p>

      <h1 className="mb-8 text-3xl font-bold leading-tight text-[#00C3D0] sm:text-4xl lg:text-5xl">
        {t("title")}
      </h1>

      <div className="space-y-5">
        {paragraphs.map((paragraph, i) => {
          const isKeyParagraph = i === 2;
          return (
            <p
              key={i}
              className={`text-base leading-relaxed ${
                isKeyParagraph ? "font-semibold text-[#00C3D0]" : "text-[#555]"
              }`}
            >
              {paragraph}
            </p>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onStartLab}
        className="mt-10 flex items-center gap-3 bg-black px-6 py-4 text-sm uppercase tracking-[1.6px] text-white transition-colors hover:bg-[#00C3D0]"
      >
        {t("cta")}
      </button>
    </article>
  );
}