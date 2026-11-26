import { FiArrowUpRight } from 'react-icons/fi'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import CodeCard from '../ui/CodeCard'
import Button from '../ui/Button'
import { useContent } from '../../context/ContentContext'

export default function About() {
  const { about, profile } = useContent()

  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title="A frontend developer growing into full-stack."
      aside={
        <Button href={profile.resume} download variant="ghost">
          Résumé <FiArrowUpRight aria-hidden />
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Reveal className="min-w-0 space-y-5 leading-relaxed text-muted">
          {about.paragraphs.map((text, index) => (
            <p key={index} className={index === 0 ? 'text-fg' : undefined}>
              {text}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120} className="min-w-0 space-y-4">
          <CodeCard />
          <dl className="grid grid-cols-2 gap-4">
            {about.facts.map((fact) => (
              <div key={fact.label} className="card p-5">
                <dt className="font-display text-3xl font-bold text-accent">{fact.big}</dt>
                <dd className="mt-1 text-sm leading-snug text-muted">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <p className="sr-only">{profile.name}</p>
    </Section>
  )
}
