import { useState } from 'react'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { useContent } from '../../context/ContentContext'

export default function GitHubSection() {
  const { profile } = useContent()
  const [chartFailed, setChartFailed] = useState(false)

  return (
    <Section id="github" eyebrow="07 — GitHub" title="Development activity">
      <Reveal className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <FiGithub aria-hidden /> @{profile.githubUser}
            </h3>
            <p className="mt-1 text-sm text-muted">My code, projects and learning, in public.</p>
          </div>
          <Button href={profile.github} target="_blank" rel="noopener noreferrer">
            View GitHub profile <FiArrowUpRight aria-hidden />
          </Button>
        </div>

        {!chartFailed && (
          <div className="mt-7 overflow-x-auto rounded-xl border border-line/10 bg-white p-3">
            {/* Rendered by ghchart from the public profile; hides itself if unavailable. */}
            <img
              src={`https://ghchart.rshah.org/8d7cff/${profile.githubUser}`}
              alt={`GitHub contribution chart for ${profile.githubUser}`}
              loading="lazy"
              onError={() => setChartFailed(true)}
              className="min-w-[640px]"
            />
          </div>
        )}
      </Reveal>
    </Section>
  )
}
