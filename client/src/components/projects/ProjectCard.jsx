import { FiCheck, FiExternalLink, FiGithub } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import ProjectPreview from './ProjectPreview'

export default function ProjectCard({ project, index }) {
  const flipped = index % 2 === 1

  return (
    <Reveal as="article" className="card group grid gap-8 p-5 transition-colors duration-300 hover:border-accent/40 sm:p-8 lg:grid-cols-2 lg:items-center">
      <div className={`relative ${flipped ? 'lg:order-2' : ''}`}>
        <div className="transition-transform duration-500 group-hover:-translate-y-1">
          <ProjectPreview project={project} />
        </div>
        {project.links?.length > 1 && (
          <div className="absolute -bottom-6 right-0 hidden w-[46%] transition-transform duration-500 group-hover:translate-x-1 sm:block">
            <ProjectPreview project={project} side={1} />
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-accent">{project.kicker}</p>
        <h3 className="mt-1.5 font-display text-2xl font-bold sm:text-3xl">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        {project.features?.length > 0 && (
          <ul className="mt-5 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <FiCheck aria-hidden className="mt-0.5 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {project.tech?.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          {project.links?.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              variant={link.primary ? 'primary' : 'ghost'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} <FiExternalLink aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          ))}
          {project.github && (
            <Button href={project.github} variant="ghost" target="_blank" rel="noopener noreferrer">
              <FiGithub aria-hidden /> GitHub
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  )
}
