// components/interaction/TextNav.tsx
//
// Familia A — Text Navigation: moverse sin énfasis de acción
// (navbar, tabs, back/next textuales, links editoriales, metanavegación).
// Regla dura: el hover NUNCA cambia el peso tipográfico (layout shift).

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { FOCUS_RING, TRANSITION_MICRO } from "./tokens";

interface TextNavProps {
  href?: string;
  onClick?: () => void;
  active?: boolean;
  /** 11-12px uppercase para metanavegación; 14px normal por defecto. */
  micro?: boolean;
  /** Tono terciario para contextos secundarios (tabs, footers de modal). */
  muted?: boolean;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export default function TextNav({
  href,
  onClick,
  active = false,
  micro = false,
  muted = false,
  ariaLabel,
  className = "",
  children,
}: TextNavProps) {
  const classes = [
    TRANSITION_MICRO,
    FOCUS_RING,
    micro ? "text-xs font-medium uppercase tracking-[0.5px]" : "text-sm font-medium",
    active ? "text-[#00C3D0] font-semibold" : muted ? "text-[#8e8e93]" : "text-[#1a1a1a]",
    !active && "hover:text-[#00C3D0]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
