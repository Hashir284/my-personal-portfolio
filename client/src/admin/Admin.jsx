import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGrid, FiUser, FiHome, FiInfo, FiCode, FiFolder, FiAward, FiBookOpen, FiBriefcase, FiShare2, FiFileText, FiMail, FiSettings, FiLogOut, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { API, request } from '../lib/api'
import { defaultContent } from '../data/content'
import { mergeContent } from '../lib/content'
import useTheme from '../hooks/useTheme'
import { Field, FileField, ListEditor, getIn, setIn, inputCls } from './editors'
import { BLOCKS, TITLES } from './blocks'

const NAV = [
  ['overview', 'Overview', FiGrid], ['profile', 'Profile', FiUser], ['hero', 'Hero section', FiHome], ['about', 'About me', FiInfo], ['skills', 'Skills', FiCode],
  ['projects', 'Projects', FiFolder], ['certificates', 'Certificates', FiAward], ['education', 'Education', FiBookOpen], ['services', 'Services', FiBriefcase],
  ['social', 'Social links', FiShare2], ['resume', 'Resume', FiFileText], ['messages', 'Messages', FiMail], ['settings', 'Website settings', FiSettings],
]
const fmt = (d) => (d ? new Date(d).toLocaleString() : '—')

function Login({ onDone }) {
  const [v, setV] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr('')
    try { await request('/api/auth/login', { method: 'POST', body: v }); onDone() } catch (ex) { setErr(ex.message) } finally { setBusy(false) }
  }
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4 p-7">
        <h1 className="text-2xl font-bold">Admin login</h1>
        <label className="block text-sm font-medium">Email<input type="email" autoComplete="username" required value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} className={inputCls} /></label>
        <label className="block text-sm font-medium">Password<input type="password" autoComplete="current-password" required value={v.password} onChange={(e) => setV({ ...v, password: e.target.value })} className={inputCls} /></label>
        {err && <p role="alert" className="text-sm text-red-400">{err}</p>}
        <button disabled={busy} className="btn btn-primary w-full disabled:opacity-60">{busy ? 'Logging in…' : 'Log in'}</button>
      </form>
    </div>
  )
}

function Overview({ call }) {
  const [stats, setStats] = useState(null)
  const [content, setContent] = useState(null)
  useEffect(() => {
    call('/api/admin/stats').then(setStats).catch(() => setStats(false))
    request('/api/content').then((r) => setContent(mergeContent(defaultContent, r))).catch(() => setContent(defaultContent))
  }, [call])
  if (stats === false) return <p className="text-red-400">Could not load stats.</p>
  if (!stats || !content) return <p className="text-muted">Loading…</p>
  const cards = [
    ['Projects', stats.projects], ['Certificates', content.certificates.length],
    ['Skills', content.skills.reduce((n, g) => n + g.items.length, 0)], ['Messages', stats.messages], ['Unread', stats.unread],
  ]
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">{cards.map(([l, n]) => <div key={l} className="card p-5"><p className="font-display text-3xl font-bold text-accent">{n}</p><p className="text-sm text-muted">{l}</p></div>)}</div>
      <p className="text-sm text-muted">Content last saved: {fmt(stats.updatedAt)}{!stats.updatedAt && ' (your site is showing built-in defaults until you save a section)'}</p>
      <div>
        <h2 className="mb-3 text-lg font-bold">Recent messages</h2>
        {!stats.recent.length ? <p className="text-sm text-muted">No messages yet.</p> : (
          <ul className="space-y-2">{stats.recent.map((m) => <li key={m._id} className="card p-4 text-sm"><span className="font-medium">{m.name}</span> <span className="text-muted">· {m.subject || 'No subject'} · {fmt(m.createdAt)}</span></li>)}</ul>
        )}
      </div>
    </div>
  )
}

