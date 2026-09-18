// components/interaction/SolidCTA.tsx
//
// Familia C — acción primaria de alto énfasis DENTRO de un flujo de tarea
// (Labs/Assessments). Regla: fuera de un flujo, prohibido; un solo Solid
// visible por pantalla. Negro único #1a1a1a, cuadrado, uppercase, hover teal.

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { FOCUS_RING, TRANSITION_MICRO } from "./tokens";

interface SolidCTAProps {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
}

export default function SolidCTA({
  href,
  onClick,
  disabled = false,
  ariaLabel,
  type = "button",
  className = "",
  children,
}: SolidCTAProps) {
  const classes = [
    "inline-flex items-center justify-center gap-3 bg-transparent px-8 py-4",
    "text-sm uppercase tracking-[1.6px] text-[#1a1a1a] border-[1.5px] border-[#1a1a1a]",
    TRANSITION_MICRO,
    "hover:border-[#00C3D0] hover:text-[#00C3D0] hover:bg-[#00C3D0]/5",
    "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#1a1a1a] disabled:hover:text-[#1a1a1a] disabled:hover:bg-transparent",
    FOCUS_RING,
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
