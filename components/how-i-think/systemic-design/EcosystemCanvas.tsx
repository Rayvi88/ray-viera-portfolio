"use client";

// components/how-i-think/systemic-design/EcosystemCanvas.tsx
//
// Racimo orgánico de cubos (8 con contenido + decorativos). Explorar, Ver y
// Detectar ya están confirmados en pantalla; Entender/Organizar/Resultado
// leen del mismo modelo de datos pero aún no se han probado visualmente.

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import EcosystemCube from "./EcosystemCube";
import EntenderCard from "./EntenderCard";
import OrganizarCard from "./OrganizarCard";
import {
  ECOSYSTEM_ELEMENTS,
  DECORATIVE_CUBES,
  DETECTAR_CONNECTIONS,
  DETECTAR_INITIAL_DELAY_MS,
  DETECTAR_SHOW_MS,
  DETECTAR_GAP_MS,
  getElementVisualState,
  getDecorativeVisualState,
  SPOTLIGHT_SIZE_PX,
  SATELLITE_SIZE_PX,
  HERO_CUBE_SIZE_PX,
  ORBIT_DURATION_SEC,
  ORBIT_RADIUS_PX,
  type EcosystemStep,
} from "./ecosystemData";

interface EcosystemCanvasProps {
  step: EcosystemStep;
  /** Se usa en pasos "entender" / "organizar" / "resultado". No aplica en Explorar. */
  onSelectElement?: (id: string) => void;
}

// Transición Organizar → Resultado: convergencia previa a la órbita.
// Duración del deslizamiento por cubo + desfase escalonado por índice +
// margen de asentamiento antes de montar los pivotes.
const RESULT_CONVERGE_DURATION_MS = 1000;
const RESULT_CONVERGE_STAGGER_MS = 60;
const RESULT_CONVERGE_SETTLE_MS = 250;

