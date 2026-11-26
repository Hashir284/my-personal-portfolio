import Section from './Section'
import Reveal from './Reveal'
import { useContent } from '../ContentContext'

export default function Education() {
  const { timeline } = useContent()
  return (
    <Section id="education" title="Education & learning journey">
      <ol className="relative ml-3 space-y-8 border-l border-line/20">
        {timeline.map((t, i) => (
          <Reveal as="li" key={t.title} delay={i * 100} className="pl-8">
            <span aria-hidden className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent ${i === 0 ? 'bg-accent' : 'bg-bg'}`} />
            <p className="text-sm text-accent">{[t.status, t.period].filter(Boolean).join(' · ')}</p>
            <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
            <p className="text-muted">{t.place}</p>
            {t.note && <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{t.note}</p>}
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
