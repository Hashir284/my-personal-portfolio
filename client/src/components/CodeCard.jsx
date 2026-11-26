import { motion } from 'framer-motion'

const k = 'text-accent', s = 'text-emerald-400', p = 'text-muted'
// Only real facts from the CV appear here.
const lines = [
  [[k, 'const'], [null, ' developer = {']],
  [[null, '  name: '], [s, '"Muhammad Hashir"'], [p, ',']],
  [[null, '  location: '], [s, '"Karachi, Pakistan"'], [p, ',']],
  [[null, '  strongest: '], [s, '"React.js"'], [p, ',']],
  [[null, '  growingInto: '], [p, '['], [s, '"Next.js"'], [p, ', '], [s, '"Node.js"'], [p, ', '], [s, '"Express"'], [p, ', '], [s, '"MongoDB"'], [p, '],']],
  [[null, '  learning: '], [p, '['], [s, '"TypeScript"'], [p, ', '], [s, '"PostgreSQL"'], [p, '],']],
  [[null, '  training: '], [s, '"SMIT · MERN Stack"'], [p, ',']],
  [[null, '  fullStackProjects: '], [k, '2'], [p, ',']],
  [[null, '};']],
]
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const line = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.35 } } }

export default function CodeCard() {
  return (
    <div role="img" aria-label="Code snippet summarising Muhammad Hashir’s profile" className="glass rounded-2xl border border-line/15">
      <div className="flex items-center gap-2 border-b border-line/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-amber-300/80" /><span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-muted">developer.js</span>
      </div>
      <motion.pre variants={wrap} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
        <code>
          {lines.map((parts, i) => (
            <motion.div key={i} variants={line}>
              {parts.map(([c, t], j) => <span key={j} className={c || ''}>{t}</span>)}
              {i === lines.length - 1 && <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent" />}
            </motion.div>
          ))}
        </code>
      </motion.pre>
    </div>
  )
}
