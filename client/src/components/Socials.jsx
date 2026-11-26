import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useContent } from '../ContentContext'
export default function Socials({ className = '' }) {
  const { profile } = useContent()
  const items = [
    { href: profile.github, label: 'GitHub', Icon: FiGithub, ext: true },
    { href: profile.linkedin, label: 'LinkedIn', Icon: FiLinkedin, ext: true },
    { href: `mailto:${profile.email}`, label: 'Email', Icon: FiMail },
  ]
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon, ext }) => (
        <li key={label}>
          <a href={href} aria-label={label} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="grid h-10 w-10 place-items-center rounded-full border border-line/20 text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
            <Icon aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  )
}
