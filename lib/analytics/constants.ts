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

  // Atlas — LAB-001 y siguientes
  ATLAS_LAB_OPENED: 'atlas_lab_opened',
  ATLAS_LAB_STARTED: 'atlas_lab_started',
  ATLAS_QUESTION_ANSWERED: 'atlas_question_answered',
  ATLAS_CHECKPOINT_REACHED: 'atlas_checkpoint_reached',
  ATLAS_LAB_COMPLETED: 'atlas_lab_completed',
  ATLAS_RESULT_VIEWED_RETURNING: 'atlas_result_viewed_returning',
  ATLAS_RESULT_PDF_DOWNLOAD: 'atlas_result_pdf_download',
  ATLAS_RESULT_CONTACT_CLICK: 'atlas_result_contact_click',
  ATLAS_RESULT_NEXT_LAB_CLICK: 'atlas_result_next_lab_click',

  // CONTACT
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
} as const