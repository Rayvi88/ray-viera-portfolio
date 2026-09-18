// lib/analytics/constants.ts
// Taxonomía mínima GA4 — NEXA (10 eventos).
// Reglas: valores estables en inglés técnico o slugs de ruta, nunca texto
// de UI traducido. Idioma (ES/EN) vía page_location, nunca como parámetro.
export const GA_EVENTS = {
  // E1 — Entrada/intención desde home
  HERO_CTA_CLICK: 'hero_cta_click',

  // E2 — Interacción idioma
  LOCALE_SWITCH: 'locale_switch',

  // E3 — Entrada a case study
  CASE_STUDY_ENTRY: 'case_study_entry',

  // E4 — Progreso en case study
  CASE_STUDY_PROGRESS: 'case_study_progress',

  // E5 — Conversión contacto
  CONTACT_INTENT: 'contact_intent',

  // Atlas LAB-001
  ATLAS_LAB_STARTED: 'atlas_lab_started', // E6 — entrada al funnel
  ATLAS_QUESTION_ANSWERED: 'atlas_question_answered', // E7 — interacción
  ATLAS_LAB_COMPLETED: 'atlas_lab_completed', // E8 — fin de funnel
  ATLAS_RESULT_PDF_DOWNLOAD: 'atlas_result_pdf_download', // E9 — conversión
  ATLAS_RESULT_CONTACT_CLICK: 'atlas_result_contact_click', // E10 — conversión puente
} as const
