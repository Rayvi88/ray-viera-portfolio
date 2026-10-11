"use client";

import { useState } from "react";
import HowIThinkModal from "./HowIThinkModal";
import PhotoReveal from "@/components/PhotoReveal";
import { FOCUS_RING, TRANSITION_MICRO } from "@/components/interaction/tokens";

interface AboutParagraph { bold: string; rest: string; }
interface AboutIcon { key: string; src: string; label: string; desc: string; }

interface HowIThinkInteractiveProps {
  aboutLabel: string;
  greeting: string;
  paragraphs: AboutParagraph[];
  icons: AboutIcon[];
}

// Acceso secundario a About me. Ecosistemas ya es el contenido principal
// en flujo (SystemicDesignExperience en HowIThink.tsx); esta pill única
// abre el contenido About me — antes inline — dentro del modal genérico
// existente, que ya aporta cierre accesible (Escape, scroll-lock,
// backdrop y X). Sin botones duplicados ni nuevos diálogos.
export default function HowIThinkInteractive({
  aboutLabel,
  greeting,
  paragraphs,
  icons,
}: HowIThinkInteractiveProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsAboutOpen(true)}
          className={`inline-flex items-center px-4 py-2 min-h-[44px] text-[10px] sm:text-xs font-medium tracking-[0.1em] uppercase rounded-full bg-[#1a1a1a] text-[#FFFCF6] ${TRANSITION_MICRO} hover:bg-[#00C3D0] ${FOCUS_RING}`}
        >
          {aboutLabel}
        </button>
      </div>

      <HowIThinkModal
        isOpen={isAboutOpen}
        title={aboutLabel}
        onClose={() => setIsAboutOpen(false)}
      >
        {/* ── Composición original de dos columnas: texto e iconos a la
            izquierda, PhotoReveal a la derecha (ver HEAD:HowIThink.tsx).
            Mismas clases, assets y showHandle; solo cambia el contexto
            (dentro del modal en vez de la página). ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-stretch">
          {/* ── Columna izquierda — texto ── */}
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] leading-tight mb-1">
              {greeting}
            </h3>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#00C3D0] leading-tight mb-6">
              Ray Viera.
            </h3>

            <div className="w-8 h-[2px] bg-[#00C3D0] mb-6" />

            <div className="space-y-3 mb-10">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-[#1a1a1a]/70 leading-relaxed">
                  {p.bold && <span className="font-semibold text-[#1a1a1a]/90">{p.bold} </span>}
                  {p.rest}
                </p>
              ))}
            </div>

            {/* ── Flujo de 4 pasos — cuadrícula 2×2 compacta dentro del modal:
                la fila de 4 del inline original no cabe en la media columna
                del modal; se conservan bordes, colores, hover y contenido. ── */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
              {icons.map((icon) => (
                <div key={icon.key} className="group flex flex-col items-center justify-center text-center gap-1.5 px-2.5 py-3 rounded-2xl border border-[#E8E4DC] bg-white/50 w-full h-full min-w-0 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00C3D0]/50 hover:bg-white hover:shadow-md">

                  {/* Icon */}
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-[#00C3D0]/10 transition-transform duration-300 ease-out group-hover:scale-105">
                    <img
                      src={icon.src}
                      alt={icon.label}
                      className="w-5 h-5"
                    />
                  </div>

                  {/* Label */}
                  <span className="text-[11px] sm:text-xs font-bold text-[#1a1a1a] leading-snug">
                    {icon.label}
                  </span>

                  {/* Description */}
                  <span className="text-[10px] text-gray-500 leading-snug">
                    {icon.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Columna derecha — Photo Reveal, sin guías ── */}
          <div className="relative w-full h-[495px] sm:h-[530px] lg:h-auto lg:min-h-[495px] rounded-2xl overflow-hidden">
            <PhotoReveal
              front="/profile-01.jpg"
              back="/profile-02.png"
              showHandle={false}
            />
          </div>
        </div>
      </HowIThinkModal>
    </>
  );
}
