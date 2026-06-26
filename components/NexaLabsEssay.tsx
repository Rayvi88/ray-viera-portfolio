"use client";

import { useTranslations } from "next-intl";

export default function NexaLabsEssay() {
  const t = useTranslations("nexaLab.lab01.essay");
  const paragraphs = t("body").split("\n\n");

  return (
    <article className="w-full max-w-2xl mx-auto px-6 md:px-0 py-16">

      {/* Eyebrow — mismo estilo que Projects */}
      <p className="text-[11px] tracking-[0.2em] uppercase font-mono mb-2 text-[#00C3D0]">
        {t("eyebrow")}
      </p>

      {/* Autor y fecha */}
      <p className="text-xs text-[#888] font-mono mb-8">
        {t("author")} · {t("date")}
      </p>

      {/* Título — mismo estilo que HowIThink */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00C3D0] leading-tight mb-8">
        {t("title")}
      </h1>

      {/* Cuerpo */}
      <div className="space-y-5">
        {paragraphs.map((paragraph, i) => {
          const isKeyParagraph = i === 2;
          return (
            <p
              key={i}
              className={`text-base leading-relaxed ${
                isKeyParagraph
                  ? "text-[#00C3D0] font-semibold"
                  : "text-[#555]"
              }`}
            >
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
}