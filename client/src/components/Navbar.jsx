import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from 'react-icons/fi'
import { navLinks } from '../data/content'
import { useContent } from '../ContentContext'
import useActiveSection from '../hooks/useActiveSection'


export default function Navbar({ theme, onToggleTheme }) {
  const { profile, settings } = useContent()
  const links = navLinks.filter((l) => settings.visibility[l.id] !== false)
  const ids = useMemo(() => links.map((l) => l.id).join(','), [links]).split(',')
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const link = (l, mobile) => (
    <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} aria-current={active === l.id ? 'true' : undefined}
      className={`transition-colors hover:text-fg ${active === l.id ? 'text-fg' : 'text-muted'} ${mobile ? 'rounded-lg px-3 py-3 text-base' : 'text-sm'}`}>
      {l.label}
    </a>
  )
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line/10">
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-lg font-extrabold tracking-tight">
          hashir<span className="text-accent">.dev</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">{links.map((l) => link(l))}</div>
        <div className="flex items-center gap-2">
          <a href={profile.resume} download className="btn btn-ghost hidden !py-2 sm:inline-flex"><FiDownload aria-hidden /> Resume</a>
          <button onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid h-10 w-10 place-items-center rounded-full border border-line/20 text-muted transition hover:border-accent hover:text-accent">
            {theme === 'dark' ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line/20 lg:hidden">
            {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
      {open && (
        <motion.div id="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="container-x flex flex-col border-t border-line/10 pb-4 pt-2 lg:hidden">
          {links.map((l) => link(l, true))}
          <a href={profile.resume} download className="btn btn-primary mt-3"><FiDownload aria-hidden /> Download resume</a>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  )
}
