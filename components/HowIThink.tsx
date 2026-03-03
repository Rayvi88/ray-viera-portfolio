"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cards = [
  {
    icon: "/ux-research.svg",
    title: "UX Research",
    description: "Deep user insights and data-driven research to inform design decisions and validate product direction.",
  },
  {
    icon: "/ui-design.svg",
    title: "UI Design",
    description: "Beautiful, intuitive interfaces that combine aesthetics with usability for exceptional user experiences.",
  },
  {
    icon: "/design-systems.svg",
    title: "Design Systems",
    description: "Design that ensure consistency across your product ecosystem.",
  },
  {
    icon: "/product-design.svg",
    title: "Product Design",
    description: "End-to-end product design from concept to launch, focusing on solving real user problems.",
  },
  {
    icon: "/brand-experience.svg",
    title: "Brand Experience",
    description: "Cohesive brand identities that resonate with your audience and differentiate you in the market.",
  },
  {
    icon: "/product-strategy.svg",
    title: "Product Strategy",
    description: "Strategic guidance to align design with business goals and create meaningful product roadmaps.",
  },
];

export default function HowIThink() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
        How I think
      </h2>

      {/* Mobile: 1 col / Tablet: 2 col / Desktop: 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E4DC]">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`
              group flex flex-col items-center text-center px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 bg-[#FFFCF6]
              border border-[#E8E4DC] cursor-default
              transition-all duration-500 ease-out
              hover:border-[#00C3D0]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="mb-4 lg:mb-6 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={card.icon}
                alt={card.title}
                width={48}
                height={48}
                className="object-contain w-10 h-10 lg:w-12 lg:h-12"
              />
            </div>
            <h3 className="text-base lg:text-lg font-bold text-black mb-3 lg:mb-4 transition-colors duration-300 group-hover:text-[#00C3D0]">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}