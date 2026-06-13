// lib/analytics/constants.ts
export const GA_EVENTS = {
  // Contacto
  CONTACT_EMAIL_CLICK: 'contact_email_click',
  CONTACT_LINKEDIN_CLICK: 'contact_linkedin_click',
  CONTACT_GITHUB_CLICK: 'contact_github_click',

  // Proyectos
  PROJECT_CARD_CLICK: 'project_card_click',
  CASE_STUDY_TAB_CHANGE: 'case_study_tab_change',
  CASE_STUDY_COMPLETED: 'case_study_completed',

  // Home
  HERO_CTA_CLICK: 'hero_cta_click',
  HERO_SCROLL: 'hero_scroll',

  // Navegación
  NAV_LINK_CLICK: 'nav_link_click',
  LOCALE_SWITCH: 'locale_switch',

  // NEXA LAB
  NEXALAB_INTERACTION: 'nexalab_interaction',

  // CONTACT
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
} as const