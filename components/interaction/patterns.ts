// components/interaction/patterns.ts
//
// Patrón visual maestro: la pill "Ecosistemas" de How I Think
// (HowIThinkInteractive.tsx — FUENTE DE VERDAD, no modificar).
// Esta constante replica sus valores exactos para que Home, Atlas y Contact
// hablen el mismo lenguaje. Solo añade `justify-center` + `gap-2` para
// botones con icono. No es un segundo sistema: es la misma pill.

import { FOCUS_RING, TRANSITION_MICRO } from "./tokens";

export const ECOSYSTEM_PILL_CLASS = [
  "inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[44px]",
  "text-[10px] sm:text-xs font-medium tracking-[0.1em] uppercase rounded-full",
  "bg-transparent border-[1.5px] border-[#1a1a1a] text-[#1a1a1a]",
  TRANSITION_MICRO,
  "hover:bg-[#00C3D0] hover:text-white",
  FOCUS_RING,
].join(" ");
