"use client";

// components/how-i-think/systemic-design/EcosystemCube.tsx
//
// Cubo individual del racimo. CSS 3D real (transform-style: preserve-3d).
//
// SEXTA VUELTA — fix de UX del spotlight de "Ver":
// El bug del "efecto horrible" al pasar el mouse era que el MISMO elemento
// que detectaba el hover era el que se movía al centro — al moverse, el
// mouse dejaba de estar encima, se disparaba mouseLeave, volvía a su sitio,
// el mouse volvía a estar encima, mouseEnter de nuevo... parpadeo infinito.
//
// Fix: el cubo con `staticFront` es un CLON puramente visual (pointer-events
// none, sin listeners) que EcosystemCanvas.tsx renderiza aparte, ya
// centrado, cuando hay un elemento en spotlight. El cubo "real" (el que
// detecta el hover) nunca se mueve de su sitio — solo se atenúa como sus
// vecinos mientras el clon existe. `staticFront` además fuerza rotación
// 0/0/0 (cara del nombre siempre de frente, nunca una rotación congelada al
// azar) y no lleva ni el giro continuo ni el tag de respaldo (ya no hace
// falta, el nombre siempre se lee).

import { useEffect, useState } from "react";

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface EcosystemCubeProps {
  size: number; // px
  x: number; // % del canvas
  y: number; // % del canvas
  scale: number;
  opacity: number;
  zIndex: number;
  rotation: Rotation;
  /**
   * 0 = congelado (pausa el giro y la flotación idle — usado por "resultado").
   * Cualquier valor > 0 = animando normalmente. Señal binaria, no controla
   * amplitud (eso quedó fijo al pasar la deriva a @keyframes CSS puro).
   */
  driftIntensity: number;
  /** Nombre visible del elemento, va en la cara frontal. */
  label?: string;
  isDecorative?: boolean;
  /** Solo aplica si isDecorative. "high" = mismo color/opacidad que un cubo con contenido, para mezclarse. */
  intensity?: "low" | "high";
  isHovered?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  onSelect?: () => void;
  isClickable?: boolean;
  /** Suprime el tag negro de hover — se usa en Entender, donde el hover ya despliega la card completa, el tag sería redundante. */
  suppressHoverTag?: boolean;
  /**
   * Clon estático para el spotlight: ignora `rotation`, fuerza 0/0/0 (cara
   * del nombre siempre de frente), no gira, no tiene hover/click, sin tag.
   * Puramente decorativo — EcosystemCanvas.tsx lo renderiza aparte del
   * cubo real que detecta el mouse.
   */
  staticFront?: boolean;
  /**
   * Solo con staticFront: posición/escala de PARTIDA (donde vive el cubo
   * real), para animar el viaje hacia el centro en vez de aparecer ya
   * instalado ahí. Si se omiten, nace directo en destino (sin viaje).
   */
  fromX?: number;
  fromY?: number;
  fromScale?: number;
  /**
   * SEGUNDA VUELTA — se reemplaza el mecanismo de órbita anterior (que
   * animaba left/top vía @keyframes) por este flag más simple. Cuando es
   * true: el cubo NO se auto-posiciona (nada de left/top, nada de
   * transform de centrado, nada de clase ecosystem-float) — un pivote
   * externo en EcosystemCanvas.tsx lo envuelve y lo posiciona por completo
   * usando `transform` (compositor, no layout). El motivo del cambio:
   * animar left/top fuerza recálculo de layout en cada frame, y combinado
   * con las capas 3D anidadas (preserve-3d) de cada cubo, producía
   * corrupciones de pintura visibles (bloques sólidos, cubos deformes) —
   * el resto del proyecto SIEMPRE animó transform, nunca left/top, por
   * algo. La órbita ahora sigue esa misma regla.
   */
  externalPosition?: boolean;
  /**
   * Duración del desplazamiento left/top (ms). Default 600 = comportamiento
   * actual en todas las pantallas. La convergencia de Resultado lo eleva a
   * ~1000 para un gesto coordinado.
   */
  transitionDurationMs?: number;
  /** Retraso escalonado del desplazamiento (ms). Default 0 = sin desfase. */
  transitionDelayMs?: number;
}

