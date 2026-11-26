import { FiGithub } from 'react-icons/fi'
import Section from '../ui/Section'
import Button from '../ui/Button'
import ProjectCard from '../projects/ProjectCard'
import useProjects from '../../hooks/useProjects'
import { useContent } from '../../context/ContentContext'

export default function Projects() {
  const projects = useProjects()
  const { profile } = useContent()

  return (
    <Section
      id="projects"
      eyebrow="04 — Projects"
      title="Featured projects"
      intro="Two full-stack builds, both live and deployed."
      aside={
        <Button href={profile.github} variant="ghost" target="_blank" rel="noopener noreferrer">
          <FiGithub aria-hidden /> More on GitHub
        </Button>
      }
    >
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
