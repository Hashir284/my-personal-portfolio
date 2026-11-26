import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import Socials from '../layout/Socials'
import { useContent } from '../../context/ContentContext'
import { API, request } from '../../lib/api'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address, like name@example.com.'
  if (values.subject.trim().length < 3) errors.subject = 'Add a short subject.'
  if (values.message.trim().length < 10) errors.message = 'Write at least 10 characters so I know how to help.'
  return errors
}

export default function Contact() {
  const { profile } = useContent()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', text: '' })

  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))

  async function send() {
    setStatus({ state: 'sending', text: 'Sending…' })

    if (API) {
      try {
        await request('/api/messages', { method: 'POST', body: values })
        setValues(EMPTY)
        setStatus({ state: 'success', text: 'Message sent. I’ll reply by email.' })
      } catch (error) {
        setStatus({ state: 'error', text: error.message || `Message not sent. Email me at ${profile.email}.` })
      }
      return
    }

    if (!FORMSPREE_ID) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
      setStatus({ state: 'success', text: 'Your email app should open with the message ready to send.' })
      return
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Request failed')
      setValues(EMPTY)
      setStatus({ state: 'success', text: 'Message sent. I’ll reply by email.' })
    } catch {
      setStatus({ state: 'error', text: `Message not sent. Email me at ${profile.email}.` })
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus({ state: 'error', text: 'Fix the highlighted fields and send again.' })
      return
    }
    send()
  }

  return (
    <Section id="contact" eyebrow="08 — Contact" title="Have a project or opportunity in mind? Let’s talk.">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="card p-6 sm:p-7">
          <h3 className="font-display text-lg font-bold">Contact details</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-muted transition hover:text-accent">
                <FiMail aria-hidden className="text-accent" />
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.phoneHref} className="flex items-center gap-3 text-muted transition hover:text-accent">
                <FiPhone aria-hidden className="text-accent" />
                {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted">
              <FiMapPin aria-hidden className="text-accent" />
              {profile.location}
            </li>
          </ul>
          <div className="hairline my-6" />
          <p className="text-sm text-muted">Open to frontend and full-stack roles, freelance work and collaborations.</p>
          <Socials className="mt-5" />
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
            <FormField
              id="name"
              label="Name"
              autoComplete="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={update('name')}
              error={errors.name}
            />
            <FormField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={update('email')}
              error={errors.email}
            />
            <FormField
              id="subject"
              label="Subject"
              placeholder="What is this about?"
              value={values.subject}
              onChange={update('subject')}
              error={errors.subject}
            />
            <FormField
              id="message"
              label="Message"
              textarea
              placeholder="Write your message here..."
              value={values.message}
              onChange={update('message')}
              error={errors.message}
            />
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status.state === 'sending'} className="disabled:opacity-60">
                <FiSend aria-hidden /> Send message
              </Button>
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${status.state === 'error' ? 'text-red-400' : 'text-muted'}`}
              >
                {status.text}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
