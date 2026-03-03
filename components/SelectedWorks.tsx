"use client";

import { useEffect, useRef, useState } from "react";
import ParticleCard from "./ParticleCard";

const projects = [
  {
    id: "fintech-platform",
    title: "FinTech Platform",
    description: "Designing scalable documentation architecture for global KYC Operations.",
    tags: ["UX Research", "UI Design", "Design System"],
    href: "/case-study/fintech",
    imageBn: "/fintech-bn.png",
    imageColor: "/fintech-c.png",
  },
  {
    id: "registration-platform",
    title: "Registration Platform for Readers",
    description: "Design and layout of a digital platform to attract readers interested in exclusive benefits.",
    tags: ["UX Strategy", "Prototyping", "Flow Design"],
    href: "#",
    imageBn: "/readers-bn.png",
    imageColor: "/readers-c.png",
  },
  {
    id: "social-media-strategy",
    title: "Social Media Strategy and Content Design",
    description: "Development of visual and audiovisual content for brand positioning and promotion on social media.",
    tags: ["Content Strategy", "Brand Communication"],
    href: "#",
    imageBn: "/media-bn.png",
    imageColor: "/media-c.png",
  },
];

export default function SelectedWorks() {
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
        Selected Works
      </h2>

      <div className="relative flex items-center gap-3 lg:gap-6">
        {/* Flecha izquierda */}
        <button
          onClick={prev}
          className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300 text-sm"
        >
          ←
        </button>

        {/* Cards — 1 en mobile, 2 en sm+ */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {getVisible()
            .slice(0, 2)
            .map((projectIndex, i) => (
            <ParticleCard
            key={projects[projectIndex].id}
            project={projects[projectIndex]}
            index={i}
          visible={visible}
        className={i === 1 ? "hidden sm:flex sm:flex-col" : ""}
        />
        ))}
      </div>

        {/* Flecha derecha */}
        <button
          onClick={next}
          className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#E8E4DC] rounded-full hover:border-[#00C3D0] hover:text-[#00C3D0] transition-all duration-300 text-sm"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8 lg:mt-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#00C3D0] w-6" : "bg-[#E8E4DC] w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}