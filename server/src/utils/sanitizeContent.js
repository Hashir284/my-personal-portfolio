import { CONTENT_SECTIONS } from '../config/constants.js'
import { asArray, asAssetUrl, asHttpUrl, asString, asStringList, isVisible } from './sanitize.js'

/* Each section below owns its own validation so the shape stays readable. */

const sanitizeProfile = (profile = {}) => ({
  name: asString(profile.name, 80),
  title: asString(profile.title, 120),
  location: asString(profile.location, 120),
  email: asString(profile.email, 200),
  phone: asString(profile.phone, 40),
  github: asHttpUrl(profile.github),
  linkedin: asHttpUrl(profile.linkedin),
  resume: asAssetUrl(profile.resume),
})

const sanitizeHero = (hero = {}) => ({
  headline: asString(hero.headline, 120),
  subtitle: asString(hero.subtitle, 120),
  intro: asString(hero.intro, 500),
  availability: asString(hero.availability, 80),
  primaryText: asString(hero.primaryText, 30),
  secondaryText: asString(hero.secondaryText, 30),
})

const sanitizeAbout = (about = {}) => ({
  paragraphs: asArray(about.paragraphs, 8)
    .map((text) => asString(text, 900))
    .filter(Boolean),
  facts: asArray(about.facts, 6)
    .map((fact) => ({ big: asString(fact?.big, 20), label: asString(fact?.label, 60) }))
    .filter((fact) => fact.big && fact.label),
})

const sanitizeSkills = (skills) =>
  asArray(skills, 12)
    .map((group) => ({
      title: asString(group?.title, 40),
      icon: asString(group?.icon, 30),
      items: asArray(group?.items, 40)
        .map((item) => ({
          name: asString(item?.name, 50),
          icon: asString(item?.icon, 30),
          level: ['core', 'learning'].includes(item?.level) ? item.level : '',
          published: isVisible(item?.published),
        }))
        .filter((item) => item.name),
    }))
    .filter((group) => group.title)

const sanitizeTimeline = (timeline) =>
  asArray(timeline, 10)
    .map((entry) => ({
      title: asString(entry?.title, 120),
      place: asString(entry?.place, 120),
      period: asString(entry?.period, 60),
      status: asString(entry?.status, 60),
      note: asString(entry?.note, 300),
    }))
    .filter((entry) => entry.title)

const sanitizeCertificates = (certificates) =>
  asArray(certificates, 30)
    .map((item) => ({
      title: asString(item?.title, 120),
      organization: asString(item?.organization, 120),
      event: asString(item?.event, 120),
      issueDate: asString(item?.issueDate, 40),
      duration: asString(item?.duration, 40),
      number: asString(item?.number, 80),
      image: asAssetUrl(item?.image),
      published: isVisible(item?.published),
    }))
    .filter((item) => item.title && item.image)

const sanitizeServices = (services) =>
  asArray(services, 12)
    .map((item) => ({
      title: asString(item?.title, 60),
      icon: asString(item?.icon, 30),
      text: asString(item?.text, 250),
      published: isVisible(item?.published),
    }))
    .filter((item) => item.title)

const sanitizeSettings = (settings = {}) => ({
  siteTitle: asString(settings.siteTitle, 90),
  siteDescription: asString(settings.siteDescription, 200),
  announcement: asString(settings.announcement, 200),
  footerText: asString(settings.footerText, 200),
  visibility: Object.fromEntries(
    CONTENT_SECTIONS.map((key) => [key, settings.visibility?.[key] !== false]),
  ),
})

/** Keep only the sections the client actually sent, fully sanitised. */
export function sanitizeContent(body = {}) {
  const output = {}
  if (body.profile) output.profile = sanitizeProfile(body.profile)
  if (body.hero) output.hero = sanitizeHero(body.hero)
  if (body.about) output.about = sanitizeAbout(body.about)
  if (body.skills) output.skills = sanitizeSkills(body.skills)
  if (body.timeline) output.timeline = sanitizeTimeline(body.timeline)
  if (body.certificates) output.certificates = sanitizeCertificates(body.certificates)
  if (body.services) output.services = sanitizeServices(body.services)
  if (body.settings) output.settings = sanitizeSettings(body.settings)
  if ('portrait' in body) output.portrait = asAssetUrl(body.portrait)
  return output
}

export function sanitizeProject(body = {}) {
  const links = asArray(body.links, 4)
    .map((link, index) => ({
      label: asString(link?.label, 40),
      href: asHttpUrl(link?.href),
      primary: index === 0,
    }))
    .filter((link) => link.label && link.href)

  return {
    title: asString(body.title, 120),
    kicker: asString(body.kicker, 120),
    description: asString(body.description, 1200),
    features: asStringList(body.features),
    tech: asStringList(body.tech, { max: 15 }),
    links,
    github: asHttpUrl(body.github),
    image: asAssetUrl(body.image),
    mock: body.mock === 'store' ? 'store' : 'app',
    featured: body.featured === true,
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    published: isVisible(body.published),
  }
}
