// components/atlas/ecosystem/ecosystemData.ts
//
// Modelo de datos/estado compartido para el modal "Diseño Sistémico".
// Un solo estado por elemento; cada paso del sidebar (Explorar, Ver, Detectar,
// Entender, Organizar, Resultado) lee un derivado visual distinto de esta misma
// fuente (posición, escala, opacidad, z-index), según la tabla confirmada en
// PROJECT-KNOWLEDGE-modal-diseno-sistemico.md.
//
// IMPORTANTE — únicamente el paso 1 (Explorar) está confirmado/probado en pantalla
// hoy. Los estados de "ver" / "detectar" / "entender" / "organizar" / "resultado"
// están definidos aquí para que el modelo no haya que rehacerlo pantalla por
// pantalla, pero sus valores numéricos son un punto de partida razonable, no
// specs pixel-perfect — se ajustan cuando construyamos cada pantalla.

export type EcosystemStep =
  | "explorar"
  | "ver"
  | "detectar"
  | "entender"
  | "organizar"
  | "resultado";

export const ECOSYSTEM_STEPS: EcosystemStep[] = [
  "explorar",
  "ver",
  "detectar",
  "entender",
  "organizar",
  "resultado",
];

export type ElementKey =
  | "producto"
  | "usuarios"
  | "procesos"
  | "equipo"
  | "tecnologia"
  | "datos"
  | "marca"
  | "operaciones";

export interface EcosystemElement {
  id: ElementKey;
  /**
   * Ícono badge turquesa ("-over-") — YA NO se renderiza sobre la cara del
   * cubo (se reemplazó por el nombre en texto). Queda sin uso actual, se
   * conserva por si hace falta más adelante.
   */
  badgeIcon: string;
  /**
   * Badge oscuro COMPLETO (círculo + ícono blanco + nombre, todo ya
   * incluido en el archivo — confirmado contra tu captura de /public) que
   * usa la card de "Entender". Un solo <img>, no se arma a mano.
   */
  badgeIconDefault: string;
  /**
   * Elementos relacionados (solo los que SÍ son cubos reales — el texto de
   * "Relaciones" en la card de Entender puede mencionar cosas como
   * "Marketing" que no tienen cubo propio; esos quedan como texto nada más,
   * no se resaltan porque no hay nada que resaltar). Se usa para iluminar
   * sutilmente los relacionados en hover, sin dibujar líneas literales.
   */
  relatedIds: ElementKey[];
  /** Posición base como % del canvas (0-100). No cambia entre pasos, excepto Resultado. */
  baseX: number;
  baseY: number;
  /** Tamaño base en px a scale 1. */
  baseSize: number;
  /** Rotación base sutil, para que el racimo no se vea en grilla. */
  rotation: { x: number; y: number; z: number };
  /**
   * Offset en % del canvas (no px) al que converge en "Resultado" —
   * posición en el anillo alrededor de la masa central. Reemplaza al
   * placeholder anterior (que era en px con conversión /8 aproximada).
   */
  resultOffset: { x: number; y: number };
}

