import { motion } from 'framer-motion'
import { SiReact, SiNodedotjs, SiMongodb } from 'react-icons/si'
import Socials from './Socials'
import { useContent } from '../ContentContext'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }
const chips = [
  { label: 'React.js', sub: 'strongest', Icon: SiReact, pos: 'left-0 top-[10%] sm:-left-4', dur: 5, delay: 0 },
  { label: 'Node.js', Icon: SiNodedotjs, pos: 'right-0 top-[44%] sm:-right-3', dur: 6, delay: 0.8 },
  { label: 'MongoDB', Icon: SiMongodb, pos: 'bottom-[6%] left-[8%]', dur: 5.5, delay: 1.6 },
]

export default function Hero() {
  const { hero, portrait, profile } = useContent()
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pb-8 pt-24 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          {hero.availability && (
            <motion.p variants={item} className="text-sm text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-line/15 px-3 py-1">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
                {hero.availability}
              </span>
            </motion.p>
          )}
          <motion.p variants={item} className="mt-5 text-lg text-muted">Hi, I’m <span className="font-medium text-fg">{profile.name}</span></motion.p>
          <motion.h1 variants={item} id="hero-title" className="mt-2 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">{hero.headline}</motion.h1>
          <motion.p variants={item} className="mt-4 font-display text-xl text-accent">{hero.subtitle}</motion.p>
          <motion.p variants={item} className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{hero.intro}</motion.p>
          <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#projects" className="btn btn-primary">{hero.primaryText}</motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#contact" className="btn btn-ghost">{hero.secondaryText}</motion.a>
          </motion.div>
          <motion.div variants={item} className="mt-7"><Socials /></motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[24rem] lg:max-w-[28rem]">
          <div aria-hidden className="absolute inset-6 rounded-full bg-accent/25 blur-3xl" />
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} whileHover={{ scale: 1.02 }} className="relative h-full w-full overflow-hidden rounded-full shadow-2xl shadow-accent/20 ring-1 ring-line/20">
            <img src={portrait} alt={`${profile.name}, portrait`} width="800" height="800" fetchPriority="high" className="h-full w-full object-cover" />
          </motion.div>
          {chips.map(({ label, sub, Icon, pos, dur, delay }) => (
            <motion.div key={label} aria-hidden className={`absolute ${pos}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{ opacity: { delay: 0.9 + delay * 0.3 }, scale: { delay: 0.9 + delay * 0.3 }, y: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay } }}>
              <span className="glass flex items-center gap-2 rounded-full border border-line/20 px-3 py-1.5 text-xs font-medium shadow-lg"><Icon className="text-accent" />{label}{sub && <span className="text-muted">· {sub}</span>}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
