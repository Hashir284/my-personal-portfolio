import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { getIcon } from '../../data/icons'
import { useContent } from '../../context/ContentContext'

export default function Services() {
  const { services } = useContent()

  return (
    <Section id="services" eyebrow="03 — Services" title="What I do">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((service) => service.published !== false)
          .map((service, index) => {
            const Icon = getIcon(service.icon)

            return (
              <Reveal
                as="li"
                key={service.title}
                delay={(index % 3) * 80}
                className="card card-lift group p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line/10 bg-elevated text-accent transition group-hover:border-accent/50">
                  <Icon aria-hidden className="text-lg" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.text}</p>
              </Reveal>
            )
          })}
      </ul>
    </Section>
  )
}
