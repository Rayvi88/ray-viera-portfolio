"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  r: number; opacity: number; opacityDir: number;
}

interface Node {
  id: string; x: number; y: number; vx: number; vy: number;
  label: string; description: string;
}

interface Tooltip { x: number; y: number; side: "right" | "left"; }

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const TEAL           = "#00C3D0";
const BG             = "#FFFCF6";
const N_PARTICLES    = 80;
const LINK_DIST      = 150;
const NODE_LINK_DIST = 220;
const NODE_R         = 7;
const GRAB_DIST      = 180;   // radio del efecto grab
const GRAB_STRENGTH  = 0.018; // cuánto se atraen las partículas al cursor

const INIT_POS = [
  { rx: 0.2,  ry: 0.32 },
  { rx: 0.72, ry: 0.24 },
  { rx: 0.5,  ry: 0.54 },
  { rx: 0.22, ry: 0.74 },
  { rx: 0.78, ry: 0.72 },
];

export default function InteractiveHero() {
  const t = useTranslations("interactiveHero");

  const ITEMS = [
    { id: "procesos",     label: t("items.procesos.title"),     description: t("items.procesos.description") },
    { id: "uxui",         label: t("items.uxui.title"),         description: t("items.uxui.description") },
    { id: "estrategia",   label: t("items.estrategia.title"),   description: t("items.estrategia.description") },
    { id: "colaboracion", label: t("items.colaboracion.title"), description: t("items.colaboracion.description") },
    { id: "innovacion",   label: t("items.innovacion.title"),   description: t("items.innovacion.description") },
  ];

  const sectionRef   = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const pausedRef    = useRef(false);
  const pauseTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef     = useRef<Node[]>([]);
  const activeRef    = useRef<string | null>(null);
  const dimsRef      = useRef({ w: 0, h: 0 });
  // posición del cursor relativa al canvas
  const mouseRef     = useRef<{ x: number; y: number } | null>(null);

  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [tooltip, setTooltip]       = useState<Tooltip | null>(null);

  // ── inicializar escena ──────────────────────────────────────────────────────
  const initScene = useCallback((w: number, h: number) => {
    particlesRef.current = Array.from({ length: N_PARTICLES }, () => ({
      x: rand(0, w), y: rand(0, h),
      vx: rand(-0.15, 0.15), vy: rand(-0.15, 0.15),
      r: rand(1.5, 3),
      opacity: rand(0.35, 0.75),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    nodesRef.current = ITEMS.map((item, i) => ({
      id: item.id,
      x: INIT_POS[i].rx * w,
      y: INIT_POS[i].ry * h,
      vx: rand(-0.12, 0.12),
      vy: rand(-0.12, 0.12),
      label: item.label,
      description: item.description,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── resize ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    const measure = () => {
      const w   = section.offsetWidth;
      const h   = section.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      dimsRef.current = { w, h };
      initScene(w, h);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    return () => ro.disconnect();
  }, [initScene]);

  // ── loop ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { w, h } = dimsRef.current;
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      if (!pausedRef.current) {
        for (const p of particlesRef.current) {
          // efecto grab — atracción suave hacia el cursor
          if (mouse) {
            const dx   = mouse.x - p.x;
            const dy   = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < GRAB_DIST && dist > 0) {
              const force = (1 - dist / GRAB_DIST) * GRAB_STRENGTH;
              p.vx += dx * force;
              p.vy += dy * force;
              // limitar velocidad máxima
              const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
              if (speed > 0.8) { p.vx = (p.vx / speed) * 0.8; p.vy = (p.vy / speed) * 0.8; }
            }
          }

          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.opacity += 0.004 * p.opacityDir;
          if (p.opacity > 0.75 || p.opacity < 0.35) p.opacityDir *= -1;
        }

        for (const n of nodesRef.current) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 60 || n.x > w - 60) n.vx *= -1;
          if (n.y < 40 || n.y > h - 40) n.vy *= -1;
        }
      }

      const pts = particlesRef.current;

      // líneas grab — más opacas cerca del cursor
      if (mouse) {
        for (const p of pts) {
          const dx   = mouse.x - p.x;
          const dy   = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GRAB_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,195,208,${0.55 * (1 - dist / GRAB_DIST)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      // líneas partícula-partícula
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,195,208,${0.3 * (1 - d / LINK_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // líneas nodo-partícula
      for (const n of nodesRef.current) {
        for (const p of pts) {
          const dx = n.x - p.x;
          const dy = n.y - p.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < NODE_LINK_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,195,208,${0.22 * (1 - d / NODE_LINK_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      // partículas
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,195,208,${p.opacity})`;
        ctx.fill();
      }

      // nodos
      for (const n of nodesRef.current) {
        const isActive = activeRef.current === n.id;
        const r = isActive ? NODE_R * 2.6 : NODE_R;

        if (isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 10, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,195,208,0.15)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = TEAL;
        ctx.fill();

        ctx.font      = isActive ? "bold 12px ui-monospace,monospace" : "11px ui-monospace,monospace";
        ctx.fillStyle = isActive ? TEAL : "rgba(26,26,26,0.5)";
        ctx.fillText(n.label, n.x + r + 9, n.y + 4);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── pausar movimiento autónomo al interactuar ───────────────────────────────
  const triggerPause = useCallback(() => {
    pausedRef.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => { pausedRef.current = false; }, 3000);
  }, []);

  // ── hit-test ────────────────────────────────────────────────────────────────
  const hitNode = useCallback((clientX: number, clientY: number): Node | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    for (const n of nodesRef.current) {
      const dx = n.x - x; const dy = n.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < 24) return n;
    }
    return null;
  }, []);

  const getTooltipSide = useCallback((n: Node): "right" | "left" => {
    return n.x > dimsRef.current.w * 0.6 ? "left" : "right";
  }, []);

  // ── eventos del canvas ──────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // actualizar posición del cursor para el efecto grab
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    const node = hitNode(e.clientX, e.clientY);
    if (node) {
      activeRef.current = node.id;
      setActiveNode(node.id);
      setTooltip({ x: node.x, y: node.y, side: getTooltipSide(node) });
      triggerPause();
    } else {
      activeRef.current = null;
      setActiveNode(null);
      setTooltip(null);
    }
  }, [hitNode, getTooltipSide, triggerPause]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null; // quitar grab al salir
    activeRef.current = null;
    setActiveNode(null);
    setTooltip(null);
  }, []);

  const activeItem = ITEMS.find((i) => i.id === activeNode);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center bg-[#FFFCF6] overflow-hidden"
      style={{ cursor: activeNode ? "pointer" : "crosshair" }}
    >
      {/* Título */}
      <div className="relative z-10 text-center max-w-4xl pt-20 pb-6 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          {t("headlineStart")}{" "}
          <span className="text-[#00C3D0]">{t("headlineHighlight")}</span>
        </h2>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: BG, width: "100%", height: "100%" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Tooltip relativo al nodo activo */}
      {activeItem && tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            top:   tooltip.y,
            left:  tooltip.side === "right" ? tooltip.x + 32 : "auto",
            right: tooltip.side === "left"
              ? dimsRef.current.w - tooltip.x + 32
              : "auto",
            transform: "translateY(-50%)",
            animation: "fadeIn 180ms ease forwards",
          }}
        >
          <div className="bg-[#FFFCF6] border-l-2 border-[#00C3D0] px-5 py-4 shadow-lg w-64">
            <h3 className="text-sm font-bold text-[#00C3D0] mb-1">
              {activeItem.label}
            </h3>
            <p className="text-sm text-[#1a1a1a]/65 leading-relaxed">
              {activeItem.description}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-50%) translateX(-4px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </section>
  );
}