export default function EcosystemCanvas({ step, onSelectElement }: EcosystemCanvasProps) {
  const t = useTranslations("howIThinkPage.ecosystem.elements");
  const tEco = useTranslations("howIThinkPage.ecosystem");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Al cambiar de paso se limpia selección — evita que quede una card
  // "fantasma" abierta si el usuario cambia de paso desde el sidebar
  // mientras algo estaba seleccionado.
  useEffect(() => {
    setSelectedId(null);
  }, [step]);

  // Transición Organizar → Resultado en dos fases ("converge" y "orbit").
  // En "converge" los cubos siguen en left/top % y se deslizan hasta su
  // ranura del anillo; en "orbit" se montan los pivotes (pausados en el
  // mismo ángulo, intercambio sin salto) y arranca la rotación.
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasDims, setCanvasDims] = useState({ w: 0, h: 0 });
  const [resultPhase, setResultPhase] = useState<"converge" | "orbit">("converge");
  const [orbitRunning, setOrbitRunning] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    if (step !== "resultado") return;
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setCanvasDims((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [step]);

  useEffect(() => {
    if (step !== "resultado") {
      // Sincronización intencional con el cambio de paso (no derivable del render).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResultPhase("converge");
      setOrbitRunning(false);
      setHeroIn(false);
      return;
    }
    // Reinicio de la máquina de fases al (re)entrar a Resultado.
    setResultPhase("converge");
    setOrbitRunning(false);
    setHeroIn(false);
    if (canvasDims.w === 0 || canvasDims.h === 0) return;
    const total =
      RESULT_CONVERGE_DURATION_MS +
      (ECOSYSTEM_ELEMENTS.length - 1) * RESULT_CONVERGE_STAGGER_MS +
      RESULT_CONVERGE_SETTLE_MS;
    const t = setTimeout(() => setResultPhase("orbit"), total);
    return () => clearTimeout(t);
  }, [step, canvasDims.w, canvasDims.h]);

  useEffect(() => {
    if (step !== "resultado" || resultPhase !== "orbit") return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setOrbitRunning(true))
    );
    const t = setTimeout(() => setHeroIn(true), 250);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [step, resultPhase]);

  // Radio orbital responsive SOLO mobile: en desktop la fórmula conserva
  // ORBIT_RADIUS_PX (min(w,h)/2-46 >= 260), en canvas estrechos se deriva
  // del lado menor para que el anillo quepa completo. Ángulos, delays y
  // rotación intactos; converge y pivotes usan el mismo valor (sin saltos).
  const orbitRadiusPx = (() => {
    const { w, h } = canvasDims;
    if (w === 0 || h === 0) return ORBIT_RADIUS_PX;
    return Math.max(80, Math.min(ORBIT_RADIUS_PX, Math.min(w, h) / 2 - 46));
  })();

  // Hero/spotlight proporcionales SOLO en canvas estrechos (<480px). En
  // desktop se usan las constantes originales sin cambios.
  // Racimo proporcional SOLO en canvas estrechos (<480px): factor 0.82
  // sobre el tamaño base para reducir solapamientos y recortes. En desktop
  // el factor es 1 (idéntico a antes). No toca posiciones, radio orbital,
  // hero, spotlight, delays ni rotación.
  const narrowCanvas = canvasDims.w > 0 && canvasDims.w < 480;
  const clusterScale = narrowCanvas ? 0.82 : 1;
  const heroSizePx = narrowCanvas
    ? Math.round(Math.min(HERO_CUBE_SIZE_PX, canvasDims.w * 0.42))
    : HERO_CUBE_SIZE_PX;
  const spotlightSizePx = narrowCanvas
    ? Math.round(Math.min(SPOTLIGHT_SIZE_PX, canvasDims.w * 0.5))
    : SPOTLIGHT_SIZE_PX;

  // Ranura del anillo a tiempo cero para el cubo `index`: el mismo ángulo
  // que su pivote tiene al montar (delay = -(index/N) * duración → progreso
  // index/N → ángulo index/N * 360°). Radio en px convertido a % con las
  // dimensiones reales del canvas.
  const resultSlot = (index: number) => {
    const { w, h } = canvasDims;
    if (w === 0 || h === 0) return null;
    const angle = (index / ECOSYSTEM_ELEMENTS.length) * Math.PI * 2;
    return {
      x: 50 + ((orbitRadiusPx * Math.cos(angle)) / w) * 100,
      y: 50 + ((orbitRadiusPx * Math.sin(angle)) / h) * 100,
    };
  };

  // El hover como interacción libre (mueve al centro, etc.) solo existe en
  // Ver. En Entender/Organizar el hover SÍ está habilitado pero con un
  // propósito distinto: zoom leve + resaltar relacionados, sin desplegar
  // la card (eso es trabajo del click). Detectar es observación pasiva,
  // sin hover. Comportamiento idéntico entre Entender y Organizar,
  // confirmado — solo cambia el contenido de la card.
  const isDetailStep = step === "entender" || step === "organizar";
  const hoverEnabled = step === "explorar" || step === "ver" || isDetailStep;
  const isVerSpotlightActive = step === "ver" && hoveredId !== null;

  // ENTENDER/ORGANIZAR — el foco activo es el seleccionado (click) si
  // existe; si no, el hover-preview. El hover deja de tener efecto de
  // "foco" en cuanto hay algo seleccionado (el click manda).
  const detailFocusId = isDetailStep ? (selectedId ?? hoveredId) : null;
  const detailFocusElement = detailFocusId
    ? ECOSYSTEM_ELEMENTS.find((e) => e.id === detailFocusId) ?? null
    : null;
  const detailRelatedIds = detailFocusElement?.relatedIds ?? [];

  // DETECTAR — QUINTA VUELTA tras feedback explícito ("NO, NO Y NO... todas
  // las conexiones deben aparecer así, solas"): ya no se acumulan las 3 a
  // la vez. Se muestra UNA sola conexión (línea + card) por vez, en ciclo:
  // aparece, se queda DETECTAR_SHOW_MS, desaparece, pausa breve, aparece la
  // siguiente — y así sucesivamente en loop mientras el usuario esté en
  // este paso. Se reinicia si se sale y se vuelve a entrar.
  const [visibleConnectionIndex, setVisibleConnectionIndex] = useState<number | null>(null);

  useEffect(() => {
    if (step !== "detectar") {
      setVisibleConnectionIndex(null);
      return;
    }
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function showAt(index: number) {
      if (cancelled) return;
      setVisibleConnectionIndex(index);
      timeouts.push(
        setTimeout(() => {
          if (cancelled) return;
          setVisibleConnectionIndex(null);
          timeouts.push(
            setTimeout(() => {
              if (cancelled) return;
              showAt((index + 1) % DETECTAR_CONNECTIONS.length);
            }, DETECTAR_GAP_MS)
          );
        }, DETECTAR_SHOW_MS)
      );
    }

    timeouts.push(setTimeout(() => showAt(0), DETECTAR_INITIAL_DELAY_MS));
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [step]);

  const visibleConnection =
    visibleConnectionIndex !== null ? DETECTAR_CONNECTIONS[visibleConnectionIndex] : null;
  const visibleFrom = visibleConnection
    ? ECOSYSTEM_ELEMENTS.find((e) => e.id === visibleConnection.fromId)
    : null;
  const visibleTo = visibleConnection
    ? ECOSYSTEM_ELEMENTS.find((e) => e.id === visibleConnection.toId)
    : null;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{ perspective: 1600 }}
      onClick={(e) => {
        // Clickear el fondo (no un cubo) cierra la card de Entender. El
        // check e.target === e.currentTarget distingue "fondo vacío" de
        // "un cubo hijo", sin necesitar stopPropagation en los cubos.
        if (e.target === e.currentTarget && selectedId !== null) {
          setSelectedId(null);
        }
      }}
      onTouchStart={() => {
        // En táctil, tocar el fondo libera el descubrimiento fijado por tap.
        // Los cubos detienen la propagación en su propio onTouchStart.
        setHoveredId(null);
      }}
    >
      {/*
        Keyframes globales del racimo — una sola declaración para todos los
        cubos (cada cubo solo varía animation-duration/delay vía inline
        style). Rotación continua infinita + un bob vertical sutil, ambos
        en CSS, nada de JS recalculando por frame.
      */}
      <style>{`
        @keyframes ecosystem-spin {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to   { transform: rotateX(360deg) rotateY(360deg); }
        }
        .ecosystem-spin {
          animation-name: ecosystem-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes ecosystem-float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50%      { transform: translate(-50%, -50%) translateY(-8px); }
        }
        .ecosystem-float {
          position: absolute;
          animation-name: ecosystem-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes ecosystem-reveal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ecosystem-line-flow {
          to { stroke-dashoffset: -2.1; }
        }
        /*
          Clase FIJA, sin alternar entre variantes por JS — solo una
          conexión existe a la vez ahora, así que no hace falta distinguir
          "activa" vs "asentada". Esto también evita el problema anterior de
          reemplazar el string de "animation" completo cada vez que cambiaba
          el estado, que sospecho interrumpía la animación de flujo.
        */
        .ecosystem-detectar-line {
          animation: ecosystem-reveal 0.5s ease-out, ecosystem-line-flow 3s linear infinite;
        }
        .ecosystem-detectar-card {
          animation: ecosystem-reveal 0.5s ease-out;
        }
        /*
          Órbita real para las 8 unidades de Resultado — SEGUNDA VUELTA:
          antes animaba left/top (forzaba recálculo de layout cada frame,
          combinado con las capas 3D anidadas de cada cubo producía
          corrupciones de pintura — bloques sólidos, cubos deformes). Ahora
          es un pivote que rota vía transform (compositor, no layout),
          igual que TODA otra animación de este proyecto. El cubo va
          adentro, trasladado a un radio fijo en px — ver ORBIT_RADIUS_PX
          en ecosystemData.ts y el render en el map de ECOSYSTEM_ELEMENTS.
        */
        @keyframes ecosystem-orbit-pivot {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ecosystem-orbit-pivot {
          animation-name: ecosystem-orbit-pivot;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {DECORATIVE_CUBES.map((cube) => {
        const vis = getDecorativeVisualState(cube, step, isVerSpotlightActive || detailFocusId !== null);
        return (
          <EcosystemCube
            key={cube.id}
            size={cube.baseSize * clusterScale}
            x={vis.x}
            y={vis.y}
            scale={vis.scale}
            opacity={vis.opacity * cube.baseOpacity}
            zIndex={Math.round(cube.baseSize / 4)}
            rotation={cube.rotation}
            driftIntensity={vis.driftIntensity}
            isDecorative
            intensity={cube.intensity}
          />
        );
      })}

      {ECOSYSTEM_ELEMENTS.map((el, index) => {
        const isSelected = isDetailStep && selectedId === el.id;
        const isOtherSelected = isDetailStep && selectedId !== null && selectedId !== el.id;
        // En Entender/Organizar, el hover como "foco visual" solo cuenta si
        // nada está seleccionado — si ya hay un click activo, el hover en
        // otro cubo no debe pisarle el protagonismo a la selección.
        const hoverCountsAsFocus = !isDetailStep || selectedId === null;
        const isHovered = hoverEnabled && hoveredId === el.id && hoverCountsAsFocus;
        const isOtherHovered = hoverEnabled && hoveredId !== null && hoveredId !== el.id && hoverCountsAsFocus;
        const isRelatedToFocus =
          isDetailStep && detailFocusId !== null && detailFocusId !== el.id && detailRelatedIds.includes(el.id);
        const vis = getElementVisualState(el, step, {
          isHovered,
          isOtherHovered,
          isSelected,
          isOtherSelected,
          isRelatedToFocus,
        });

        // Fase "converge" de Resultado: mismo sistema left/top % de
        // Organizar, destino = ranura del anillo a tiempo cero. Escala y
        // zIndex ya van en valores finales de satélite para que el
        // intercambio posterior al pivote no salte.
        const isResultado = step === "resultado";
        const slot = isResultado ? resultSlot(index) : null;
        const convergeActive = isResultado && resultPhase === "converge";

        const cubeNode = (
          <EcosystemCube
            size={el.baseSize * clusterScale}
            x={convergeActive && slot ? slot.x : vis.x}
            y={convergeActive && slot ? slot.y : vis.y}
            scale={vis.scale}
            opacity={vis.opacity}
            zIndex={vis.zIndex}
            rotation={el.rotation}
            driftIntensity={vis.driftIntensity}
            label={t(`${el.id}.label`)}
            isHovered={isHovered}
            onHoverChange={hoverEnabled ? (h) => setHoveredId(h ? el.id : null) : undefined}
            isClickable={isDetailStep}
            suppressHoverTag={isDetailStep}
            externalPosition={isResultado && !convergeActive}
            transitionDurationMs={convergeActive ? RESULT_CONVERGE_DURATION_MS : undefined}
            transitionDelayMs={convergeActive ? index * RESULT_CONVERGE_STAGGER_MS : undefined}
            onSelect={() => {
              if (isDetailStep) {
                setSelectedId((prev) => (prev === el.id ? null : el.id));
              } else {
                onSelectElement?.(el.id);
              }
            }}
          />
        );

        if (!isResultado || convergeActive) {
          return <div key={el.id}>{cubeNode}</div>;
        }

        // RESULTADO fase "orbit" — pivote pausado en el mismo ángulo de la
        // ranura al montar (intercambio sin salto) y arranque posterior vía
        // orbitRunning. Notas previas sobre transform vs left/top siguen
        // vigentes: la órbita la compone el compositor, nunca el layout.
        const delaySec = -(index / ECOSYSTEM_ELEMENTS.length) * ORBIT_DURATION_SEC;
        return (
          <div
            key={el.id}
            className="ecosystem-orbit-pivot"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 0,
              height: 0,
              zIndex: vis.zIndex,
              animationDuration: `${ORBIT_DURATION_SEC}s`,
              animationDelay: `${delaySec}s`,
              animationPlayState: orbitRunning ? "running" : "paused",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateX(${orbitRadiusPx}px)`,
              }}
            >
              {cubeNode}
            </div>
          </div>
        );
      })}

      {/*
        DETECTAR — la línea de la ÚNICA conexión visible ahora mismo. Sin
        flecha, sin dirección (confirmado en spec): una línea simple entre
        los centros de los dos cubos, con guiones fluyendo (movimiento
        constante, no es un diagrama estático).
      */}
      {step === "detectar" && visibleConnection && visibleFrom && visibleTo && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ zIndex: 35 }}
        >
          <line
            key={visibleConnection.id}
            x1={visibleFrom.baseX}
            y1={visibleFrom.baseY}
            x2={visibleTo.baseX}
            y2={visibleTo.baseY}
            stroke="#00C3D0"
            strokeWidth={0.18}
            strokeLinecap="round"
            strokeDasharray="1.2 0.9"
            className="ecosystem-detectar-line"
          />
        </svg>
      )}

      {/*
        Micro-card de la ÚNICA conexión visible — posicionada ARRIBA del
        cubo principal (el primero del par, ej. "Producto" en
        Producto↔Datos), no en el punto medio geométrico — eso hacía que se
        montara encima del texto del cubo. Color sólido distinto al vidrio
        de los cubos, para que se lea como "hallazgo", no como parte del
        material de los cubos.
      */}
      {step === "detectar" && visibleConnection && visibleFrom && visibleTo && (
        <div
          key={visibleConnection.id}
          className="ecosystem-detectar-card pointer-events-none absolute flex max-w-[72vw] items-center gap-1.5 whitespace-normal rounded-full bg-[#00C3D0] px-3 py-1.5 text-center text-white shadow-md md:max-w-none md:whitespace-nowrap"
          style={{
            left: `${visibleFrom.baseX}%`,
            top: `${visibleFrom.baseY - 14}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 36,
          }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.3px]">
            {t(`${visibleFrom.id}.label`)}
          </span>
          <span className="text-[11px] opacity-80">↔</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3px]">
            {t(`${visibleTo.id}.label`)}
          </span>
        </div>
      )}

      {/*
        Clon del spotlight de "Ver" — puramente visual (staticFront: sin
        hover, sin click, cara del nombre siempre de frente, congelado).
        Vive APARTE del cubo real de arriba para que el mouse nunca "pierda"
        el hover cuando el cubo real no se mueve de su sitio.
      */}
      {isVerSpotlightActive &&
        hoveredId &&
        (() => {
          const spotlightEl = ECOSYSTEM_ELEMENTS.find((e) => e.id === hoveredId);
          if (!spotlightEl) return null;
          return (
            <EcosystemCube
              key={`spotlight-${spotlightEl.id}`}
              size={spotlightSizePx}
              x={50}
              y={50}
              scale={1}
              opacity={1}
              zIndex={300}
              rotation={{ x: 0, y: 0, z: 0 }}
              driftIntensity={0}
              label={t(`${spotlightEl.id}.label`)}
              staticFront
              fromX={spotlightEl.baseX}
              fromY={spotlightEl.baseY}
              fromScale={(clusterScale * spotlightEl.baseSize) / spotlightSizePx}
            />
          );
        })()}

      {/*
        RESULTADO — el cubo grande central. UN solo cubo dedicado (no una
        fusión de varios decorativos superpuestos, eso se veía mal) — sigue
        girando (no se congela), representa "el negocio en sí".
      */}
      {step === "resultado" && resultPhase === "orbit" && (
        <EcosystemCube
          key="hero-cube"
          size={heroSizePx}
          x={50}
          y={50}
          scale={heroIn ? 1 : 0.9}
          opacity={heroIn ? 1 : 0}
          zIndex={20}
          rotation={{ x: 0, y: 0, z: 0 }}
          driftIntensity={1}
          label={tEco("heroLabel")}
        />
      )}

      {/*
        ENTENDER/ORGANIZAR — card de detalle. Aparece directo con hover
        (sin tag chico de por medio — ver suppressHoverTag arriba); si el
        usuario hace click, queda "pineada" y se mantiene aunque el mouse
        se vaya a otro cubo o salga del racimo, para poder leer con calma.
        Posición fija en una zona calma del canvas (no sigue al cubo, que
        varía mucho de tamaño y posición) — evita que una card de 280px se
        salga del área visible o tape el racimo entero. Mismo mecanismo
        para ambos pasos, solo cambia qué componente de card se muestra.
      */}
      {isDetailStep && detailFocusId && (
        <div
          className="absolute bottom-3 left-1/2 top-auto w-[280px] max-w-[86vw] -translate-x-1/2 md:bottom-auto md:left-[82%] md:top-1/2 md:-translate-y-1/2"
          style={{ zIndex: 400 }}
        >
          {step === "entender" ? (
            <EntenderCard
              elementId={detailFocusId as (typeof ECOSYSTEM_ELEMENTS)[number]["id"]}
              badgeIconDefault={
                ECOSYSTEM_ELEMENTS.find((e) => e.id === detailFocusId)?.badgeIconDefault ?? ""
              }
            />
          ) : (
            <OrganizarCard
              elementId={detailFocusId as (typeof ECOSYSTEM_ELEMENTS)[number]["id"]}
              badgeIconDefault={
                ECOSYSTEM_ELEMENTS.find((e) => e.id === detailFocusId)?.badgeIconDefault ?? ""
              }
            />
          )}
        </div>
      )}
    </div>
  );
}