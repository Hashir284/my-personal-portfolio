import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { getIcon } from '../../data/icons'
import { useContent } from '../../context/ContentContext'

function SkillChip({ skill }) {
  const Icon = getIcon(skill.icon)
  const levelLabel = skill.level === 'core' ? 'Strongest' : 'Actively improving'

  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-line/10 px-3 py-1.5 text-sm transition hover:-translate-y-0.5 hover:border-accent/60">
      <Icon aria-hidden className="text-muted" />
      {skill.name}
      {skill.level && (
        <i
          aria-label={levelLabel}
          className={`h-2 w-2 rounded-full ${skill.level === 'core' ? 'bg-accent' : 'border border-muted'}`}
        />
      )}
    </li>
  )
}

export default function Skills() {
  const { skills } = useContent()

  return (
    <Section
      id="skills"
      eyebrow="02 — Skills"
      title="Technical skills"
      intro="React.js and frontend development are my strongest areas. Everything marked as improving is what I’m actively practising through projects and training."
    >
      <div className="mb-8 flex flex-wrap gap-6 text-sm text-muted" aria-label="Legend">
        <span className="inline-flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full bg-accent" /> Strongest
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full border border-muted" /> Actively learning and improving
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => {
          const GroupIcon = getIcon(group.icon)
          const items = group.items.filter((item) => item.published !== false)
          if (!items.length) return null

          const allCore = items.every((item) => item.level === 'core')

          return (
            <Reveal
              key={group.title}
              delay={(index % 3) * 80}
              className={`card p-6 ${allCore ? 'border-accent/40 lg:col-span-2' : ''}`}
            >
              <h3 className="mb-5 flex items-center gap-3 text-lg font-bold">
                <GroupIcon aria-hidden className="text-accent" />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