function ContentTab({ id, call, notify }) {
  const blocks = BLOCKS[id]
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { request('/api/content').then((r) => setData(mergeContent(defaultContent, r))).catch(() => setData(defaultContent)) }, [])
  if (!data) return <p className="text-muted">Loading…</p>
  const set = (path) => (v) => setData((d) => setIn(d, path, v))
  async function save() {
    setSaving(true)
    const keys = [...new Set(blocks.map((b) => b.path.split('.')[0]))]
    try { await call('/api/admin/content', { method: 'PUT', body: Object.fromEntries(keys.map((k) => [k, data[k]])) }); notify('Saved. Your website now shows these changes.') }
    catch (ex) { notify(ex.message, 'error') } finally { setSaving(false) }
  }
  return (
    <div className="space-y-8">
      {blocks.map((b, i) => (
        <section key={i} className="card space-y-4 p-5 sm:p-6">
          {b.title && <h2 className="font-bold">{b.title}</h2>}
          {b.type === 'object' && <div className="grid gap-4 sm:grid-cols-2">{b.fields.map((f) => <Field key={f.key} f={f} value={getIn(data, `${b.path}.${f.key}`)} onChange={set(`${b.path}.${f.key}`)} request={call} />)}</div>}
          {b.type === 'single' && <FileField label={b.label} accept={b.accept} value={getIn(data, b.path)} onChange={set(b.path)} request={call} />}
          {b.type === 'list' && <ListEditor items={getIn(data, b.path) || []} onChange={set(b.path)} {...b} request={call} />}
          {b.type === 'strings' && <ListEditor items={(getIn(data, b.path) || []).map((t) => ({ t }))} onChange={(a) => set(b.path)(a.map((x) => x.t))} labelKey="t" addLabel={b.addLabel} newItem={{ t: '' }} fields={[{ key: 't', label: 'Text', type: 'textarea', rows: 4 }]} request={call} />}
        </section>
      ))}
      <button onClick={save} disabled={saving} className="btn btn-primary disabled:opacity-60">{saving ? 'Saving…' : 'Save changes'}</button>
    </div>
  )
}

const emptyProject = { title: '', kicker: '', description: '', tech: '', features: '', links: '', github: '', image: '', order: 0, published: true, featured: false, mock: 'app' }
const toForm = (p) => ({ title: p.title, kicker: p.kicker || '', description: p.description || '', tech: (p.tech || []).join(', '), features: (p.features || []).join('\n'), links: (p.links || []).map((l) => `${l.label} | ${l.href}`).join('\n'), github: p.github || '', image: p.image || '', order: p.order || 0, published: p.published !== false, featured: !!p.featured, mock: p.mock || 'app' })
const toPayload = (f) => ({
  ...f, order: Number(f.order) || 0,
  tech: f.tech.split(',').map((s) => s.trim()).filter(Boolean), features: f.features.split('\n').map((s) => s.trim()).filter(Boolean),
  links: f.links.split('\n').map((line) => { const [label, ...rest] = line.split('|'); return { label: (label || '').trim(), href: rest.join('|').trim() } }).filter((l) => l.label && l.href),
})