export interface DecorativeCube {
  id: string;
  baseX: number;
  baseY: number;
  baseSize: number;
  rotation: { x: number; y: number; z: number };
  /** Opacidad propia del cubo (además del multiplicador por paso). */
  baseOpacity: number;
  /**
   * "low" (default si se omite) = vidrio tenue, el decorativo típico.
   * "high" = misma intensidad de color que los cubos con contenido — se usa
   * en un subconjunto a propósito para que no se note a simple vista cuáles
   * de los 32+ cubos son los 8 "reales" hasta que el usuario interactúa.
   */
  intensity?: "low" | "high";
  /**
   * false = este decorativo NO converge al centro en "Resultado", se queda
   * flotando en su sitio de siempre (da textura de fondo al anillo). true
   * (default) = converge al centro junto con el resto para formar la masa
   * densa central. Sin este campo, todos convergerían y no quedaría nada
   * de fondo alrededor del anillo — se necesita un subconjunto de cada.
   */
  convergesInResult?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────
// MAPEO DE ÍCONOS CONFIRMADO (captura real de /public, ya no es una
// suposición): Usuarios→1, Operaciones→2, Procesos→3, Equipo→4,
// Tecnología→5, Datos→6, Marca→7 (versión oscura es "Group 7.svg", nombre
// irregular, la turquesa sí seteguido: "Experiencia-over-7.svg"),
// Experiencia→8 (SOLO existe versión turquesa, no hay oscura — pendiente
// para cuando construyamos Entender), Producto→9. badgeIcon usa la versión
// turquesa ("-over-") porque hoy solo se usa en cards/tags sobre fondo
// claro (Detectar), no sobre la cara del cubo (esa sigue siendo texto).
// ─────────────────────────────────────────────────────────────────────────
export const ECOSYSTEM_ELEMENTS: EcosystemElement[] = [
  {
    id: "producto",
    badgeIcon: "/Experiencia-over-9.svg",
    badgeIconDefault: "/Experiencia-9.svg",
    relatedIds: ["usuarios", "marca", "tecnologia", "operaciones", "datos"],
    baseX: 42,
    baseY: 30,
    baseSize: 108,
    rotation: { x: -14, y: 22, z: 6 },
    resultOffset: { x: 0, y: -20 },
  },
  {
    id: "usuarios",
    badgeIcon: "/Experiencia-over-1.svg",
    badgeIconDefault: "/Experiencia-1.svg",
    relatedIds: ["producto", "marca"],
    baseX: 60,
    baseY: 24,
    baseSize: 64,
    rotation: { x: 10, y: -18, z: -5 },
    resultOffset: { x: 18, y: -14 },
  },
  {
    id: "procesos",
    badgeIcon: "/Experiencia-over-3.svg",
    badgeIconDefault: "/Experiencia-3.svg",
    relatedIds: ["equipo", "operaciones", "tecnologia", "datos"],
    baseX: 33,
    baseY: 48,
    baseSize: 122,
    rotation: { x: 16, y: 14, z: 8 },
    resultOffset: { x: 26, y: 0 },
  },
  {
    id: "equipo",
    badgeIcon: "/Experiencia-over-4.svg",
    badgeIconDefault: "/Experiencia-4.svg",
    relatedIds: ["producto", "operaciones", "procesos"],
    baseX: 66,
    baseY: 46,
    baseSize: 74,
    rotation: { x: -10, y: -24, z: 4 },
    resultOffset: { x: 18, y: 14 },
  },
  {
    id: "tecnologia",
    badgeIcon: "/Experiencia-over-5.svg",
    badgeIconDefault: "/Experiencia-5.svg",
    relatedIds: ["producto", "operaciones", "datos"],
    baseX: 50,
    baseY: 42,
    baseSize: 96,
    rotation: { x: 8, y: 8, z: -6 },
    resultOffset: { x: 0, y: 20 },
  },
  {
    id: "datos",
    badgeIcon: "/Experiencia-over-6.svg",
    badgeIconDefault: "/Experiencia-6.svg",
    relatedIds: ["usuarios", "producto", "operaciones", "tecnologia"],
    baseX: 38,
    baseY: 66,
    baseSize: 58,
    rotation: { x: -18, y: 16, z: 7 },
    resultOffset: { x: -18, y: 14 },
  },
  {
    id: "marca",
    badgeIcon: "/Experiencia-over-7.svg",
    badgeIconDefault: "/Group 7.svg",
    relatedIds: ["usuarios", "producto"],
    baseX: 60,
    baseY: 64,
    baseSize: 114,
    rotation: { x: 12, y: -10, z: -8 },
    resultOffset: { x: -26, y: 0 },
  },
  {
    id: "operaciones",
    badgeIcon: "/Experiencia-over-2.svg",
    badgeIconDefault: "/Experiencia-2.svg",
    relatedIds: ["procesos", "equipo", "tecnologia", "datos", "producto"],
    baseX: 48,
    baseY: 56,
    baseSize: 68,
    rotation: { x: -6, y: -14, z: 5 },
    resultOffset: { x: -18, y: -14 },
  },
];

// Cubos decorativos: ahora más numerosos y superpuestos entre sí para lograr
// el racimo denso de las capturas de referencia (antes estaban demasiado
// aislados y espaciados). Misma familia de color turquesa que los cubos con
// contenido — la diferencia es solo intensidad (ver EcosystemCube.tsx).
export const DECORATIVE_CUBES: DecorativeCube[] = [
  { id: "d1", baseX: 22, baseY: 20, baseSize: 46, rotation: { x: 18, y: -14, z: 8 }, baseOpacity: 0.5 },
  { id: "d2", baseX: 27, baseY: 24, baseSize: 34, rotation: { x: -10, y: 22, z: -6 }, baseOpacity: 0.4 },
  { id: "d3", baseX: 74, baseY: 16, baseSize: 96, rotation: { x: 8, y: -20, z: 5 }, baseOpacity: 0.55, intensity: "high" },
  { id: "d4", baseX: 84, baseY: 12, baseSize: 30, rotation: { x: -12, y: 16, z: -4 }, baseOpacity: 0.4 , convergesInResult: false },
  { id: "d5", baseX: 78, baseY: 30, baseSize: 52, rotation: { x: 14, y: -18, z: 10 }, baseOpacity: 0.5 },
  { id: "d6", baseX: 72, baseY: 40, baseSize: 110, rotation: { x: -8, y: 20, z: -6 }, baseOpacity: 0.55, intensity: "high" },
  { id: "d7", baseX: 80, baseY: 46, baseSize: 36, rotation: { x: 16, y: -12, z: 8 }, baseOpacity: 0.5 },
  { id: "d8", baseX: 68, baseY: 54, baseSize: 38, rotation: { x: -14, y: 10, z: -8 }, baseOpacity: 0.42 },
  { id: "d9", baseX: 82, baseY: 62, baseSize: 88, rotation: { x: 10, y: -16, z: 6 }, baseOpacity: 0.5, intensity: "high" },
  { id: "d10", baseX: 20, baseY: 46, baseSize: 30, rotation: { x: -16, y: 14, z: -5 }, baseOpacity: 0.38 },
  { id: "d11", baseX: 16, baseY: 68, baseSize: 40, rotation: { x: 12, y: -22, z: 7 }, baseOpacity: 0.42 },
  { id: "d12", baseX: 44, baseY: 84, baseSize: 34, rotation: { x: -10, y: 18, z: -6 }, baseOpacity: 0.4 },
  { id: "d13", baseX: 56, baseY: 82, baseSize: 100, rotation: { x: 14, y: -14, z: 8 }, baseOpacity: 0.55, intensity: "high" },
  { id: "d14", baseX: 30, baseY: 78, baseSize: 28, rotation: { x: -8, y: 20, z: -4 }, baseOpacity: 0.35 },
  { id: "d15", baseX: 54, baseY: 22, baseSize: 26, rotation: { x: 10, y: -10, z: 6 }, baseOpacity: 0.32 },
  { id: "d16", baseX: 46, baseY: 74, baseSize: 30, rotation: { x: -12, y: 16, z: -7 }, baseOpacity: 0.38 },
  { id: "d17", baseX: 12, baseY: 30, baseSize: 24, rotation: { x: 14, y: -8, z: 5 }, baseOpacity: 0.3 , convergesInResult: false },
  { id: "d18", baseX: 88, baseY: 24, baseSize: 28, rotation: { x: -10, y: 18, z: -6 }, baseOpacity: 0.36 , convergesInResult: false },
  { id: "d19", baseX: 90, baseY: 50, baseSize: 22, rotation: { x: 8, y: -14, z: 7 }, baseOpacity: 0.32 , convergesInResult: false },
  { id: "d20", baseX: 62, baseY: 8, baseSize: 92, rotation: { x: -14, y: 10, z: -5 }, baseOpacity: 0.5, intensity: "high" },
  { id: "d21", baseX: 8, baseY: 58, baseSize: 32, rotation: { x: 12, y: -20, z: 8 }, baseOpacity: 0.4 , convergesInResult: false },
  { id: "d22", baseX: 36, baseY: 12, baseSize: 20, rotation: { x: -8, y: 14, z: -4 }, baseOpacity: 0.28 },
  { id: "d23", baseX: 70, baseY: 78, baseSize: 34, rotation: { x: 16, y: -12, z: 6 }, baseOpacity: 0.4 },
  { id: "d24", baseX: 24, baseY: 60, baseSize: 104, rotation: { x: -10, y: 16, z: -8 }, baseOpacity: 0.52, intensity: "high" },
  { id: "d25", baseX: 58, baseY: 36, baseSize: 22, rotation: { x: 10, y: -10, z: 5 }, baseOpacity: 0.3 },
  { id: "d26", baseX: 40, baseY: 40, baseSize: 24, rotation: { x: -12, y: 12, z: -6 }, baseOpacity: 0.3 },
  { id: "d27", baseX: 76, baseY: 60, baseSize: 20, rotation: { x: 8, y: -16, z: 7 }, baseOpacity: 0.28 },
  { id: "d28", baseX: 14, baseY: 12, baseSize: 22, rotation: { x: -14, y: 10, z: -5 }, baseOpacity: 0.3 , convergesInResult: false },
  { id: "d29", baseX: 92, baseY: 76, baseSize: 30, rotation: { x: 12, y: -14, z: 6 }, baseOpacity: 0.36 , convergesInResult: false },
  { id: "d30", baseX: 8, baseY: 84, baseSize: 94, rotation: { x: -8, y: 18, z: -7 }, baseOpacity: 0.5, intensity: "high" , convergesInResult: false },
  { id: "d31", baseX: 30, baseY: 30, baseSize: 18, rotation: { x: 10, y: -8, z: 5 }, baseOpacity: 0.26 },
  { id: "d32", baseX: 52, baseY: 60, baseSize: 20, rotation: { x: -6, y: 12, z: -4 }, baseOpacity: 0.28 },
  { id: "d33", baseX: 64, baseY: 20, baseSize: 26, rotation: { x: 8, y: -10, z: 6 }, baseOpacity: 0.3 },
  { id: "d34", baseX: 18, baseY: 76, baseSize: 22, rotation: { x: -10, y: 14, z: -5 }, baseOpacity: 0.28 },
];

/** Tamaño fijo (px) del clon centrado en el spotlight de "Ver" — no depende
 * del tamaño base del elemento, para que todos se vean igual de protagonistas. */
export const SPOTLIGHT_SIZE_PX = 230;

/** Tamaño fijo (px) de las 8 unidades orbitando en "Resultado" — uniforme,
 * no depende del baseSize individual de cada elemento. */
export const SATELLITE_SIZE_PX = 60;

/** Tamaño (px) del cubo grande central en "Resultado" — representa "el
 * negocio en sí", un solo cubo, no una fusión de varios. */
export const HERO_CUBE_SIZE_PX = 210;

/** Duración (segundos) de una vuelta completa de órbita — lenta y pausada
 * a propósito, no un giro mareante. */
export const ORBIT_DURATION_SEC = 36;

/**
 * Radio de la órbita en PÍXELES (no %) — el pivote que gira usa
 * `transform: translateX()`, que es relativo al propio elemento, no al
 * canvas, así que necesita un valor fijo en px. Círculo, no elipse (se
 * descartó la elipse: intentarla con scaleY() distorsionaba también el
 * cubo adentro, no solo la trayectoria).
 */
export const ORBIT_RADIUS_PX = 260;

// ─────────────────────────────────────────────────────────────────────────
// DETECTAR — 3 conexiones fijas (no aleatorias, no inventadas para "llenar
// pantalla": Producto↔Datos, Procesos↔Operaciones, Usuarios↔Producto;
// Marca/Tecnología/Equipo se quedan sin conexión).
//
// QUINTA VUELTA — cambio de fondo tras feedback explícito ("NO, NO Y NO...
// todas las conexiones deben aparecer así, solas"): ya NO se acumulan las 3
// a la vez. Se muestran de a UNA, en ciclo (aparece, se queda un rato,
// desaparece, aparece la siguiente, y así sucesivamente en loop mientras el
// usuario esté en este paso).
// ─────────────────────────────────────────────────────────────────────────
export interface DetectarConnection {
  id: string;
  fromId: ElementKey;
  toId: ElementKey;
}

export const DETECTAR_CONNECTIONS: DetectarConnection[] = [
  { id: "c1", fromId: "producto", toId: "datos" },
  { id: "c2", fromId: "procesos", toId: "operaciones" },
  { id: "c3", fromId: "usuarios", toId: "producto" },
];

/** Espera antes de mostrar la primera conexión al entrar al paso. */
export const DETECTAR_INITIAL_DELAY_MS = 2000;
/** Cuánto tiempo se queda visible cada conexión antes de pasar a la siguiente. */
export const DETECTAR_SHOW_MS = 4000;
/** Pausa (todo oculto) entre que desaparece una y aparece la siguiente. */
export const DETECTAR_GAP_MS = 700;

export interface CubeVisualState {
  x: number; // %
  y: number; // %
  scale: number;
  opacity: number;
  zIndex: number;
  /** Multiplicador sobre la deriva idle base del cubo. */
  driftIntensity: number;
}

export interface VisualStateContext {
  /** Este elemento específico está en hover (solo aplica en Explorar/Ver/Detectar/Entender). */
  isHovered?: boolean;
  /** OTRO elemento está en hover — para atenuar este (solo Ver). */
  isOtherHovered?: boolean;
  /** Este elemento fue seleccionado por click (solo Entender/Organizar). */
  isSelected?: boolean;
  /** OTRO elemento está seleccionado — para atenuar este (solo Entender/Organizar). */
  isOtherSelected?: boolean;
  /**
   * Este elemento es uno de los `relatedIds` del elemento en foco ahora
   * mismo (el hover-preview si nada está seleccionado, o el seleccionado
   * si hay uno) — se resalta un poco, sin llegar al protagonismo del foco.
   */
  isRelatedToFocus?: boolean;
}

/**
 * Estado visual de un elemento CON contenido, según el paso activo.
 * Posiciones NO cambian excepto en "resultado" (único paso con movimiento
 * real de posición) y en el spotlight de "ver" en hover (movimiento
 * temporal al centro, vuelve a su sitio al quitar el mouse).
 */
export function getElementVisualState(
  el: EcosystemElement,
  step: EcosystemStep,
  ctx: VisualStateContext = {}
): CubeVisualState {
  const {
    isHovered = false,
    isOtherHovered = false,
    isSelected = false,
    isOtherSelected = false,
    isRelatedToFocus = false,
  } = ctx;
  switch (step) {
    case "explorar":
      return {
        x: el.baseX,
        y: el.baseY,
        scale: isHovered ? 1.08 : 1,
        opacity: 0.85,
        zIndex: isHovered ? 50 : 10,
        driftIntensity: 1,
      };
    case "ver": {
      // TERCERA VUELTA: el cubo "real" (el que detecta hover) YA NO se
      // mueve al centro él mismo — eso causaba el parpadeo de hover al
      // moverse fuera del cursor. Ahora solo se atenúa en su sitio, igual
      // que sus vecinos, mientras EcosystemCanvas.tsx renderiza aparte un
      // clon visual (staticFront) centrado y congelado. Reposo = igual que
      // Explorar si nada está en hover.
      if (isHovered || isOtherHovered) {
        return { x: el.baseX, y: el.baseY, scale: 0.92, opacity: 0.4, zIndex: 10, driftIntensity: 1 };
      }
      return { x: el.baseX, y: el.baseY, scale: 1, opacity: 0.85, zIndex: 10, driftIntensity: 1 };
    }
    case "detectar":
      // CUARTA VUELTA — corto por lo sano tras 3 intentos de afinar el
      // zoom/atenuación de los cubos ("sigue sin tener sentido, todo queda
      // apuñuñado"): el problema es geométrico, no de tuning. Producto
      // (108px) y Procesos (122px) son los cubos más grandes del racimo —
      // al hacerles zoom en un espacio ya ocupado por vecinos, se montan
      // encima de todo. La primera conexión se veía bien por pura
      // coincidencia de espacio disponible, no porque el mecanismo
      // estuviera resuelto. Los cubos ahora se quedan EXACTAMENTE como en
      // Explorar durante todo Detectar, sin excepciones — la historia de
      // "esto se está descubriendo" la cuentan solo la línea y la card
      // (ver EcosystemCanvas.tsx), que no compiten por espacio con nada.
      return {
        x: el.baseX,
        y: el.baseY,
        scale: isHovered ? 1.08 : 1,
        opacity: 0.85,
        zIndex: isHovered ? 50 : 10,
        driftIntensity: 1,
      };
    case "entender":
    case "organizar": {
      // Comportamiento idéntico entre Entender y Organizar (confirmado):
      // HOVER = zoom leve + resalta a sus relacionados (sin líneas
      // literales). CLICK = selección real: el área pasa al frente, sus
      // relacionados se quedan visibles con normalidad, el resto se
      // atenúa, y ahí aparece la card completa (EntenderCard.tsx u
      // OrganizarCard.tsx según el paso, ambas desde EcosystemCanvas.tsx).
      if (isSelected) {
        return { x: el.baseX, y: el.baseY, scale: 1.2, opacity: 1, zIndex: 60, driftIntensity: 1 };
      }
      if (isHovered) {
        return { x: el.baseX, y: el.baseY, scale: 1.08, opacity: 1, zIndex: 40, driftIntensity: 1 };
      }
      if (isRelatedToFocus) {
        return { x: el.baseX, y: el.baseY, scale: 1.03, opacity: 0.95, zIndex: 20, driftIntensity: 1 };
      }
      if (isOtherSelected || isOtherHovered) {
        return { x: el.baseX, y: el.baseY, scale: 0.94, opacity: 0.4, zIndex: 10, driftIntensity: 1 };
      }
      return { x: el.baseX, y: el.baseY, scale: 1, opacity: 0.85, zIndex: 10, driftIntensity: 1 };
    }
    case "resultado":
      // SEGUNDA VUELTA tras feedback ("no tiene nada que ver, visualmente
      // horrible"): ya no es un anillo estático de posiciones fijas — cada
      // unidad ahora ORBITA de verdad alrededor del cubo grande central
      // (la trayectoria circular la controla el prop `orbit` de
      // EcosystemCube.tsx + el @keyframes en EcosystemCanvas.tsx, no x/y).
      // x/y de acá quedan como valor de respaldo sin uso real una vez que
      // el canvas activa `orbit`. Tamaño uniforme (SATELLITE_SIZE_PX,
      // exportado abajo) para que las 8 se vean parejas sin importar su
      // baseSize individual. Sigue girando (driftIntensity: 1) — pidió
      // explícitamente "girando", no congelado.
      return {
        x: el.baseX,
        y: el.baseY,
        scale: SATELLITE_SIZE_PX / el.baseSize,
        opacity: 1,
        zIndex: 60,
        driftIntensity: 1,
      };
  }
}

export interface DecorativeVisualState {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  driftIntensity: number;
}

/**
 * @param cube el cubo decorativo (se necesita su posición base + si converge)
 * @param isSpotlightActive true si hay un foco activo que debe atenuar el
 * fondo: un elemento en hover durante "ver", o una conexión en su momento
 * de foco durante "detectar". Nunca detiene la animación, solo la atenúa.
 */
export function getDecorativeVisualState(
  cube: DecorativeCube,
  step: EcosystemStep,
  isSpotlightActive = false
): DecorativeVisualState {
  if (step === "resultado") {
    // TERCERA VUELTA tras feedback ("dejar la misma estética visual de las
    // pantallas anteriores es lo ideal"): quito la atenuación especial
    // "modo espacio" — los decorativos se quedan igual que en el resto de
    // las pantallas (reposo = Explorar), para que Resultado no se sienta
    // aparte del resto del recorrido.
    return { x: cube.baseX, y: cube.baseY, opacity: 1, scale: 1, driftIntensity: 1 };
  }
  if (step === "ver" && isSpotlightActive) {
    // Antes 0.15 — muy transparente, apenas se notaba el fondo. Subido a
    // pedido explícito de Ray.
    return { x: cube.baseX, y: cube.baseY, opacity: 0.45, scale: 0.92, driftIntensity: 1 };
  }
  if (step === "detectar" && isSpotlightActive) {
    return { x: cube.baseX, y: cube.baseY, opacity: 0.4, scale: 0.94, driftIntensity: 1 };
  }
  if (step === "entender" && isSpotlightActive) {
    return { x: cube.baseX, y: cube.baseY, opacity: 0.55, scale: 0.94, driftIntensity: 1 };
  }
  if (step === "organizar" && isSpotlightActive) {
    return { x: cube.baseX, y: cube.baseY, opacity: 0.55, scale: 0.94, driftIntensity: 1 };
  }
  // Reposo (sin foco activo, pasos previos a Resultado) = misma composición
  // que Explorar. La atenuación con foco activo ya se maneja arriba.
  return { x: cube.baseX, y: cube.baseY, opacity: 1, scale: 1, driftIntensity: 1 };
}