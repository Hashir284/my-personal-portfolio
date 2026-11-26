import { iconOptions } from './editors'

const t = (key, label, extra = {}) => ({ key, label, type: 'text', ...extra })
const ta = (key, label, extra = {}) => ({ key, label, type: 'textarea', ...extra })
const show = { key: 'published', label: 'Show on website', type: 'checkbox' }
const icon = { key: 'icon', label: 'Icon', type: 'select', options: iconOptions }
const portrait = { type: 'single', path: 'portrait', label: 'Profile photograph', accept: 'image/*' }

export const TITLES = {
  profile: ['Profile', 'Your personal information and photograph.'],
  hero: ['Hero section', 'The first thing visitors see.'],
  about: ['About me', 'Your story, photo and highlights.'],
  skills: ['Skills', 'Categories and technologies. Mark each as strongest or improving.'],
  certificates: ['Certificates', 'Upload, edit, reorder and publish certificates.'],
  education: ['Education', 'Your learning timeline.'],
  services: ['Services', 'What you offer.'],
  social: ['Social links', 'GitHub, LinkedIn and email.'],
  resume: ['Resume', 'Upload a PDF. The Resume button on your site uses it automatically.'],
  settings: ['Website settings', 'SEO, footer, announcement banner and which sections are visible.'],
}

export const BLOCKS = {
  profile: [
    { type: 'object', path: 'profile', fields: [t('name', 'Full name'), t('title', 'Professional title'), t('location', 'Location'), t('email', 'Email'), t('phone', 'Phone')] },
    portrait,
  ],
  hero: [
    { type: 'object', path: 'hero', fields: [t('headline', 'Main heading'), t('subtitle', 'Subtitle'), ta('intro', 'Description', { rows: 3 }), t('availability', 'Availability status (empty hides it)'), t('primaryText', 'Primary button text'), t('secondaryText', 'Secondary button text')] },
    portrait,
  ],
  about: [
    { type: 'strings', path: 'about.paragraphs', title: 'About paragraphs', addLabel: 'Add paragraph' },
    { type: 'list', path: 'about.facts', title: 'Highlights (only real facts)', labelKey: 'label', addLabel: 'Add highlight', newItem: { big: '', label: '' }, fields: [t('big', 'Big text (e.g. 2026)'), t('label', 'Label')] },
    portrait,
  ],
  skills: [
    { type: 'list', path: 'skills', title: 'Skill categories', labelKey: 'title', addLabel: 'Add category', newItem: { title: '', icon: 'code', items: [] },
      fields: [t('title', 'Category name'), icon, { key: 'items', label: 'Skills in this category', type: 'list', labelKey: 'name', addLabel: 'Add skill', newItem: { name: '', icon: 'code', level: '', published: true },
        fields: [t('name', 'Skill name'), icon, { key: 'level', label: 'Level', type: 'select', options: [{ value: '', label: 'No marker' }, { value: 'core', label: 'Strongest' }, { value: 'learning', label: 'Actively improving' }] }, show] }] },
  ],
  certificates: [
    { type: 'list', path: 'certificates', title: 'Certificates', labelKey: 'title', addLabel: 'Add certificate', newItem: { title: '', organization: '', event: '', issueDate: '', duration: '', number: '', image: '', published: true },
      fields: [t('title', 'Title'), t('organization', 'Issuing organization'), t('event', 'Event name'), t('issueDate', 'Issue date'), t('duration', 'Duration'), t('number', 'Certificate number'), { key: 'image', label: 'Certificate image', type: 'file', accept: 'image/*', wide: true }, show] },
  ],
  education: [
    { type: 'list', path: 'timeline', title: 'Timeline (top to bottom)', labelKey: 'title', addLabel: 'Add entry', newItem: { title: '', place: '', period: '', status: '', note: '' },
      fields: [t('title', 'Degree / program'), t('place', 'Institution'), t('period', 'Start – end date'), t('status', 'Status (Ongoing, Completed 2026…)'), ta('note', 'Description')] },
  ],
  services: [
    { type: 'list', path: 'services', title: 'Services', labelKey: 'title', addLabel: 'Add service', newItem: { title: '', icon: 'code', text: '', published: true }, fields: [t('title', 'Title'), icon, ta('text', 'Short description'), show] },
  ],
  social: [{ type: 'object', path: 'profile', fields: [t('github', 'GitHub URL'), t('linkedin', 'LinkedIn URL'), t('email', 'Email')] }],
  resume: [{ type: 'single', path: 'profile.resume', label: 'Resume (PDF, max 3 MB)', accept: 'application/pdf' }],
  settings: [
    { type: 'object', path: 'settings', fields: [t('siteTitle', 'Website title (browser tab & SEO)'), ta('siteDescription', 'Meta description', { rows: 2 }), t('announcement', 'Announcement banner (empty hides it)'), ta('footerText', 'Footer text', { rows: 2 })] },
    { type: 'object', path: 'settings.visibility', title: 'Section visibility', fields: ['about', 'skills', 'services', 'projects', 'certificates', 'education', 'github'].map((k) => ({ key: k, label: `Show ${k}`, type: 'checkbox' })) },
  ],
}
