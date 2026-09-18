// lib/analytics/events.ts
import { sendGAEvent } from '@next/third-parties/google'
import { GA_EVENTS } from './constants'

// Helper base
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  sendGAEvent('event', eventName, params ?? {})
}

// — E1 — Home: cta ∈ { atlas_lab_001, contact, selected_works } —
export const trackHeroCtaClick = (cta: string) =>
  trackEvent(GA_EVENTS.HERO_CTA_CLICK, { cta })

// — E2 — Navegación: from/to ∈ { en, es } —
export const trackLocaleSwitch = (from: string, to: string) =>
  trackEvent(GA_EVENTS.LOCALE_SWITCH, { from, to })

// — E3 — Entrada a case study —
// caseStudyId: slug canónico de ruta (ver §3 taxonomía).
// origin ∈ { selected_works, strategic_explorations }.
// Entradas directas/externas: sin evento (page views + page_referrer).
export const trackCaseStudyEntry = (caseStudyId: string, origin: string) =>
  trackEvent(GA_EVENTS.CASE_STUDY_ENTRY, {
    case_study_id: caseStudyId,
    origin,
  })

// — E4 — Progreso en case study: milestone ∈ { half, full } —
// half: ≥ ceil(N/2) tabs distintos. full: N tabs distintos.
// Entrar al último tab NO equivale a full. Una vez por hito e instancia.
export const trackCaseStudyProgress = (caseStudyId: string, milestone: string) =>
  trackEvent(GA_EVENTS.CASE_STUDY_PROGRESS, {
    case_study_id: caseStudyId,
    milestone,
  })

// — E5 — Contacto: action ∈ { email_open, email_copy, linkedin_open } —
// Las tres acciones se analizan por separado. Sin parámetro de contexto
// ni idioma (page_referrer + page_location).
export const trackContactIntent = (action: string) =>
  trackEvent(GA_EVENTS.CONTACT_INTENT, { action })

// — E6 — Atlas: inicio explícito único. lab_id ∈ { lab-001 } —
// NO disparar en apertura/resume automático del modal.
export const trackAtlasLabStarted = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_LAB_STARTED, { lab_id: labId })

// — E7 — Atlas: respuesta. question_id = clave de dimensión —
// { assets, access, autonomy, documentation, operation, approvals }.
// Sin question_index numérico, sin tier, sin dimension separada.
export const trackAtlasQuestionAnswered = (labId: string, questionId: string) =>
  trackEvent(GA_EVENTS.ATLAS_QUESTION_ANSWERED, {
    lab_id: labId,
    question_id: questionId,
  })

// — E8 — Atlas: fin de funnel. band ∈ { low, mid, high } —
export const trackAtlasLabCompleted = (
  labId: string,
  overallScore: number,
  band: string
) =>
  trackEvent(GA_EVENTS.ATLAS_LAB_COMPLETED, {
    lab_id: labId,
    overall_score: overallScore,
    band,
  })

// — E9 — Atlas: descarga PDF —
export const trackAtlasResultPdfDownload = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_RESULT_PDF_DOWNLOAD, { lab_id: labId })

// — E10 — Atlas: puente a contacto (click de salida; la acción en
// destino se mide en E5, no sumar ambos como dos conversiones) —
export const trackAtlasResultContactClick = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_RESULT_CONTACT_CLICK, { lab_id: labId })
