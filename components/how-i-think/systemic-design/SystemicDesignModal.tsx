"use client";

// components/how-i-think/systemic-design/SystemicDesignModal.tsx
//
// Wrapper compatible del modal de Ecosistemas. La experiencia vive en
// SystemicDesignExperience.tsx (fuente única); este archivo solo conserva
// el shell modal calcado de LabModal.tsx (panel 873x1280/90vh, backdrop,
// paleta #fffcf6/#f4f4f4/#e4e0dc/#00c3d0) y delega todo el contenido.
// No duplicar pasos, navegación ni responsive aquí.

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import IconControl from "@/components/interaction/IconControl";
import SystemicDesignExperience from "./SystemicDesignExperience";

interface SystemicDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function SystemicDesignModal({ isOpen, onClose }: SystemicDesignModalProps) {
  const t = useTranslations("howIThinkPage.ecosystem");

  function handleClose() {
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-0 backdrop-blur-none md:p-4 md:backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="systemic-design-modal-title"
        >
          <motion.div
            className="relative flex h-[100dvh] w-full overflow-hidden rounded-none bg-[#fffcf6] shadow-2xl md:h-[873px] md:max-h-[90vh] md:w-full md:max-w-[1280px] md:rounded-[22px]"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconControl
              label={t("close")}
              onClick={handleClose}
              framed={false}
              className="absolute right-4 top-4 z-20 md:right-6 md:top-6"
            >
              <CloseIcon />
            </IconControl>

            <SystemicDesignExperience />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}