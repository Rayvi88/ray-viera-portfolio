"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ParticleCard from "./ParticleCard";

export default function SelectedWorks() {
  const t = useTranslations("selectedWorks");

  const projects = [
    {
      id: "fintech-platform",
      title: "FinTech Platform",
      description: t("fintech"),
      tags: ["UX Research", "UI Design", "Design System"],
      href: "/case-study/fintech",
      imageBn: "/fintech-bn.png",
      imageColor: "/fintech-c.png",
    },
    {
      id: "social-media-strategy",
      title: "Content Strategy & Visual Identity",
      description: t("social"),
      tags: ["Community Building", "Brand Strategy", "Content Design"],
      href: "/case-study/social-media-strategy",
      imageBn: "/media-bn.png",
      imageColor: "/media-c.png",
    },
    {
      id: "smart-documents-gtm",
      title: "Smart Documents: Go To Market Strategy",
      description: t("gtm"),
      tags: ["UX Architecture", "Product Strategy", "Go To Market", "Conversion Design"],
      href: "/case-study/smart-documents-gtm",
      imageBn: "/gotomarket-bn.png",
      imageColor: "/gotomarket-c.png",
    },
    {
      id: "smart-documents",
      title: "Smart Documents",
      description: t("smart"),
      tags: ["Product Concept", "UX Architecture", "Interaction Design"],
      href: "/case-study/smart-documents",
      imageBn: "/smart-bn.png",
      imageColor: "/smart-c.png",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? projects.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === projects.length - 1 ? 0 : c + 1));

  const getVisible = () => {
    const prev_i = (current - 1 + projects.length) % projects.length;
    const next_i = (current + 1) % projects.length;
    return [prev_i, current, next_i];
  };

  return (
    <section
      ref={sectionRef}
      className="flex-1 flex flex-col px-4 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-24 bg-[#FFFCF6]"
    >
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00C3D0] mb-10 lg:mb-16 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {t("title")}
      </h2>

      <div className="relative flex items-center gap-3 lg:gap-6">
        <button
          onClick={prev}
          className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300 text-sm self-stretch my-auto"
        >
          &#8592;
        </button>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 min-w-0">
          {getVisible()
            .slice(1, 3)
            .map((projectIndex, i) => (
              <ParticleCard
                key={projects[projectIndex].id}
                project={projects[projectIndex]}
                index={i}
                visible={visible}
                className={i === 1 ? "hidden sm:block" : ""}
              />
            ))}
        </div>

        <button
          onClick={next}
          className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300 text-sm self-stretch my-auto"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}