"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Projects() {
  const t = useTranslations("projects");

  const cards = [
    {
      key: "selectedWorks",
      href: "/selected-works",
      image: "/selected-works-card.png",
      imageBn: "/selected-works-card-bn.png",
      tag: t("selectedWorks.tag"),
      title: t("selectedWorks.title"),
      description: t("selectedWorks.description"),
      cta: t("selectedWorks.cta"),
    },
    {
      key: "strategicExplorations",
      href: "/strategic-explorations",
      image: "/strategic-explorations-card-c.png",
      imageBn: "/strategic-explorations-card-bn.png",
      tag: t("strategicExplorations.tag"),
      title: t("strategicExplorations.title"),
      description: t("strategicExplorations.description"),
      cta: t("strategicExplorations.cta"),
    },
  ];

  return (
    <section className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-10">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <p
          className="text-[11px] tracking-[0.2em] uppercase font-mono mb-3"
          style={{ color: "#00C3D0" }}
        >
          {t("label")}
        </p>

        <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] leading-tight mb-3">
          {t("heading")}
        </h2>

        <p className="text-sm text-[#555] leading-relaxed mb-8 max-w-xl">
          {t("subheading")}
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card) => (
            <Link key={card.key} href={card.href} className="group block">
              <div
                className="border rounded-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl"
                style={{ borderColor: "#E8E4DC", background: "#F7F4EE" }}
              >
                {/* Image — b&w default, color on hover */}
                <div className="relative w-full aspect-video overflow-hidden bg-[#E8E4DC]">
                  {/* Color */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* B&W */}
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