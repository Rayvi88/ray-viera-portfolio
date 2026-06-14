"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";


export default function StrategicExplorations() {
  const t = useTranslations("strategicExplorations");

  const cards = [
    {
      key: "operationalUx",
      href: "/case-study/operational-ux",
      image: "/operational-ux-c.png",
      imageBn: "/operational-ux-bn.png",
      tag: t("operationalUxTag"),
      title: t("operationalUxTitle"),
      description: t("operationalUx"),
      cta: t("cta"),
      tags: ["Operational UX", "Systems Thinking", "Service Design"],
    },
    {
      key: "gtm",
      href: "/case-study/smart-documents-gtm",
      image: "/gotomarket-c.png",
      imageBn: "/gotomarket-bn.png",
      tag: t("gtmTag"),
      title: t("gtmTitle"),
      description: t("gtm"),
      cta: t("cta"),
      tags: ["UX Architecture", "Product Strategy", "Go To Market", "Conversion Design"],
    },
    {
      key: "smart",
      href: "/case-study/smart-documents",
      image: "/smart-c.png",
      imageBn: "/smart-bn.png",
      tag: t("smartTag"),
      title: t("smartTitle"),
      description: t("smart"),
      cta: t("cta"),
      tags: ["Product Concept", "UX Architecture", "Interaction Design"],
    },
    {
      key: "luxuryBrand",
      href: "/case-study/luxury-brand",
      image: "/luxury-brand-c.png",
      imageBn: "/luxury-brand-bn.png",
      tag: t("luxuryBrandTag"),
      title: t("luxuryBrandTitle"),
      description: t("luxuryBrand"),
      cta: t("cta"),
      tags: ["Brand Identity", "Visual System", "Communication Design"],
    },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const totalSlides = isMobile ? cards.length : Math.ceil(cards.length / 2);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const applySlide = useCallback((index: number) => {
    if (!trackRef.current) return;
    const outer = trackRef.current.parentElement;
    if (!outer) return;
    const outerWidth = outer.clientWidth;
    const slideWidth = outerWidth + 16;
    trackRef.current.style.transition = "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    trackRef.current.style.transform = `translateX(-${index * slideWidth}px)`;
  }, []);

  useEffect(() => {
    setCurrent(0);
    applySlide(0);
  }, [isMobile, applySlide]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    applySlide(index);
  }, [applySlide]);

  // Group cards into slides
  const slides: (typeof cards)[] = isMobile
    ? cards.map((c) => [c])
    : [cards.slice(0, 2), cards.slice(2, 4)];

  return (
    <section
      ref={sectionRef}
      className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <p
          className="text-[11px] tracking-[0.2em] uppercase font-mono mb-3"
          style={{ color: "#00C3D0" }}
        >
          {t("label")}
        </p>

        <h2
          className={`text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mb-3 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("title")}
        </h2>

        <p className="text-sm text-[#555] leading-relaxed mb-8 max-w-xl">
          {t("subtitle")}
        </p>

        {/* Carousel */}
        <div className="relative">
          {/* Prev arrow */}
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
              current === 0
                ? "opacity-20 pointer-events-none"
                : "hover:border-[#00C3D0] hover:text-[#00C3D0]"
            }`}
            style={{
              borderColor: "#E8E4DC",
              background: "#FFFCF6",
              color: "#1a1a1a",
            }}
          >
            ←
          </button>

          {/* Track outer */}
          <div className="overflow-hidden w-full">
            <div
              ref={trackRef}
              className="flex"
              style={{ gap: "16px" }}
            >
              {slides.map((slideCards, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex shrink-0 w-full"
                  style={{ gap: "16px" }}
                >
                  {slideCards.map((card, i) => (
                    <Link
                      key={card.key}
                      href={card.href}
                      className="group block flex-1 min-w-0"
                    >
                      <div
                        className={`border rounded-sm overflow-hidden h-full transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl ${
                          visible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }`}
                        style={{
                          borderColor: "#E8E4DC",
                          background: "#F7F4EE",
                          transitionDelay: `${(slideIndex * 2 + i) * 80}ms`,
                        }}
                      >
                        {/* Image — b&w default, color on hover */}
                        <div className="relative w-full aspect-video overflow-hidden bg-[#E8E4DC]">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <Image
                            src={card.imageBn}
                            alt={card.title}
                            fill
                            className="object-cover absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>

                        {/* Body */}
                        <div className="px-7 py-5">
                          <p
                            className="text-[10px] tracking-[0.18em] uppercase font-mono mb-2"
                            style={{ color: "#00C3D0" }}
                          >
                            {card.tag}
                          </p>
                          <h3 className="text-lg font-light text-[#1a1a1a] mb-2">
                            {card.title}
                          </h3>
                          <p className="text-sm text-[#555] leading-relaxed mb-4">
                            {card.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {card.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-mono tracking-wider uppercase px-2 py-1 rounded-sm"
                                style={{ background: "#E8E4DC", color: "#666" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <span
                            className="text-xs tracking-[0.15em] uppercase font-mono border-b pb-0.5"
                            style={{ color: "#1a1a1a", borderColor: "#1a1a1a" }}
                          >
                            {card.cta} &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next"
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
              current === totalSlides - 1
                ? "opacity-20 pointer-events-none"
                : "hover:border-[#00C3D0] hover:text-[#00C3D0]"
            }`}
            style={{
              borderColor: "#E8E4DC",
              background: "#FFFCF6",
              color: "#1a1a1a",
            }}
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: i === current ? "#00C3D0" : "#C8C4BC",
                transform: i === current ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}