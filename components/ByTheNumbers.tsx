"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stats = [
  { img: "/number-15.png", label: "+ Years of experience" },
  { img: "/number-60.png", label: "+ Projects UX/UI & system optimization" },
  { img: "/number-100.png", label: "% Products shipped" },
];

export default function ByTheNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex-1 flex items-center px-4 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-24 bg-[#FFFCF6]"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 items-center">

        {/* Columna izquierda */}
        <div
          className={`lg:col-span-3 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00C3D0] mb-8 lg:mb-12">
            By the numbers
          </h2>
          <div className="space-y-4 lg:space-y-6 text-[15px] leading-relaxed text-black">
            <p>
              <strong>I care about building things that make sense.</strong>{" "}
              Before I design, listen observe. I try to understand what&apos;s
              happening, not just what&apos;s written.
            </p>
            <p>
              <strong>I like clarity.</strong> Good design, for me, is not about
              decoration. It&apos;s about reducing friction and helping people move
              forward with confidence.
            </p>
            <p>
              <strong>I work end-to-end.</strong> But I&apos;m not attached,
              sometimes that means shaping early ideas, sometimes it means
              fixing what&apos;s already broken.
            </p>
            <p>
              <strong>I ask questions.</strong> I care about doing the work
              properly, not quickly, not superficially.
            </p>
          </div>
        </div>

        {/* Columna derecha — fila en mobile, columna en desktop */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col justify-around lg:items-center gap-6 lg:gap-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <Image
                src={stat.img}
                alt={stat.label}
                width={248}
                height={168}
                className="object-contain w-24 sm:w-32 lg:w-[248px]"
              />
              <p className="mt-1 lg:mt-2 text-[#00C3D0] text-xs sm:text-sm text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}