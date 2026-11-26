import { motion } from 'framer-motion'

const KEY = 'text-accent'
const STRING = 'text-emerald-400'
const PUNCT = 'text-muted'

/* Only real facts from the CV appear here. */
const LINES = [
  [[KEY, 'const'], [null, ' developer = {']],
  [[null, '  name: '], [STRING, '"Muhammad Hashir"'], [PUNCT, ',']],
  [[null, '  location: '], [STRING, '"Karachi, Pakistan"'], [PUNCT, ',']],
  [[null, '  strongest: '], [STRING, '"React.js"'], [PUNCT, ',']],
  [
    [null, '  growingInto: '],
    [PUNCT, '['],
    [STRING, '"Next.js"'],
    [PUNCT, ', '],
    [STRING, '"Node.js"'],
    [PUNCT, ', '],
    [STRING, '"Express"'],
    [PUNCT, ', '],
    [STRING, '"MongoDB"'],
    [PUNCT, '],'],
  ],
  [[null, '  learning: '], [PUNCT, '['], [STRING, '"TypeScript"'], [PUNCT, ', '], [STRING, '"PostgreSQL"'], [PUNCT, '],']],
  [[null, '  training: '], [STRING, '"SMIT · MERN Stack"'], [PUNCT, ',']],
  [[null, '  fullStackProjects: '], [KEY, '2'], [PUNCT, ',']],
  [[null, '};']],
]

const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } }
const line = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.35 } } }

export default function CodeCard() {
  return (
    <div
      role="img"
      aria-label="Code snippet summarising Muhammad Hashir's profile"
      className="overflow-hidden rounded-2xl border border-line/10 bg-surface/80 backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-line/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-300/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-muted">developer.js</span>
      </div>
      <motion.pre
        variants={wrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="overflow-x-auto p-5 font-mono text-[13px] leading-7"
      >
        <code>
          {LINES.map((parts, index) => (
            <motion.div key={index} variants={line}>
              {parts.map(([className, text], partIndex) => (
                <span key={partIndex} className={className || ''}>
                  {text}
                </span>
              ))}
              {index === LINES.length - 1 && (
                <span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent" />
              )}
            </motion.div>
          ))}
        </code>
      </motion.pre>
    </div>
  )
}
