import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import ImageLightbox from '../ui/ImageLightbox'
import { useContent } from '../../context/ContentContext'

export default function Certificates() {
  const { certificates } = useContent()
  const [preview, setPreview] = useState(null)
  const list = certificates.filter((certificate) => certificate.published !== false)

  return (
    <Section id="certificates" eyebrow="05 — Certificates" title="Certificates & achievements">
      {!list.length && <p className="text-muted">Certificates will appear here.</p>}

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((certificate, index) => (
          <Reveal
            as="li"
            key={`${certificate.image}-${index}`}
            delay={(index % 3) * 80}
            className="card group overflow-hidden transition-colors hover:border-accent/40"
          >
            <button
              onClick={() => setPreview(certificate)}
              className="relative block w-full overflow-hidden"
              aria-label={`View ${certificate.title} certificate`}
            >
              <img
                src={certificate.image}
                alt={`${certificate.title} certificate thumbnail`}
                loading="lazy"
                width="800"
                className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                View certificate
              </span>
            </button>

            <div className="space-y-1 p-5">
              <h3 className="flex items-center gap-2 font-bold">
                <FiAward aria-hidden className="text-accent" />
                {certificate.title}
              </h3>
              {certificate.event && <p className="text-sm">{certificate.event}</p>}
              <p className="text-sm text-muted">
                {[certificate.organization, certificate.duration, certificate.issueDate]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              {certificate.number && (
                <p className="font-mono text-xs text-muted">{certificate.number}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {preview && (
          <ImageLightbox
            image={preview.image}
            title={`${preview.title}${preview.event ? `: ${preview.event}` : ''}`}
            caption={preview.event || preview.title}
            onClose={() => setPreview(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