function ProjectsTab({ call, notify }) {
  const [rows, setRows] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProject)
  const load = useCallback(() => call('/api/admin/projects').then(setRows).catch((e) => { setRows([]); notify(e.message, 'error') }), [call, notify])
  useEffect(() => { load() }, [load])
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  async function save(e) {
    e.preventDefault()
    try { await call(editing === 'new' ? '/api/admin/projects' : `/api/admin/projects/${editing}`, { method: editing === 'new' ? 'POST' : 'PUT', body: toPayload(form) }); setEditing(null); notify('Project saved.'); load() }
    catch (ex) { notify(ex.message, 'error') }
  }
  async function remove(p) {
    if (!window.confirm(`Delete “${p.title}”? This cannot be undone.`)) return
    try { await call(`/api/admin/projects/${p._id}`, { method: 'DELETE' }); notify('Project deleted.'); load() } catch (ex) { notify(ex.message, 'error') }
  }
  return (
    <div className="space-y-5">
      <button onClick={() => { setForm(emptyProject); setEditing('new') }} className="btn btn-primary">Add project</button>
      {editing && (
        <form onSubmit={save} className="card grid gap-4 p-6 sm:grid-cols-2">
          <label className="text-sm font-medium sm:col-span-2">Title<input required value={form.title} onChange={set('title')} className={inputCls} /></label>
          <label className="text-sm font-medium">Subtitle<input value={form.kicker} onChange={set('kicker')} className={inputCls} /></label>
          <label className="text-sm font-medium">Order (smaller shows first)<input type="number" value={form.order} onChange={set('order')} className={inputCls} /></label>
          <label className="text-sm font-medium sm:col-span-2">Description<textarea rows={3} value={form.description} onChange={set('description')} className={inputCls} /></label>
          <label className="text-sm font-medium">Technologies (comma separated)<input value={form.tech} onChange={set('tech')} className={inputCls} /></label>
          <label className="text-sm font-medium">Preview style (when no screenshot)<select value={form.mock} onChange={set('mock')} className={inputCls}><option value="app">App</option><option value="store">Store + admin</option></select></label>
          <label className="text-sm font-medium sm:col-span-2">Features (one per line)<textarea rows={4} value={form.features} onChange={set('features')} className={inputCls} /></label>
          <label className="text-sm font-medium sm:col-span-2">Buttons (one per line: Label | https://link). The first is the main button.<textarea rows={3} value={form.links} onChange={set('links')} className={inputCls} placeholder="Live demo | https://example.com" /></label>
          <label className="text-sm font-medium">GitHub link<input value={form.github} onChange={set('github')} className={inputCls} /></label>
          <FileField label="Screenshot / thumbnail" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} request={call} />
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.published} onChange={set('published')} /> Published</label>
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.featured} onChange={set('featured')} /> Featured (shown first)</label>
          <div className="flex gap-3 sm:col-span-2"><button className="btn btn-primary">Save project</button><button type="button" onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button></div>
        </form>
      )}
      {rows === null ? <p className="text-muted">Loading…</p> : (
        <ul className="space-y-3">
          {rows.map((p) => (
            <li key={p._id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
              <div><p className="font-medium">{p.title}</p><p className="text-sm text-muted">{p.published ? 'Published' : 'Hidden'}{p.featured ? ' · Featured' : ''} · order {p.order}</p></div>
              <div className="flex gap-2"><button onClick={() => { setForm(toForm(p)); setEditing(p._id) }} className="btn btn-ghost !py-1.5">Edit</button><button onClick={() => remove(p)} className="btn btn-ghost !py-1.5 hover:!border-red-400 hover:!text-red-400">Delete</button></div>
            </li>
          ))}
          {!rows.length && <li className="text-sm text-muted">No projects in the database yet. Run <code>npm run seed</code> in /server to import your two current projects, or add one above.</li>}
        </ul>
      )}
    </div>
  )
}

