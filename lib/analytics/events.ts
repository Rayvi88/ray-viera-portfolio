// lib/analytics/events.ts
import { sendGAEvent } from '@next/third-parties/google'
import { GA_EVENTS } from './constants'

// Helper base
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  sendGAEvent('event', eventName, params)
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
export const trackHeroCtaClick = () =>
  trackEvent(GA_EVENTS.HERO_CTA_CLICK)

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

// — CONTACT —
export const trackContactFormSubmit = () =>
  trackEvent(GA_EVENTS.CONTACT_FORM_SUBMIT)