"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import TextNav from "./interaction/TextNav";
import { FOCUS_RING } from "./interaction/tokens";
import { trackNavLinkClick } from "@/lib/analytics/events";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("byTheNumbers"), href: "/by-the-numbers" },
    { label: t("howIThink"), href: "/how-i-think" },
    { label: t("atlas"), href: "/atlas" },
    { label: t("selectedWorks"), href: "/projects" },
    { label: t("contactMe"), href: "/contact" },
  ];

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-6 sm:py-8 relative z-50">
      {/* Logo */}
      <Link
        href="/"
        className={`text-lg font-bold tracking-widest hover:text-[#00C3D0] transition ${FOCUS_RING}`}
        onClick={() => {
          setOpen(false);
          trackNavLinkClick("home");
        }}
      >
        {t("logo")}
      </Link>

      {/* Links — desktop */}
      <ul className="hidden sm:flex items-center gap-6 lg:gap-10 text-sm">
        {links.map((item) => {
          const isActive = pathname === item.href || pathname === `/es${item.href}`;
          return (
            <li key={item.href}>
              <TextNav
                href={item.href}
                active={isActive}
                onClick={() => trackNavLinkClick(item.href)}
                className={isActive ? "border-b-2 border-[#00C3D0] pb-0.5" : ""}
              >
                {item.label}
              </TextNav>
            </li>
          );
        })}
        <li>
          <LocaleSwitcher />
        </li>
      </ul>

      {/* Hamburger — mobile */}
      <div className="flex sm:hidden items-center gap-3">
        <LocaleSwitcher />
        <button
          className={`group flex flex-col justify-center gap-1.5 size-11 px-1.5 z-50 ${FOCUS_RING} rounded-full`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span
            className="block h-0.5 bg-[#1a1a1a] transition-all duration-300 origin-center group-hover:bg-[#00C3D0]"
            style={{ transform: open ? "translateY(8px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-0.5 bg-[#1a1a1a] transition-all duration-300 group-hover:bg-[#00C3D0]"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-0.5 bg-[#1a1a1a] transition-all duration-300 origin-center group-hover:bg-[#00C3D0]"
            style={{ transform: open ? "translateY(-8px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* Menú mobile — dropdown */}
      {open && (
        <div
          className="sm:hidden absolute top-full left-0 w-full bg-[#FFFCF6] border-b border-[#E8E4DC] flex flex-col py-4 z-40"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
        >
          {links.map((item) => {
            const isActive = pathname === item.href || pathname === `/es${item.href}`;
            return (
              <TextNav
                key={item.href}
                href={item.href}
                active={isActive}
                onClick={() => {
                  setOpen(false);
                  trackNavLinkClick(item.href);
                }}
                className="px-6 py-3 w-full text-left min-h-[44px] flex items-center"
              >
                {item.label}
              </TextNav>
            );
          })}
        </div>
      )}
    </nav>
  );
}