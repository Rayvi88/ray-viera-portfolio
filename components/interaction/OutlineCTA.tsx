// components/interaction/OutlineCTA.tsx
//
// Familia B — Outline CTA estándar de NEXA fuera de flujos de tarea.
// Base: borde ink 1.5px, fondo transparente, 44px, rounded-lg, 14px semibold.
// Hover teal (borde + texto + fondo sutil). Sin uppercase obligatoria.
// OUTLINE_CTA_CLASS existe para anclas externas (<a> mailto/https) que no
// pueden usar el componente sin ensuciar su API.

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { FOCUS_RING, HIT_44, TRANSITION_MICRO } from "./tokens";

export const OUTLINE_CTA_CLASS = [
  "inline-flex items-center justify-center gap-2 px-6",
  HIT_44,
  "text-sm font-semibold rounded-lg border-[1.5px] border-[#1a1a1a] bg-transparent text-[#1a1a1a]",
  TRANSITION_MICRO,
  "hover:border-[#00C3D0] hover:text-[#00C3D0] hover:bg-[#00C3D0]/5",
  "disabled:cursor-not-allowed disabled:opacity-30",
  FOCUS_RING,
].join(" ");

interface OutlineCTAProps {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
}

export default function OutlineCTA({
  href,
  onClick,
  disabled = false,
  ariaLabel,
  type = "button",
  className = "",
  children,
}: OutlineCTAProps) {
  const classes = [OUTLINE_CTA_CLASS, className].filter(Boolean).join(" ");
  if (href) {
    return (
      <Link href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
}
