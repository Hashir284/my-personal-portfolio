import { FiArrowUp } from 'react-icons/fi'
import { navLinks } from '../../data/nav'
import { useContent } from '../../context/ContentContext'
import Socials from './Socials'

export default function Footer() {
  const { profile, settings } = useContent()

  return (
    <footer className="border-t mt-8 border-line/10">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-extrabold">
            hashir<span className="text-accent">.dev</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{settings.footerText}</p>
          <Socials className="mt-5" />
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="transition hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${profile.email}`} className="transition hover:text-fg">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.phoneHref} className="transition hover:text-fg">
                {profile.phone}
              </a>
            </li>
            <li>{profile.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 transition hover:text-fg">
            Back to top <FiArrowUp aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
