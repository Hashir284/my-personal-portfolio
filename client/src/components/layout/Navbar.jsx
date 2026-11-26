import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from 'react-icons/fi'
import { navLinks } from '../../data/nav'
import { useContent } from '../../context/ContentContext'
import useActiveSection from '../../hooks/useActiveSection'
import Button from '../ui/Button'

const sectionIds = navLinks.map((link) => link.id)

function NavLink({ link, active, onSelect, mobile = false }) {
  return (
    <a
      href={`#${link.id}`}
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={`relative inline-flex items-center rounded-full text-[0.9375rem] font-medium transition-colors ${
        mobile ? 'w-full justify-between px-4 py-3.5 text-[1.0625rem]' : 'px-2.5 py-1.5 xl:px-3.5 2xl:px-4'
      } ${active ? 'text-fg' : 'text-muted hover:text-fg'}`}
    >
      {active && !mobile && (
        <motion.span
          layoutId="nav-active"
          aria-hidden
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="absolute inset-0 rounded-full border border-line/10 bg-line/10"
        />
      )}
      <span className="relative">{link.label}</span>
      {mobile && active && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
    </a>
  )
}

export default function Navbar({ theme, onToggleTheme }) {
  const { profile, settings } = useContent()
  const links = navLinks.filter((link) => settings.visibility[link.id] !== false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const iconButton =
    'grid h-11 w-11 place-items-center rounded-full border border-line/20 text-[1.05rem] text-muted transition hover:border-accent hover:text-accent'

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line/10">
      <nav aria-label="Primary" className="container-x flex h-[4.5rem] items-center justify-between gap-3">
        <a
          href="#home"
          className="shrink-0 whitespace-nowrap font-display text-lg font-extrabold tracking-tight xl:text-xl"
        >
          hashir<span className="text-accent">.dev</span>
        </a>

        <div className="hidden min-w-0 items-center gap-0.5 overflow-x-auto rounded-full border border-line/10 bg-surface/50 p-1.5 lg:flex 2xl:gap-1" style={{ scrollbarWidth: 'none' }}>
          {links.map((link) => (
            <NavLink key={link.id} link={link} active={active === link.id} />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button href={profile.resume} download variant="ghost" className="hidden !py-2.5 sm:inline-flex">
            <FiDownload aria-hidden /> Resume
          </Button>
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className={iconButton}
          >
            {theme === 'dark' ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
          </button>
          <button
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className={`${iconButton} lg:hidden`}
          >
            {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x flex max-h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto border-t border-line/10 pb-5 pt-2 lg:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.id}
                link={link}
                active={active === link.id}
                onSelect={() => setOpen(false)}
                mobile
              />
            ))}
            <Button href={profile.resume} download className="mt-4">
              <FiDownload aria-hidden /> Download resume
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
