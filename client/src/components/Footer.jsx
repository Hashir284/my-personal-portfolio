import { navLinks } from '../data/content'
import { useContent } from '../ContentContext'
import Socials from './Socials'
export default function Footer() {
  const { profile, settings } = useContent()
  return (
    <footer className="border-t border-line/10 py-10">
      <div className="container-x grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-extrabold">hashir<span className="text-accent">.dev</span></p>
          <p className="mt-2 max-w-sm text-sm text-muted">{settings.footerText}</p>
          <Socials className="mt-4" />
        </div>
        <nav aria-label="Footer"><ul className="grid grid-cols-2 gap-2 text-sm text-muted">
          {navLinks.map((l) => <li key={l.id}><a href={`#${l.id}`} className="transition hover:text-fg">{l.label}</a></li>)}
        </ul></nav>
        <ul className="space-y-2 text-sm text-muted">
          <li><a href={`mailto:${profile.email}`} className="hover:text-fg">{profile.email}</a></li>
          <li><a href={profile.phoneHref} className="hover:text-fg">{profile.phone}</a></li>
          <li>{profile.location}</li>
        </ul>
      </div>
      <p className="container-x mt-8 text-sm text-muted">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  )
}
