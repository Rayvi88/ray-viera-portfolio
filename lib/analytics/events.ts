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

// — Contacto —
export const trackEmailClick = () =>
  trackEvent(GA_EVENTS.CONTACT_EMAIL_CLICK)

export const trackLinkedInClick = () =>
  trackEvent(GA_EVENTS.CONTACT_LINKEDIN_CLICK)

export const trackGitHubClick = () =>
  trackEvent(GA_EVENTS.CONTACT_GITHUB_CLICK)

// — Proyectos —
export const trackProjectCardClick = (projectName: string) =>
  trackEvent(GA_EVENTS.PROJECT_CARD_CLICK, { project_name: projectName })

export const trackCaseStudyTabChange = (casStudy: string, tabName: string) =>
  trackEvent(GA_EVENTS.CASE_STUDY_TAB_CHANGE, {
    case_study: casStudy,
    tab_name: tabName,
  })

export const trackCaseStudyCompleted = (caseStudy: string) =>
  trackEvent(GA_EVENTS.CASE_STUDY_COMPLETED, { case_study: caseStudy })

// — Home —
export const trackHeroCtaClick = (cta: string) =>
  trackEvent(GA_EVENTS.HERO_CTA_CLICK, { cta })

export const trackHeroScroll = () =>
  trackEvent(GA_EVENTS.HERO_SCROLL)

// — Navegación —
export const trackNavLinkClick = (destination: string) =>
  trackEvent(GA_EVENTS.NAV_LINK_CLICK, { destination })

export const trackLocaleSwitch = (from: string, to: string) =>
  trackEvent(GA_EVENTS.LOCALE_SWITCH, { from, to })

// — NEXA LAB —
export const trackNexaLabInteraction = (action: string) =>
  trackEvent(GA_EVENTS.NEXALAB_INTERACTION, { action })

// — Atlas — LAB-001 y siguientes —
export const trackAtlasLabOpened = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_LAB_OPENED, { lab_id: labId })

export const trackAtlasLabStarted = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_LAB_STARTED, { lab_id: labId })

export const trackAtlasQuestionAnswered = (
  labId: string,
  dimension: string,
  questionIndex: number,
  tier: number
) =>
  trackEvent(GA_EVENTS.ATLAS_QUESTION_ANSWERED, {
    lab_id: labId,
    dimension,
    question_index: questionIndex,
    tier,
  })

export const trackAtlasCheckpointReached = (
  labId: string,
  group: string,
  tier: string
) => trackEvent(GA_EVENTS.ATLAS_CHECKPOINT_REACHED, { lab_id: labId, group, tier })

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

export const trackAtlasResultViewedReturning = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_RESULT_VIEWED_RETURNING, { lab_id: labId })

export const trackAtlasResultPdfDownload = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_RESULT_PDF_DOWNLOAD, { lab_id: labId })

export const trackAtlasResultContactClick = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_RESULT_CONTACT_CLICK, { lab_id: labId })

export const trackAtlasResultNextLabClick = (labId: string) =>
  trackEvent(GA_EVENTS.ATLAS_RESULT_NEXT_LAB_CLICK, { lab_id: labId })

// — Contact —
export const trackContactFormSubmit = () =>
  trackEvent(GA_EVENTS.CONTACT_FORM_SUBMIT)

// — About Me —
export const trackAboutMeOpened = () =>
  trackEvent(GA_EVENTS.ABOUT_ME_OPENED)

export const trackAboutMeClosed = () =>
  trackEvent(GA_EVENTS.ABOUT_ME_CLOSED)

export const trackAboutMePhotoReveal = () =>
  trackEvent(GA_EVENTS.ABOUT_ME_PHOTO_REVEAL)

export const trackAboutMeIconHovered = (icon: string) =>
  trackEvent(GA_EVENTS.ABOUT_ME_ICON_HOVERED, { icon_label: icon })