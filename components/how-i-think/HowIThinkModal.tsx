"use client";

import { useEffect } from "react";
import IconControl from "@/components/interaction/IconControl";

interface HowIThinkModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function HowIThinkModal({
  isOpen,
  title,
  children,
  onClose,
}: HowIThinkModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-i-think-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-[#1a1a1a]/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-[#FFFCF6] shadow-2xl border border-[#E8E4DC]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6 border-b border-[#E8E4DC]">
          <h2
            id="how-i-think-modal-title"
            className="text-xl sm:text-2xl font-bold text-[#1a1a1a]"
          >
            {title}
          </h2>

          <IconControl
            label="Cerrar"
            onClick={onClose}
            className="hover:bg-[#00C3D0]/5"
          >
            ×
          </IconControl>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-6 sm:p-8 lg:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}