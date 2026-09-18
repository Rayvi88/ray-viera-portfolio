"use client";

import { useState } from "react";
import HowIThinkModal from "./HowIThinkModal";
import SystemicDesignModal from "./systemic-design/SystemicDesignModal";
import { FOCUS_RING, TRANSITION_MICRO } from "@/components/interaction/tokens";

interface HowIThinkInteractiveProps {
  systems: string[];
}

export default function HowIThinkInteractive({
  systems,
}: HowIThinkInteractiveProps) {
  const [activeSystem, setActiveSystem] = useState<number | null>(null);
  const [isSystemicDesignOpen, setIsSystemicDesignOpen] = useState(false);

  // ASUNCIÓN A CONFIRMAR: el tag índice 0 ("Ecosistemas") es el que abre el
  // modal "Diseño Sistémico" — es el primero de los 3 tags de systems y el
  // primer modal según el PK ("el primero de 3 modales... empezando por
  // Diseño Sistémico"). Los índices 1 y 2 ("Arquitectura y Conexión",
  // "Escalabilidad Autónoma") siguen con el placeholder genérico hasta que
  // construyamos esos 2 modales.
  function handleTagClick(i: number) {
    if (i === 0) {
      setIsSystemicDesignOpen(true);
    } else {
      setActiveSystem(i);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {systems.map((label, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleTagClick(i)}
            className={`inline-flex items-center px-4 py-2 min-h-[44px] text-[10px] sm:text-xs font-medium tracking-[0.1em] uppercase rounded-full bg-[#1a1a1a] text-[#FFFCF6] ${TRANSITION_MICRO} hover:bg-[#00C3D0] ${FOCUS_RING}`}
          >
            {label}
          </button>
        ))}
      </div>

      <SystemicDesignModal
        isOpen={isSystemicDesignOpen}
        onClose={() => setIsSystemicDesignOpen(false)}
      />

      <HowIThinkModal
        isOpen={activeSystem !== null}
        title={
          activeSystem !== null
            ? systems[activeSystem]
            : ""
        }
        onClose={() => setActiveSystem(null)}
      >
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-[#1a1a1a]/60">
            Contenido de{" "}
            {activeSystem !== null
              ? systems[activeSystem]
              : ""}
          </p>
        </div>
      </HowIThinkModal>
    </>
  );
}