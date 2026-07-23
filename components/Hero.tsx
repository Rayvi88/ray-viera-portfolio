"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trackHeroCtaClick } from "@/lib/analytics/events";
import InteractiveHero from "@/components/InteractiveHero";

export default function Hero() {
  const t = useTranslations("hero");

  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      setActiveSlide((current) => (current === 0 ? 1 : 0));
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();

    return () => {
      stopAutoplay();
    };
  }, []);

  const handleInteractionStart = () => {
    stopAutoplay();
  };

  const handleInteractionEnd = () => {
    startAutoplay();
  };

  return (
    <section
      className="relative flex-1 overflow-hidden"
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onFocus={handleInteractionStart}
      onBlur={handleInteractionEnd}
    >
      {/* SLIDE 1 — HERO PRINCIPAL */}

      <div
        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          activeSlide === 0 ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <section className="h-full flex items-center px-4 sm:px-10 lg:px-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {t("headline1")}
              <br />
              {t("headline2")}{" "}
              <span className="text-[#00C3D0]">
                {t("highlight")}
              </span>
              .
            </h1>

            <p className="mt-4 lg:mt-6 text-sm sm:text-base text-gray-600">
              {t("subheadline")}
            </p>

            {/* NEXA LABS hook */}

            <div className="mt-6 lg:mt-8 inline-flex flex-col gap-1 border-l-2 border-[#00C3D0] pl-4">
              <p className="text-xs tracking-[0.1em] uppercase text-[#888]">
                {t("nexaHook")}
              </p>

              <Link
                href="/atlas/lab-001"
                onClick={() => trackHeroCtaClick("atlas_lab_001")}
                className="text-sm text-[#1a1a1a] font-medium hover:text-[#00C3D0] transition-colors duration-200 flex items-center gap-1.5"
              >
                {t("nexaHookCta")}
                <span className="text-[#00C3D0]">→</span>
              </Link>
            </div>

            {/* CTA BUTTONS */}

            <div className="mt-6 lg:mt-8 flex gap-3 lg:gap-4">
              <Link
                href="/contact"
                onClick={() => trackHeroCtaClick("contact")}
                className="border border-black rounded-full px-5 sm:px-6 py-2 text-sm sm:text-base hover:bg-[#00C3D0] hover:text-white hover:border-[#00C3D0] transition"
              >
                {t("contactMe")}
              </Link>

              <Link
                href="/selected-works"
                onClick={() => trackHeroCtaClick("selected_works")}
                className="border border-black rounded-full px-5 sm:px-6 py-2 text-sm sm:text-base hover:bg-[#00C3D0] hover:text-white hover:border-[#00C3D0] transition"
              >
                {t("selectedWorks")}
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* SLIDE 2 — HERO INTERACTIVO */}

      <div
        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          activeSlide === 1 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <InteractiveHero />
      </div>

      {/* NAVEGACIÓN */}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setActiveSlide(0);
            stopAutoplay();
          }}
          aria-label="Mostrar Hero principal"
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSlide === 0
              ? "bg-[#00C3D0] scale-125"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />

        <button
          type="button"
          onClick={() => {
            setActiveSlide(1);
            stopAutoplay();
          }}
          aria-label="Mostrar Hero interactivo"
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSlide === 1
              ? "bg-[#00C3D0] scale-125"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      </div>
    </section>
  );
}