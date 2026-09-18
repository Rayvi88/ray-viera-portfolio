"use client";

// components/how-i-think/systemic-design/EntenderCard.tsx
//
// Card de detalle que aparece al hacer hover (y se "pinea" con click) sobre
// un cubo durante "Entender". Badge oscuro completo (círculo + ícono blanco
// + nombre, todo ya incluido en el archivo de /public — un solo <img>, no
// se arma a mano).
//
// SEGUNDA VUELTA — ajustado contra tokens de Material Design 3 tras
// feedback ("el ícono se ve muy grande"): tamaño de badge, radio de
// esquina, elevación, espaciado (grid de 8dp) y escala tipográfica
// (Label Medium / Body Medium) recalibrados, no solo el ícono suelto.

import { useTranslations } from "next-intl";
import type { ElementKey } from "./ecosystemData";

interface EntenderCardProps {
  elementId: ElementKey;
  badgeIconDefault: string;
}

export default function EntenderCard({ elementId, badgeIconDefault }: EntenderCardProps) {
  const tLabels = useTranslations("howIThinkPage.ecosystem.elements");
  const tEntender = useTranslations("howIThinkPage.ecosystem.entender");
  const relationships = tEntender(`cards.${elementId}.relationships`);
  const finding = tEntender(`cards.${elementId}.finding`);
  const impact = tEntender(`cards.${elementId}.impact`);

  return (
    <div
      className="ecosystem-detectar-card relative flex w-[280px] flex-col items-center gap-4 rounded-xl bg-[#f4f4f4] p-6 text-center"
      style={{
        animationDuration: "0.35s",
        // Sombra de dos capas, estilo M3 elevation level 2 — más sutil que
        // un shadow-xl de un solo bloque.
        boxShadow: "0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)",
      }}
    >
      {/* Halo turquesa tenue alrededor del badge, mismo acento que LabModal.tsx */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{ boxShadow: "0 0 0 6px rgba(0,195,208,0.12)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeIconDefault} alt={tLabels(`${elementId}.label`)} className="size-20" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[12px] font-medium uppercase tracking-[0.2px] text-[#4c4546]">
          {tEntender("relationshipsLabel")}
        </p>
        <p className="text-[14px] leading-5 text-[#1b1c1c]">{relationships}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[12px] font-medium uppercase tracking-[0.2px] text-[#4c4546]">
          {tEntender("findingLabel")}
        </p>
        <p className="text-[14px] leading-5 text-[#1b1c1c]">{finding}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[12px] font-medium uppercase tracking-[0.2px] text-[#4c4546]">
          {tEntender("impactLabel")}
        </p>
        <p className="text-[14px] leading-5 text-[#1b1c1c]">{impact}</p>
      </div>
    </div>
  );
}