function MessagesTab({ call, notify }) {
  const [rows, setRows] = useState(null)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [open, setOpen] = useState(null)
  const load = useCallback(() => call(`/api/admin/messages?q=${encodeURIComponent(q)}&status=${status}`).then(setRows).catch((e) => { setRows([]); notify(e.message, 'error') }), [call, notify, q, status])
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t) }, [load])
  const toggle = (m) => call(`/api/admin/messages/${m._id}`, { method: 'PATCH', body: { read: !m.read } }).then(load).catch((e) => notify(e.message, 'error'))
  const remove = (m) => window.confirm('Delete this message?') && call(`/api/admin/messages/${m._id}`, { method: 'DELETE' }).then(() => { setOpen(null); notify('Message deleted.'); load() }).catch((e) => notify(e.message, 'error'))
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, subject, message…" aria-label="Search messages" className={`${inputCls} !mt-0 max-w-sm`} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter" className={`${inputCls} !mt-0 w-36`}><option value="all">All</option><option value="unread">Unread</option><option value="read">Read</option></select>
      </div>
      {rows === null ? <p className="text-muted">Loading…</p> : (
        <ul className="space-y-2">
          {rows.map((m) => (
            <li key={m._id} className={`card p-4 ${m.read ? 'opacity-75' : 'border-accent/40'}`}>
              <button onClick={() => { setOpen(open === m._id ? null : m._id); if (!m.read) toggle(m) }} aria-expanded={open === m._id} className="flex w-full flex-wrap items-baseline justify-between gap-2 text-left">
                <span className="font-medium">{!m.read && <i aria-label="Unread" className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />}{m.name} <span className="text-sm font-normal text-muted">· {m.subject || 'No subject'}</span></span>
                <time className="text-xs text-muted" dateTime={m.createdAt}>{fmt(m.createdAt)}</time>
              </button>
              {open === m._id && (
                <div className="mt-3 space-y-3 border-t border-line/10 pt-3 text-sm">
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || ''))}`} className="text-accent">{m.email}</a>
                  <p className="whitespace-pre-wrap text-muted">{m.message}</p>
                  <div className="flex gap-2"><button onClick={() => toggle(m)} className="btn btn-ghost !py-1.5">{m.read ? 'Mark unread' : 'Mark read'}</button><button onClick={() => remove(m)} className="btn btn-ghost !py-1.5 hover:!border-red-400 hover:!text-red-400">Delete</button></div>
                </div>
              )}
            </li>
          ))}
          {!rows.length && <li className="text-sm text-muted">{q || status !== 'all' ? 'No messages match.' : 'No messages yet. Contact form submissions appear here.'}</li>}
        </ul>
      )}
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(null) // null = checking
  const [tab, setTab] = useState('overview')
  const [menu, setMenu] = useState(false)
  const [toast, setToast] = useState(null)
  const [theme, toggleTheme] = useTheme()

  useEffect(() => {
    document.title = 'Admin · Muhammad Hashir'
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'; document.head.appendChild(m)
    return () => m.remove()
  }, [])
  useEffect(() => { if (API) request('/api/auth/me').then(() => setAuthed(true)).catch(() => setAuthed(false)) }, [])

  const notify = useCallback((text, type = 'ok') => { setToast({ text, type }); setTimeout(() => setToast(null), 3500) }, [])
  const call = useCallback((path, opts) => request(path, opts).catch((e) => { if (e.status === 401) setAuthed(false); throw e }), [])
  const logout = async () => { await request('/api/auth/logout', { method: 'POST' }).catch(() => {}); setAuthed(false) }

  if (!API) return <div className="grid min-h-screen place-items-center p-6 text-center text-muted">Set <code className="mx-1">VITE_API_URL</code> in client/.env and restart to use the admin panel.</div>
  if (authed === null) return <div className="grid min-h-screen place-items-center text-muted">Checking session…</div>
  if (!authed) return <Login onDone={() => setAuthed(true)} />

  const current = NAV.find((n) => n[0] === tab)
  const sidebar = (
    <nav aria-label="Admin" className="flex h-full flex-col bg-neutral-950 p-4 text-neutral-200">
      <p className="mb-5 px-3 font-display text-lg font-extrabold text-white">hashir<span className="text-accent">.dev</span> <span className="text-xs font-normal text-neutral-400">admin</span></p>
      <ul className="flex-1 space-y-1 sidebar-scroll overflow-y-auto">
        {NAV.map(([id, label, Icon]) => (
          <li key={id}><button onClick={() => { setTab(id); setMenu(false) }} aria-current={tab === id ? 'page' : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${tab === id ? 'bg-accent text-white' : 'hover:bg-white/10'}`}><Icon aria-hidden />{label}</button></li>
        ))}
      </ul>
      <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm">
        <a href="/" className="block rounded-lg px-3 py-2 hover:bg-white/10">View site ↗</a>
        <button onClick={toggleTheme} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10">{theme === 'dark' ? <FiSun /> : <FiMoon />}{theme === 'dark' ? 'Light theme' : 'Dark theme'}</button>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10"><FiLogOut />Logout</button>
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">{sidebar}</aside>
      <div className="glass sticky top-0 z-30 flex items-center justify-between border-b border-line/10 px-4 py-3 lg:hidden">
        <p className="font-bold">{current[1]}</p>
        <button onClick={() => setMenu(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full border border-line/20"><FiMenu /></button>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMenu(false)}>
            <motion.div initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} onClick={(e) => e.stopPropagation()} className="relative h-full w-64">{sidebar}
              <button onClick={() => setMenu(false)} aria-label="Close menu" className="absolute right-3 top-4 text-white"><FiX /></button></motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-w-0 p-5 sm:p-8">
        <header className="mb-6 hidden lg:block"><h1 className="text-2xl font-bold">{tab === 'messages' ? 'Contact messages' : tab === 'projects' ? 'Projects' : tab === 'overview' ? 'Overview' : TITLES[tab]?.[0]}</h1>
          {TITLES[tab] && <p className="mt-1 text-sm text-muted">{TITLES[tab][1]}</p>}</header>
        {tab === 'overview' ? <Overview call={call} /> : tab === 'projects' ? <ProjectsTab call={call} notify={notify} /> : tab === 'messages' ? <MessagesTab call={call} notify={notify} /> : <ContentTab key={tab} id={tab} call={call} notify={notify} />}
      </main>

      <AnimatePresence>
        {toast && <motion.p role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`fixed bottom-5 right-5 z-50 rounded-xl px-4 py-3 text-sm text-white shadow-xl ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-600'}`}>{toast.text}</motion.p>}
      </AnimatePresence>
    </div>
  )
}
