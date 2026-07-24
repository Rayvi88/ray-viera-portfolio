"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import PhotoReveal from "@/components/PhotoReveal";
import {
  trackAboutMeClosed,
  trackAboutMeIconHovered,
} from "@/lib/analytics/events";

interface Dot { x: number; y: number; vx: number; vy: number; r: number; o: number; od: number; }
const rand = (a: number, b: number) => Math.random() * (b - a) + a;

interface Props { onClose: () => void; }

const ICONS_ES = [
  { src: "/aboutme-01.svg", label: "Veo",      desc: "Observo antes de diseñar" },
  { src: "/aboutme-02.svg", label: "Observo",  desc: "Escucho lo que no se dice" },
  { src: "/aboutme-03.svg", label: "Entiendo", desc: "Conecto el problema con la solución" },
  { src: "/aboutme-04.svg", label: "Diseño",   desc: "Construyo con intención" },
];

const ICONS_EN = [
  { src: "/aboutme-01.svg", label: "See",        desc: "I observe before designing" },
  { src: "/aboutme-02.svg", label: "Observe",    desc: "I listen to what is unsaid" },
  { src: "/aboutme-03.svg", label: "Understand", desc: "I connect problem to solution" },
  { src: "/aboutme-04.svg", label: "Design",     desc: "I build with intention" },
];

export default function AboutMeModal({ onClose }: Props) {
  const locale = useLocale();
  const isES   = locale === "es";
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef   = useRef<Dot[]>([]);
  const rafRef    = useRef<number>(0);

  const handleClose = () => {
    trackAboutMeClosed();
    onClose();
  };

  // cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dotsRef.current = Array.from({ length: 60 }, () => ({
        x:  rand(0, canvas.width),
        y:  rand(0, canvas.height),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.25, 0.25),
        r:  rand(1.5, 3.5),
        o:  rand(0.4, 0.8),
        od: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,195,208,${0.28 * (1 - d / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
        dots[i].x += dots[i].vx;
        dots[i].y += dots[i].vy;
        if (dots[i].x < 0 || dots[i].x > w) dots[i].vx *= -1;
        if (dots[i].y < 0 || dots[i].y > h) dots[i].vy *= -1;
        dots[i].o += 0.004 * dots[i].od;
        if (dots[i].o > 0.8 || dots[i].o < 0.4) dots[i].od *= -1;
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,195,208,${dots[i].o})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const icons = isES ? ICONS_ES : ICONS_EN;

  const paragraphs = isES ? [
    { bold: "Viera, del verbo ver.", rest: "" },
    { bold: "", rest: "Observar antes de diseñar." },
    { bold: "", rest: "Porque entender el problema primero es parte de transformar la complejidad en algo claro, útil y accionable." },
    { bold: "", rest: "Diseño sistemas, servicios y experiencias digitales en la intersección entre diseño, operaciones y tecnología." },
  ] : [
    { bold: 'Viera, from the Spanish verb "to see."', rest: "" },
    { bold: "", rest: "Observe before designing." },
    { bold: "", rest: "Because understanding the problem first is part of transforming complexity into something clear, useful, and actionable." },
    { bold: "", rest: "I design systems, services, and digital experiences at the intersection of design, operations, and technology." },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,26,26,0.45)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg"
        style={{
          background: "#FFFCF6",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          animation: "modalIn 400ms cubic-bezier(.16,1,.3,1) forwards",
        }}
      >
        {/* Canvas partículas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none rounded-lg"
          style={{ opacity: 0.75 }}
        />

        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#00C3D0] transition-colors"
          aria-label="Cerrar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[520px]">

          {/* ── Columna izquierda — texto ── */}
          <div className="flex flex-col justify-between p-8 md:p-10 border-r border-[#E8E4DC]">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00C3D0] mb-4">
                {isES ? "Sobre mí" : "About me"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-1">
                {isES ? "Hola soy" : "Hi, I'm"}
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00C3D0] leading-tight mb-6">
                Ray Viera.
              </h2>
              <div className="w-8 h-[2px] bg-[#00C3D0] mb-6" />
              <div className="space-y-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                    {p.bold && <span className="font-semibold text-[#1a1a1a]/90">{p.bold} </span>}
                    {p.rest}
                  </p>
                ))}
              </div>
            </div>

            {/* ── Iconos interactivos ── */}
            <div className="mt-8 grid grid-cols-4 gap-2">
              {icons.map((icon) => {
                const isHovered = hoveredIcon === icon.label;
                return (
                  <div
                    key={icon.label}
                    className="flex flex-col items-center gap-2 cursor-pointer relative"
                    onMouseEnter={() => {
                      setHoveredIcon(icon.label);
                      trackAboutMeIconHovered(icon.label);
                    }}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                                   text-[9px] font-mono tracking-wide px-2 py-1 rounded z-30"
                        style={{
                          background: "#1a1a1a",
                          color: "#FFFCF6",
                          animation: "fadeInUp 150ms ease forwards",
                        }}
                      >
                        {icon.desc}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
                          style={{ background: "#1a1a1a" }}
                        />
                      </div>
                    )}

                    {/* Círculo + icono */}
                    <div
                      className="flex items-center justify-center rounded-full border transition-all duration-300"
                      style={{
                        width:       isHovered ? 52 : 40,
                        height:      isHovered ? 52 : 40,
                        borderColor: isHovered ? "#00C3D0" : "rgba(0,195,208,0.3)",
                        background:  isHovered ? "rgba(0,195,208,0.08)" : "transparent",
                        boxShadow:   isHovered ? "0 0 16px rgba(0,195,208,0.25)" : "none",
                      }}
                    >
                      <img
                        src={icon.src}
                        alt={icon.label}
                        style={{
                          width:      isHovered ? 28 : 22,
                          height:     isHovered ? 28 : 22,
                          transition: "all 300ms ease",
                        }}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className="font-mono tracking-wide uppercase transition-all duration-300"
                      style={{
                        fontSize:   isHovered ? "11px" : "10px",
                        color:      isHovered ? "#00C3D0" : "rgba(26,26,26,0.5)",
                        fontWeight: isHovered ? 600 : 400,
                      }}
                    >
                      {icon.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Columna derecha — Photo Reveal ── */}
          <div className="relative min-h-[360px] md:min-h-0 rounded-r-lg overflow-hidden">
            <PhotoReveal
              front="/profile-01.jpg"
              back="/profile-02.png"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}