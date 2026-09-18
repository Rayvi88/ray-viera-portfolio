// components/interaction/IconControl.tsx
//
// Familia D — cerrar, flechas, menú, dots clicables.
// Regla: visual libre (16-40px), hit area fija 44px (size-11).
// `framed` = círculo con borde (flechas); sin borde = close/hamburger.

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { FOCUS_RING_CIRCLE, TRANSITION_MICRO } from "./tokens";

interface IconControlProps {
  label: string;
  onClick?: () => void;
  href?: string;
  framed?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export default function IconControl({
  label,
  onClick,
  href,
  framed = true,
  disabled = false,
  className = "",
  children,
}: IconControlProps) {
  const classes = [
    "flex size-11 items-center justify-center rounded-full",
    TRANSITION_MICRO,
    framed
      ? "border border-[#E8E4DC] text-[#1a1a1a] hover:border-[#00C3D0] hover:text-[#00C3D0]"
      : "text-[#1a1a1a] hover:text-[#00C3D0]",
    "disabled:opacity-20 disabled:pointer-events-none",
    FOCUS_RING_CIRCLE,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} onClick={onClick} aria-label={label} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} className={classes}>
      {children}
    </button>
  );
}
