import Section from './Section'
import Reveal from './Reveal'
import { getIcon } from '../data/icons'
import { useContent } from '../ContentContext'

export default function WhatIDo() {
  const { services } = useContent()
  return (
    <Section id="services" title="What I do">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.filter((s) => s.published !== false).map((s, i) => {
          const Icon = getIcon(s.icon)
          return (
            <Reveal as="li" key={s.title} delay={(i % 3) * 80} className="card p-6 transition-colors hover:border-accent/50">
              <Icon aria-hidden className="text-2xl text-accent" />
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
