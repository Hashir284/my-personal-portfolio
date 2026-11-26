import { motion } from 'framer-motion'
export default function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: delay / 1000, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </Tag>
  )
}
