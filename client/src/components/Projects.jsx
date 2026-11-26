import { FiExternalLink, FiGithub, FiCheck } from 'react-icons/fi'
import Section from './Section'
import Reveal from './Reveal'
import ProjectPreview from './ProjectPreview'
import useProjects from '../hooks/useProjects'

export default function Projects() {
  const projects = useProjects()
  return (
    <Section id="projects" title="Featured projects" intro="Two full-stack builds, both live and deployed.">
      <div className="space-y-8">
        {projects.map((p, i) => (
          <Reveal key={p.id} as="article" className="card group grid gap-8 p-5 transition-colors duration-300 hover:border-accent/50 sm:p-8 lg:grid-cols-2 lg:items-center">
            <div className={`relative ${i % 2 ? 'lg:order-2' : ''}`}>
              <div className="transition-transform duration-500 group-hover:-translate-y-1"><ProjectPreview project={p} side={0} /></div>
              {p?.links?.length > 1 && (
                <div className="absolute -bottom-4 -right-2 hidden w-1/2 transition-transform duration-500 group-hover:translate-x-1 sm:block"><ProjectPreview project={p} side={1} /></div>
              )}
            </div>
            <div>
              <p className="text-sm text-accent">{p.kicker}</p>
              <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
              {p.features?.length > 0 && (
                <ul className="mt-5 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                  {p.features?.map((f) => <li key={f} className="flex items-start gap-2"><FiCheck aria-hidden className="mt-0.5 shrink-0 text-accent" />{f}</li>)}
                </ul>
              )}
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tech?.map((t) => <li key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{t}</li>)}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                {p?.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${l.primary ? 'btn-primary' : 'btn-ghost'}`}>
                    {l.label} <FiExternalLink aria-hidden /><span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><FiGithub aria-hidden /> GitHub</a>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
