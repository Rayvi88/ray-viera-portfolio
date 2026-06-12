"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function SelectedWorksPage() {
  const t = useTranslations("selectedWorks");

  const cards = [
    {
      key: "fintech",
      href: "/case-study/fintech",
      image: "/fintech-c.png",
      imageBn: "/fintech-bn.png",
      tag: t("fintechTag"),
      title: t("fintech.title"),
      description: t("fintech.description"),
      cta: t("cta"),
      tags: ["UX Research", "UI Design", "Design System"],
    },
    {
      key: "social",
      href: "/case-study/social-media-strategy",
      image: "/media-c.png",
      imageBn: "/media-bn.png",
      tag: t("socialTag"),
      title: t("social.title"),
      description: t("social.description"),
      cta: t("cta"),
      tags: ["Community Building", "Brand Strategy", "Content Design"],
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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

        {/* Cards — 2 col on md, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <Link key={card.key} href={card.href} className="group block">
              <div
                className={`border rounded-sm overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  borderColor: "#E8E4DC",
                  background: "#F7F4EE",
                  transitionDelay: `${i * 100}ms`,
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
                  <h3 className="text-xl font-light text-[#1a1a1a] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono tracking-wider uppercase px-2 py-1 rounded-sm"
                        style={{
                          background: "#E8E4DC",
                          color: "#555",
                        }}
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
      </div>
    </section>
  );
}