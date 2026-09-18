"use client";

// components/how-i-think/systemic-design/OrganizarCard.tsx
//
// Card de detalle de "Organizar" — comportamiento de interacción idéntico a
// EntenderCard.tsx (aparece con hover, se "pinea" con click), mismos
// valores de Material Design 3 (badge 80px, radio 12px, elevación en dos
// capas, tipografía Label/Body Medium). Solo cambia el contenido: en vez
// de Relaciones/Hallazgo/Impacto, va Oportunidad/Focus. Sin campo de
// prioridad — confirmado explícitamente que ninguna card lo lleva.

import { useTranslations } from "next-intl";
import type { ElementKey } from "./ecosystemData";

interface OrganizarCardProps {
  elementId: ElementKey;
  badgeIconDefault: string;
}

export default function OrganizarCard({ elementId, badgeIconDefault }: OrganizarCardProps) {
  const tLabels = useTranslations("howIThinkPage.ecosystem.elements");
  const tOrganizar = useTranslations("howIThinkPage.ecosystem.organizar");
  const opportunity = tOrganizar(`cards.${elementId}.opportunity`);
  const focus = tOrganizar(`cards.${elementId}.focus`);

  return (
    <div
      className="ecosystem-detectar-card relative flex w-[280px] flex-col items-center gap-4 rounded-xl bg-[#f4f4f4] p-6 text-center"
      style={{
        animationDuration: "0.35s",
        boxShadow: "0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{ boxShadow: "0 0 0 6px rgba(0,195,208,0.12)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeIconDefault} alt={tLabels(`${elementId}.label`)} className="size-20" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[12px] font-medium uppercase tracking-[0.2px] text-[#4c4546]">
          {tOrganizar("opportunityLabel")}
        </p>
        <p className="text-[14px] leading-5 text-[#1b1c1c]">{opportunity}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[12px] font-medium uppercase tracking-[0.2px] text-[#4c4546]">
          {tOrganizar("focusLabel")}
        </p>
        <p className="text-[14px] leading-5 text-[#1b1c1c]">{focus}</p>
      </div>
    </div>
  );
}