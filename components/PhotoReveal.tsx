"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  front: string; // imagen debajo (profile-01.jpg — blanco y negro)
  back: string;  // imagen encima (profile-02.png — con pinturas)
  alt?: string;
}

export default function PhotoReveal({ front, back, alt = "Ray Viera" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // % de izquierda a derecha
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false); // si el usuario ya interactuó

  const getPercent = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(Math.max((x / rect.width) * 100, 2), 98);
  }, []);

  // Mouse
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!touched) setTouched(true);
    setPosition(getPercent(e.clientX));
  }, [getPercent, touched]);

  const handleMouseDown = useCallback(() => setDragging(true), []);
  const handleMouseUp   = useCallback(() => setDragging(false), []);

  // Touch
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touched) setTouched(true);
    setPosition(getPercent(e.touches[0].clientX));
  }, [getPercent, touched]);

  // Animación de hint al montar — oscila una vez para mostrar que es interactivo
  useEffect(() => {
    if (touched) return;
    let frame: number;
    let start: number | null = null;
    const duration = 900;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = (ts - start) / duration;
      if (progress < 1) {
        // oscila de 50 → 35 → 65 → 50
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
      onTouchStart={() => setTouched(true)}
    >
      {/* Imagen base — profile-01.jpg (blanco y negro con texto curvo) */}
      <img
        src={back}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      {/* Imagen encima — profile-02.png (con pinturas) — recortada por clip */}
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
        {/* Handle circular */}
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

      {/* Hint texto — desaparece al interactuar */}
      {!touched && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2
                     text-[9px] font-mono tracking-[0.15em] uppercase
                     px-3 py-1.5 rounded
                     pointer-events-none transition-opacity duration-500"
          style={{ background: "rgba(0,195,208,0.85)", color: "#FFFCF6" }}
        >
          drag to reveal
        </div>
      )}
    </div>
  );
}