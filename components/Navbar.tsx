"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("byTheNumbers"), href: "/by-the-numbers" },
    { label: t("howIThink"), href: "/how-i-think" },
    { label: t("selectedWorks"), href: "/selected-works" },
    { label: t("contactMe"), href: "/contact" },
  ];

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-6 sm:py-8 relative z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-bold tracking-widest hover:text-[#00C3D0] transition"
        onClick={() => setOpen(false)}
      >
        {t("logo")}
      </Link>

      {/* Links — desktop */}
      <ul className="hidden sm:flex items-center gap-6 lg:gap-10 text-sm">
        {links.map((item) => {
          const isActive = pathname === item.href || pathname === `/es${item.href}`;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`cursor-pointer transition font-medium ${
                  isActive
                    ? "text-[#00C3D0] font-bold border-b-2 border-[#00C3D0] pb-0.5"
                    : "hover:text-[#00C3D0] hover:font-bold"
                }`}
              >
                {item.label}
              </Link>
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
          className="flex flex-col justify-center gap-1.5 w-8 h-8 z-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block h-0.5 bg-[#1a1a1a] transition-all duration-300 origin-center"
            style={{ transform: open ? "translateY(8px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-0.5 bg-[#1a1a1a] transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-0.5 bg-[#1a1a1a] transition-all duration-300 origin-center"
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
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-6 py-3 text-sm font-medium transition ${
                  isActive
                    ? "text-[#00C3D0] font-bold"
                    : "text-[#1a1a1a] hover:text-[#00C3D0]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}