export default function EcosystemCube({
  size,
  x,
  y,
  scale,
  opacity,
  zIndex,
  rotation,
  driftIntensity,
  label,
  isDecorative = false,
  intensity = "low",
  isHovered = false,
  onHoverChange,
  onSelect,
  isClickable = false,
  suppressHoverTag = false,
  staticFront = false,
  fromX,
  fromY,
  fromScale,
  externalPosition = false,
  transitionDurationMs = 600,
  transitionDelayMs = 0,
}: EcosystemCubeProps) {
  const [anim] = useState(() => ({
    spinDuration: 7 + Math.random() * 8,
    spinDelay: -Math.random() * 9,
    floatDuration: 4 + Math.random() * 4,
    floatDelay: -Math.random() * 6,
  }));

  // Viaje del clon: nace en (fromX, fromY, fromScale) — el sitio y tamaño
  // del cubo real — y en el siguiente frame se anima hacia (x, y, 1). Si no
  // se pasan coordenadas de partida, nace directo en destino (sin viaje).
  const [travel, setTravel] = useState(() => ({
    x: fromX ?? x,
    y: fromY ?? y,
    scale: fromScale ?? 1,
  }));

  useEffect(() => {
    if (!staticFront) return;
    const raf = requestAnimationFrame(() => setTravel({ x, y, scale: 1 }));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticFront]);

  const half = size / 2;
  const frozen = driftIntensity === 0 || staticFront;
  const useHighIntensity = !isDecorative || intensity === "high";
  const fillAlpha = useHighIntensity ? 0.16 : 0.09;
  const borderAlpha = useHighIntensity ? 0.55 : 0.32;
  const effectiveRotation = staticFront ? { x: 0, y: 0, z: 0 } : rotation;

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    border: `1px solid rgba(0, 195, 208, ${borderAlpha})`,
    background: `linear-gradient(135deg, rgba(0,195,208,${fillAlpha}) 0%, rgba(0,195,208,${fillAlpha * 0.4}) 100%)`,
  };

  return (
    // OUTER: posición + flotación idle (CSS puro). Preserve-3d de paso, para
    // que el perspective compartido del canvas llegue hasta abajo.
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : -1}
      aria-label={label}
      onClick={isClickable ? onSelect : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onSelect?.();
            }
          : undefined
      }
      onMouseEnter={staticFront ? undefined : () => onHoverChange?.(true)}
      onMouseLeave={staticFront ? undefined : () => onHoverChange?.(false)}
      // Táctil SOLO mobile: el tap fija el descubrimiento de hover (los
      // handlers de mouse no existen en touch). No afecta a desktop/mouse.
      // El fondo del canvas limpia el estado al tocar fuera del cubo.
      onTouchStart={
        staticFront
          ? undefined
          : (e) => {
              e.stopPropagation();
              onHoverChange?.(true);
            }
      }
      className={`absolute select-none outline-none ${!staticFront && !externalPosition ? "ecosystem-float" : ""}`}
      style={{
        ...(externalPosition
          ? {}
          : { left: `${staticFront ? travel.x : x}%`, top: `${staticFront ? travel.y : y}%` }),
        width: size,
        height: size,
        zIndex,
        cursor: isClickable ? "pointer" : "default",
        pointerEvents: staticFront ? "none" : "auto",
        transformStyle: "preserve-3d",
        transform: staticFront || externalPosition ? "translate(-50%, -50%)" : undefined,
        animationDuration: `${anim.floatDuration}s`,
        animationDelay: `${anim.floatDelay}s`,
        animationPlayState: frozen ? "paused" : "running",
        transitionProperty: staticFront ? "left, top, opacity" : "left, top",
        transitionDuration: staticFront
          ? "0.6s, 0.6s, 0.3s"
          : `${transitionDurationMs}ms, ${transitionDurationMs}ms`,
        transitionTimingFunction: staticFront
          ? "cubic-bezier(0.22,1,0.36,1), cubic-bezier(0.22,1,0.36,1), ease-out"
          : "cubic-bezier(0.22,1,0.36,1), cubic-bezier(0.22,1,0.36,1)",
        ...(staticFront ? {} : { transitionDelay: `${transitionDelayMs}ms` }),
      }}
    >
      {/* ESCALA/OPACIDAD (hover, cambio de paso) — preserve-3d de paso, sin esto se aplana todo lo de abajo */}
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${staticFront ? scale * travel.scale : scale})`,
          opacity,
          transitionProperty: "transform, opacity",
          transitionDuration: staticFront ? "0.6s, 0.3s" : "0.4s, 0.5s",
          transitionTimingFunction: staticFront
            ? "cubic-bezier(0.22,1,0.36,1), ease-out"
            : "ease-out, ease-out",
          ...(staticFront ? {} : { transitionDelay: `${transitionDelayMs}ms` }),
          filter: isHovered && !isDecorative && !staticFront ? "drop-shadow(0 0 18px rgba(0,195,208,0.45))" : "none",
        }}
      >
        {/* INCLINACIÓN propia del cubo (para que no se vea en grilla). En staticFront, siempre 0/0/0. */}
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${effectiveRotation.x}deg) rotateY(${effectiveRotation.y}deg) rotateZ(${effectiveRotation.z}deg)`,
          }}
        >
          {/* GIRO continuo — @keyframes puro. staticFront no lo lleva (queda fijo). */}
          <div
            className={`relative h-full w-full ${staticFront ? "" : "ecosystem-spin"}`}
            style={{
              transformStyle: "preserve-3d",
              animationDuration: `${anim.spinDuration}s`,
              animationDelay: `${anim.spinDelay}s`,
              animationPlayState: frozen ? "paused" : "running",
            }}
          >
            <div
              style={{
                ...faceStyle,
                transform: `translateZ(${half}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {label && !isDecorative && (
                <span
                  className="pointer-events-none px-1 text-center font-semibold uppercase leading-tight text-[#00636b]"
                  style={{ fontSize: Math.max(9, size * 0.11) }}
                >
                  {label}
                </span>
              )}
            </div>
            <div style={{ ...faceStyle, transform: `translateZ(-${half}px) rotateY(180deg)` }} />
            <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
            <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
            <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
            <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
          </div>
        </div>

        {/* Tag de respaldo en hover — solo para cubos NO staticFront (en staticFront
            la cara frontal ya está garantizada de frente, el tag sería redundante). */}
        {isHovered && !isDecorative && !staticFront && !suppressHoverTag && label && (
          <div
            className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1b1c1c] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.5px] text-white"
            style={{ zIndex: 100 }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
}