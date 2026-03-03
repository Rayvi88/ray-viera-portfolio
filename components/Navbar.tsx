"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "By the Numbers", href: "/by-the-numbers" },
  { label: "How I Think", href: "/how-i-think" },
  { label: "Selected Works", href: "/selected-works" },
  { label: "Contact Me", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-6 sm:py-8 relative z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-bold tracking-widest hover:text-[#00C3D0] transition"
        onClick={() => setOpen(false)}
      >
        NEXA
      </Link>

      {/* Links — desktop */}
      <ul className="hidden sm:flex gap-6 lg:gap-10 text-sm">
        {links.map((item) => {
          const isActive = pathname === item.href;
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
      </ul>

      {/* Hamburger — mobile */}
      <button
        className="sm:hidden flex flex-col justify-center gap-1.5 w-8 h-8 z-50"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className="block h-0.5 bg-[#1a1a1a] transition-all duration-300 origin-center"
          style={{
            transform: open ? "translateY(8px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block h-0.5 bg-[#1a1a1a] transition-all duration-300"
          style={{ opacity: open ? 0 : 1 }}
        />
        <span
          className="block h-0.5 bg-[#1a1a1a] transition-all duration-300 origin-center"
          style={{
            transform: open ? "translateY(-8px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Menú mobile — dropdown */}
      {open && (
        <div
          className="sm:hidden absolute top-full left-0 w-full bg-[#FFFCF6] border-b border-[#E8E4DC] flex flex-col py-4 z-40"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
        >
          {links.map((item) => {
            const isActive = pathname === item.href;
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