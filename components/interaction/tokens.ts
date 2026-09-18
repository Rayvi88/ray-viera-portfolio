// components/interaction/tokens.ts
//
// Tokens compartidos del Interaction System de NEXA (solo clases Tailwind,
// sin valores inventados: todos existen ya en el código).
//
// - FOCUS_RING: anillo teal obligatorio en focus-visible (antes solo Contact).
// - TRANSITION_MICRO (200ms): micro-feedback color/borde/fondo.
// - TRANSITION_STATE (300ms): cambios de estado con geometría.
// - HIT_44: área táctil mínima; el visual puede ser menor.

export const FOCUS_RING =
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C3D0]";

export const FOCUS_RING_CIRCLE =
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C3D0] focus-visible:rounded-full";

export const TRANSITION_MICRO = "transition-colors duration-200 ease-out";

export const TRANSITION_STATE = "transition-all duration-300 ease-out";

export const HIT_44 = "min-h-[44px] min-w-[44px]";

// Excepción documentada para dots: el ritmo visual no admite un botón de
// 44px, así que el área se expande sin mover el layout. No usar en otros
// controles: ahí el hit de 44px es obligatorio.
export const ICON_DOT_HIT = "p-2 -m-2";
