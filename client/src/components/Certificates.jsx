import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiZoomIn, FiZoomOut, FiAward } from 'react-icons/fi'
import Section from './Section'
import Reveal from './Reveal'
import { useContent } from '../ContentContext'

function Lightbox({ cert, onClose }) {
  const [zoom, setZoom] = useState(false)
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={cert.title} onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm">
      <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.94, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96 }} transition={{ duration: 0.25 }}
        className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line/20 bg-surface">
        <div className="flex items-center justify-between gap-3 border-b border-line/10 px-4 py-3">
          <p className="truncate font-medium">{cert.event || cert.title}</p>
          <div className="flex gap-2">
            <button onClick={() => setZoom((z) => !z)} aria-label={zoom ? 'Zoom out' : 'Zoom in'} className="grid h-9 w-9 place-items-center rounded-full border border-line/20 hover:border-accent">{zoom ? <FiZoomOut /> : <FiZoomIn />}</button>
            <button ref={closeRef} onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-line/20 hover:border-accent"><FiX /></button>
          </div>
        </div>
        <div className="overflow-auto bg-bg p-2">
          <img src={cert.image} alt={`${cert.title}${cert.event ? `: ${cert.event}` : ''}`} style={{ width: zoom ? '200%' : '100%', maxWidth: zoom ? 'none' : '100%' }} className="mx-auto block h-auto transition-[width] duration-300" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certificates() {
  const { certificates } = useContent()
  const [open, setOpen] = useState(null)
  const list = certificates.filter((c) => c.published !== false)
  return (
    <Section id="certificates" title="Certificates & achievements">
      {!list.length && <p className="text-muted">Certificates will appear here.</p>}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <Reveal as="li" key={c.image + i} delay={(i % 3) * 80} className="card group overflow-hidden transition-colors hover:border-accent/50">
            <button onClick={() => setOpen(c)} className="block w-full overflow-hidden text-left" aria-label={`View ${c.title} certificate`}>
              <img src={c.image} alt={`${c.title} certificate thumbnail`} loading="lazy" width="800" className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
            </button>
            <div className="space-y-1 p-5">
              <h3 className="flex items-center gap-2 font-bold"><FiAward aria-hidden className="text-accent" />{c.title}</h3>
              {c.event && <p className="text-sm">{c.event}</p>}
              <p className="text-sm text-muted">{[c.organization, c.duration, c.issueDate].filter(Boolean).join(' · ')}</p>
              {c.number && <p className="font-mono text-xs text-muted">{c.number}</p>}
              <button onClick={() => setOpen(c)} className="btn btn-ghost mt-3 !py-1.5">View certificate</button>
            </div>
          </Reveal>
        ))}
      </ul>
      <AnimatePresence>{open && <Lightbox cert={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  )
}
