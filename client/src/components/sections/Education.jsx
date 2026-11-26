import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { useContent } from '../../context/ContentContext'

function TimelineItem({ entry, index, isFirst }) {
  return (
    <Reveal as="li" delay={index * 100} className="relative pl-8">
      <span
        aria-hidden
        className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent ${
          isFirst ? 'bg-accent' : 'bg-bg'
        }`}
      />
      <p className="text-sm font-medium text-accent">
        {[entry.status, entry.period].filter(Boolean).join(' · ')}
      </p>
      <h3 className="mt-1.5 font-display text-xl font-bold">{entry.title}</h3>
      <p className="text-muted">{entry.place}</p>
      {entry.note && <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{entry.note}</p>}
    </Reveal>
  )
}

export default function Education() {
  const { timeline } = useContent()

  return (
    <Section id="education" eyebrow="06 — Education" title="Education & learning journey">
      <ol className="relative ml-3 space-y-10 border-l border-line/20">
        {timeline.map((entry, index) => (
          <TimelineItem key={entry.title} entry={entry} index={index} isFirst={index === 0} />
        ))}
      </ol>
    </Section>
  )
}
