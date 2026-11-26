import Section from './Section'
import Reveal from './Reveal'
import CodeCard from './CodeCard'
import { useContent } from '../ContentContext'

export default function About() {
  const { about, portrait, profile } = useContent()
  return (
    <Section id="about" title="A frontend developer growing into full-stack.">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Reveal className="space-y-5 leading-relaxed text-muted">
          {/* {
            portrait != '/none' && (
              <img src={portrait} alt="" aria-hidden loading="lazy" width="96" height="96" className="h-24 w-24 rounded-full object-cover ring-1 ring-line/20" />
            )
          } */}
          {about.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
        </Reveal>
        <Reveal delay={120} className="space-y-3">
          <CodeCard />
          <dl className="grid grid-cols-2 gap-3">
            {about.facts.map((f) => (
              <div key={f.label} className="card p-5"><dt className="font-display text-3xl font-bold text-accent">{f.big}</dt><dd className="mt-1 text-sm text-muted">{f.label}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
      <p className="sr-only">{profile.name}</p>
    </Section>
  )
}
