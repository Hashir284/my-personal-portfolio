import { useState } from 'react'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import Section from './Section'
import Reveal from './Reveal'
import { useContent } from '../ContentContext'

export default function GitHubSection() {
  const { profile } = useContent()
  const [chartFailed, setChartFailed] = useState(false)
  return (
    <Section id="github" title="Development activity">
      <Reveal className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold"><FiGithub aria-hidden /> @{profile.githubUser}</h3>
            <p className="mt-1 text-sm text-muted">My code, projects and learning, in public.</p>
          </div>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View GitHub profile <FiArrowUpRight aria-hidden /></a>
        </div>
        {!chartFailed && (
          <div className="mt-7 overflow-x-auto rounded-xl border border-line/10 bg-white p-3">
            {/* Live contribution chart rendered by ghchart.rshah.org from the public GitHub profile. Hides itself if unavailable. */}
            <img src={`https://ghchart.rshah.org/7c6cff/${profile.githubUser}`} alt={`GitHub contribution chart for ${profile.githubUser}`} loading="lazy" onError={() => setChartFailed(true)} className="min-w-[640px]" />
          </div>
        )}
      </Reveal>
    </Section>
  )
}
