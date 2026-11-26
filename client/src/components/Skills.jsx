import Section from './Section'
import Reveal from './Reveal'
import { getIcon } from '../data/icons'
import { useContent } from '../ContentContext'

export default function Skills() {
  const { skills } = useContent()
  return (
    <Section id="skills" title="Technical skills" intro="React.js and frontend development are my strongest areas. Everything marked as improving is what I’m actively practising through projects and training.">
      <div className="mb-6 flex flex-wrap gap-5 text-sm text-muted" aria-label="Legend">
        <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-accent" /> Strongest</span>
        <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full border border-muted" /> Actively learning and improving</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => {
          const GIcon = getIcon(g.icon)
          const items = g.items.filter((x) => x.published !== false)
          if (!items.length) return null
          const strong = items.every((x) => x.level === 'core')
          return (
            <Reveal key={g.title} delay={(i % 3) * 80} className={`card p-6 ${strong ? 'border-accent/40 lg:col-span-2' : ''}`}>
              <h3 className="mb-5 flex items-center gap-3 text-lg font-bold"><GIcon aria-hidden className="text-accent" />{g.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((it) => {
                  const Icon = getIcon(it.icon)
                  return (
                    <li key={it.name} className="inline-flex items-center gap-2 rounded-full border border-line/15 px-3 py-1.5 text-sm transition hover:-translate-y-0.5 hover:border-accent/60">
                      <Icon aria-hidden className="text-muted" />{it.name}
                      {it.level && <i aria-label={it.level === 'core' ? 'Strongest' : 'Actively improving'} className={`h-2 w-2 rounded-full ${it.level === 'core' ? 'bg-accent' : 'border border-muted'}`} />}
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
