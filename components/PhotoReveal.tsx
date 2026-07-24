"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { trackAboutMePhotoReveal } from "@/lib/analytics/events";

interface Props {
  front: string;
  back: string;
  alt?: string;
}

export default function PhotoReveal({ front, back, alt = "Ray Viera" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);

  const getPercent = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(Math.max((x / rect.width) * 100, 2), 98);
  }, []);

  const handleFirstInteraction = useCallback(() => {
    if (!touched) {
      setTouched(true);
      trackAboutMePhotoReveal();
    }
  }, [touched]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleFirstInteraction();
    setPosition(getPercent(e.clientX));
  }, [getPercent, handleFirstInteraction]);

  const handleMouseDown = useCallback(() => setDragging(true), []);
  const handleMouseUp   = useCallback(() => setDragging(false), []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleFirstInteraction();
    setPosition(getPercent(e.touches[0].clientX));
  }, [getPercent, handleFirstInteraction]);

  // Animación hint al montar
  useEffect(() => {
    if (touched) return;
    let frame: number;
    let start: number | null = null;
    const duration = 900;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = (ts - start) / duration;
      if (progress < 1) {
        const angle = progress * Math.PI * 2;
        setPosition(50 + Math.sin(angle) * 15);
        frame = requestAnimationFrame(animate);
      } else {
        setPosition(50);
      }
    };

    const timer = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 800);

    return () => { clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [touched]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden"
      style={{ cursor: dragging ? "grabbing" : "col-resize" }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={() => handleFirstInteraction()}
    >
      {/* Imagen base */}
      <img
        src={back}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      {/* Imagen encima — recortada */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={front}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Línea divisoria */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/70"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-8 h-8 rounded-full bg-white shadow-lg
                     flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H2M2 8l2-2M2 8l2 2" stroke="#00C3D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 8h3M14 8l-2-2M14 8l-2 2" stroke="#00C3D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Hint */}
      {!touched && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2
                     text-[9px] font-mono tracking-[0.15em] uppercase
                     px-3 py-1.5 rounded pointer-events-none"
          style={{ background: "rgba(0,195,208,0.85)", color: "#FFFCF6" }}
        >
          drag to reveal
        </div>
      )}
    </div>
  );
}