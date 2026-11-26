import { AdminMockup, AppMockup, StoreMockup } from './mockups'

function Mockup({ project, side }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
    )
  }
  if (project.mock === 'store') return side === 1 ? <AdminMockup /> : <StoreMockup />
  return <AppMockup />
}

/** A small browser window; uses a real screenshot when the admin uploaded one. */
export default function ProjectPreview({ project, side = 0 }) {
  const url = (project.links?.[side]?.href || project.links?.[0]?.href || '').replace(/^https?:\/\//, '')

  return (
    <div className="overflow-hidden rounded-xl border border-line/10 bg-bg">
      <div className="flex items-center gap-2 border-b border-line/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line/30" />
        <span className="h-2 w-2 rounded-full bg-line/30" />
        <span className="h-2 w-2 rounded-full bg-line/30" />
        <span className="ml-2 truncate rounded bg-line/10 px-2 py-0.5 font-mono text-[10px] text-muted">{url}</span>
      </div>
      <div className="aspect-[16/10]" aria-hidden={!project.image}>
        <Mockup project={project} side={side} />
      </div>
    </div>
  )
}
