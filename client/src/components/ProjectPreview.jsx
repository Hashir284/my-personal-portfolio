// Stand-in previews. Add `image` to a project in data/content.js to show a real screenshot instead.
const bar = 'rounded bg-line/10'
function Store() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-4">
      <div className="col-span-3 flex items-center justify-between"><div className={`${bar} h-3 w-20`} /><div className="flex gap-2"><div className={`${bar} h-3 w-8`} /><div className={`${bar} h-3 w-8`} /></div></div>
      <div className="col-span-3 h-16 rounded-lg bg-accent/25" />
      {[0, 1, 2].map((i) => <div key={i} className="space-y-2"><div className={`${bar} aspect-square`} /><div className={`${bar} h-2 w-3/4`} /><div className="h-2 w-1/3 rounded bg-accent/50" /></div>)}
    </div>
  )
}
function Admin() {
  return (
    <div className="grid h-full grid-cols-[28%_1fr] gap-3 p-4">
      <div className="space-y-2"><div className="h-3 w-12 rounded bg-accent/50" />{[0, 1, 2, 3].map((i) => <div key={i} className={`${bar} h-2.5`} />)}</div>
      <div className="space-y-2">{[0, 1, 2, 3, 4].map((i) => <div key={i} className="flex gap-2"><div className={`${bar} h-4 w-4`} /><div className={`${bar} h-4 flex-1`} /><div className="h-4 w-8 rounded bg-accent/30" /></div>)}</div>
    </div>
  )
}
function App() {
  return (
    <div className="grid h-full place-items-center p-4">
      <div className="w-full max-w-[16rem] space-y-3"><div className="h-4 w-24 rounded bg-accent/50" /><div className={`${bar} h-10`} /><div className="grid grid-cols-2 gap-3"><div className={`${bar} h-14`} /><div className={`${bar} h-14`} /></div></div>
    </div>
  )
}
export default function ProjectPreview({ project, side }) {
  const url = (project.links[side]?.href || project.links[0]?.href || '').replace('https://', '')
  const body = project.image ? <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="h-full w-full object-cover object-top" />
    : project.mock === 'store' ? (side === 1 ? <Admin /> : <Store />) : <App />
  return (
    <div className="overflow-hidden rounded-xl border border-line/15 bg-bg">
      <div className="flex items-center gap-2 border-b border-line/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line/30" /><span className="h-2 w-2 rounded-full bg-line/30" /><span className="h-2 w-2 rounded-full bg-line/30" />
        <span className="ml-2 truncate rounded bg-line/10 px-2 py-0.5 font-mono text-[10px] text-muted">{url}</span>
      </div>
      <div className="aspect-[16/10]" aria-hidden={!project.image}>{body}</div>
    </div>
  )
}
