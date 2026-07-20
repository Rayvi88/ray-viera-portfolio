"use client";

import { useEffect, useState } from "react";
import LabModal from "@/components/atlas/LabModal";
import NexaLabsEssay from "@/components/NexaLabsEssay";
import { computeLab001Result } from "@/components/atlas/lab001-data";

export default function AtlasLab001() {
  const [isOpen, setIsOpen] = useState(false);

  // Team-only testing helper: visiting this page with ?reset=1 clears the saved
  // LAB-001 result before it loads, so we can walk the full flow again without
  // digging into devtools every time. Not linked from anywhere, not visible to visitors.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1") {
      window.localStorage.removeItem("atlas:lab001:answers");
      return;
    }

    // If this visitor already has a saved (complete) result — e.g. arriving from
    // the "Ver resultado" link on /atlas — open the modal straight away instead
    // of making them click the article CTA again.
    try {
      const raw = window.localStorage.getItem("atlas:lab001:answers");
      if (!raw) return;
      const saved = JSON.parse(raw) as { answers?: Record<number, string> };
      if (saved?.answers && computeLab001Result(saved.answers)) {
        // Syncing with an external system (localStorage) on mount — intentional.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(true);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fffcf6]">
      <NexaLabsEssay onStartLab={() => setIsOpen(true)} />

      <LabModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        labTag="LAB-001 · ACTIVOS Y ORGANIZACIÓN"
      />
    </div>
  );
}