import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Section from './Section'
import Reveal from './Reveal'
import Socials from './Socials'
import { useContent } from '../ContentContext'
import { API, request } from '../lib/api'

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name.'
  if (!emailRe.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.'
  if (v.subject.trim().length < 3) e.subject = 'Add a short subject.'
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters so I know how to help.'
  return e
}

export default function Contact() {
  const { profile } = useContent()
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', text: '' })

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) { setStatus({ state: 'error', text: 'Fix the highlighted fields and send again.' }); return }
    if (API) {
      setStatus({ state: 'sending', text: 'Sending…' })
      try {
        await request('/api/messages', { method: 'POST', body: values })
        setValues({ name: '', email: '', subject: '', message: '' })
        setStatus({ state: 'success', text: 'Message sent. I’ll reply by email.' })
      } catch (ex) {
        setStatus({ state: 'error', text: ex.message || `Message not sent. Email me directly at ${profile.email}.` })
      }
      return
    }
    if (!FORM_ID) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
      setStatus({ state: 'success', text: 'Your email app should open with the message ready to send.' })
      return
    }
    setStatus({ state: 'sending', text: 'Sending…' })
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(values) })
      if (!res.ok) throw new Error('bad response')
      setValues({ name: '', email: '', subject: '', message: '' })
      setStatus({ state: 'success', text: 'Message sent. I’ll reply by email.' })
    } catch {
      setStatus({ state: 'error', text: `Message not sent. Email me directly at ${profile.email}.` })
    }
  }

  const field = 'mt-2 w-full rounded-xl border bg-bg px-4 py-3 text-sm outline-none transition focus:border-accent'
  const Err = ({ id, msg }) => msg ? <p id={id} className="mt-1.5 text-sm text-red-400">{msg}</p> : null

  return (
    <Section id="contact" title="Have a project or opportunity in mind? Let’s talk.">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-6">
          <ul className="space-y-4">
            <li><a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-muted transition hover:text-accent"><FiMail aria-hidden className="text-accent" />{profile.email}</a></li>
            <li><a href={profile.phoneHref} className="flex items-center gap-3 text-muted transition hover:text-accent"><FiPhone aria-hidden className="text-accent" />{profile.phone}</a></li>
            <li className="flex items-center gap-3 text-muted"><FiMapPin aria-hidden className="text-accent" />{profile.location}</li>
          </ul>
          <Socials />
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input id="name" autoComplete="name" placeholder="Enter your name" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby="name-err" className={`${field} ${errors.name ? 'border-red-400' : 'border-line/20'}`} />
              <Err id="name-err" msg={errors.name} />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" type="email" autoComplete="email" placeholder="Enter your email" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby="email-err" className={`${field} ${errors.email ? 'border-red-400' : 'border-line/20'}`} />
              <Err id="email-err" msg={errors.email} />
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <input id="subject" placeholder="What is this about?" value={values.subject} onChange={set('subject')} aria-invalid={!!errors.subject} aria-describedby="subject-err" className={`${field} ${errors.subject ? 'border-red-400' : 'border-line/20'}`} />
              <Err id="subject-err" msg={errors.subject} />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea id="message" rows={5} placeholder="Write your message here..." value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby="message-err" className={`${field} resize-y ${errors.message ? 'border-red-400' : 'border-line/20'}`} />
              <Err id="message-err" msg={errors.message} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status.state === 'sending'} className="btn btn-primary disabled:opacity-60"><FiSend aria-hidden /> Send message</button>
              <p role="status" aria-live="polite" className={`text-sm ${status.state === 'error' ? 'text-red-400' : 'text-muted'}`}>{status.text}</p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
