"use client";

import { useEffect, useState } from "react";

const START_DATE = new Date("2026-06-25T00:00:00");
const DAYS_DURATION = 7;

export default function VenezuelaMoment() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tooltipReady, setTooltipReady] = useState(false);

  useEffect(() => {
    const now = new Date();
    const msElapsed = now.getTime() - START_DATE.getTime();
    const daysElapsed = msElapsed / (1000 * 60 * 60 * 24);
    if (daysElapsed >= 0 && daysElapsed < DAYS_DURATION) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (hovered) {
      const t = setTimeout(() => setTooltipReady(true), 10);
      return () => clearTimeout(t);
    } else {
      setTooltipReady(false);
    }
  }, [hovered]);

  if (!visible) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        position: "relative",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Bandera venezolana */}
      <span
        style={{
          display: "inline-flex",
          transition: "transform 220ms ease, opacity 220ms ease",
          transform: hovered
            ? "translateY(1px) scale(1.50)"
            : "translateY(0) scale(1)",
          opacity: hovered ? 1 : 0.8,
          willChange: "transform",
        }}
        aria-label="Bandera de Venezuela"
        role="img"
      >
        <img 
          src="/Banderita-venezuela-7.jpg" 
          alt="Bandera de Venezuela"
          style={{ 
            width: "38px", 
            height: "28px", 
            objectFit: "cover", 
            borderRadius: "3px", 
            display: "block" 
          }} 
        />
      </span>

      {/* Texto */}
      <span
        style={{
          fontSize: "12px",
          color: "#1a1a1a",
          opacity: hovered ? 0.7 : 0.45,
          letterSpacing: "0.04em",
          fontFamily: "var(--font-mono, monospace)",
          userSelect: "none",
          transition: "opacity 220ms ease",
        }}
      >

      </span>

      {/* Tooltip */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a1a1a",
            color: "#f5f0e8",
            borderRadius: "6px",
            padding: "12px 16px",
            width: "240px",
            fontSize: "12px",
            lineHeight: "1.7",
            letterSpacing: "0.01em",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            pointerEvents: "none",
            zIndex: 50,
            opacity: tooltipReady ? 1 : 0,
            transition: "opacity 250ms ease",
            willChange: "opacity",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "3px",
              borderRadius: "4px 4px 0 0",
              overflow: "hidden",
              marginBottom: "10px",
              marginLeft: "-16px",
              marginRight: "-16px",
              marginTop: "-12px",
            }}
          >
            <div style={{ flex: 1, background: "#CF9A00" }} />
            <div style={{ flex: 1, background: "#00247D" }} />
            <div style={{ flex: 1, background: "#CF142B" }} />
          </div>
          Hoy este espacio guarda un momento de silencio por Venezuela.
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "10px",
              height: "10px",
              background: "#1a1a1a",
              zIndex: -1,
            }}
          />
        </div>
      )}
    </div>
  );
}