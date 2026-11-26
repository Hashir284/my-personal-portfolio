import { motion } from 'framer-motion'
import { SiReact, SiNodedotjs, SiMongodb } from 'react-icons/si'
import Socials from '../layout/Socials'
import Button from '../ui/Button'
import { useContent } from '../../context/ContentContext'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.7, 0.2, 1] } },
}

const FLOATING = [
  { label: 'React.js', Icon: SiReact, className: 'left-0 top-[8%] sm:-left-5', delay: 0 },
  { label: 'Node.js', Icon: SiNodedotjs, className: 'right-0 top-[43%] sm:-right-4', delay: 0.5 },
  { label: 'MongoDB', Icon: SiMongodb, className: 'bottom-[5%] left-[4%]', delay: 1 },
]

/** Split off the last two words so the headline can carry a gradient tail. */
function splitHeadline(headline = '') {
  const words = headline.trim().split(' ')
  if (words.length < 3) return [headline, '']
  return [words.slice(0, -2).join(' '), words.slice(-2).join(' ')]
}

export default function Hero() {
  const { hero, portrait, profile, skills } = useContent()
  const [lead, tail] = splitHeadline(hero.headline)
  const stack = skills
    .flatMap((group) => group.items)
    .filter((skill) => skill.level === 'core' && skill.published !== false)
    .slice(0, 6)

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-10 pt-28 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]"
      />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          {hero.availability && (
            <motion.p variants={item}>
              <span className="chip border-line/20 px-3.5 py-1.5 text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {hero.availability}
              </span>
            </motion.p>
          )}

          <motion.p variants={item} className="mt-6 text-lg text-muted">
            Hi, I’m <span className="font-medium text-fg">{profile.name}</span>
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-title"
            className="mt-3 text-balance font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.1rem]"
          >
            {lead} {tail && <span className="gradient-text">{tail}</span>}
          </motion.h1>

          <motion.p variants={item} className="mt-5 font-display text-lg font-medium text-accent sm:text-xl">
            {hero.subtitle}
          </motion.p>
          <motion.p variants={item} className="mt-3 max-w-xl text-pretty leading-relaxed text-muted sm:text-lg">
            {hero.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">{hero.primaryText}</Button>
            <Button href="#contact" variant="ghost">
              {hero.secondaryText}
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <Socials />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[calc(20rem_+_22px)] lg:max-w-[calc(24rem_+_22px)]"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full bg-gradient-to-b from-accent/45 via-accent/10 to-accent2/25 blur-2xl"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="avatar-ring relative h-full"
          >
            <div className="h-full rounded-full bg-surface p-2">
              <div className="h-full overflow-hidden rounded-full ring-1 ring-line/10">
                <img
                  src={portrait}
                  alt={`${profile.name}, portrait`}
                  width="800"
                  height="1000"
                  fetchpriority="high"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {FLOATING.map(({ label, Icon, className, delay }) => (
            <motion.div
              key={label}
              aria-hidden
              className={`absolute ${className}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.8 + delay * 0.3 },
                scale: { delay: 0.8 + delay * 0.3 },
                y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay },
              }}
            >
              <span className="glass flex items-center gap-2 rounded-full border border-line/20 px-3 py-1.5 text-xs font-medium shadow-lg">
                <Icon className="text-accent" />
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {stack.length > 0 && (
        <div className="container-x relative mt-14">
          <div className="hairline" />
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 py-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {stack.map((skill) => (
              <li key={skill.name}>{skill.name}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
