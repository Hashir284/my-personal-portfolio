import { useState } from 'react'
import { iconKeys } from '../data/icons'

export const inputCls = 'mt-1.5 w-full rounded-xl border border-line/20 bg-bg px-3 py-2.5 text-sm outline-none transition focus:border-accent'
export const getIn = (o, p) => p.split('.').reduce((a, k) => a?.[k], o)
export const setIn = (o, p, v) => { const [h, ...t] = p.split('.'); return { ...o, [h]: t.length ? setIn(o[h] || {}, t.join('.'), v) : v } }

const readFile = (f) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(f) })
async function prepare(file) {
  if (file.size > 12 * 1024 * 1024) throw new Error('File is too large.')
  if (file.type === 'application/pdf') { if (file.size > 3 * 1024 * 1024) throw new Error('PDF is larger than 3 MB.'); return readFile(file) }
  const bmp = await createImageBitmap(file) // resize + convert to WebP in the browser before upload
  const k = Math.min(1, 1400 / Math.max(bmp.width, bmp.height))
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k)
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height)
  return c.toDataURL('image/webp', 0.85)
}

export function FileField({ label, value, onChange, request, accept = 'image/*' }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const pdf = accept.includes('pdf')
  async function pick(e) {
    const file = e.target.files?.[0]; if (!file) return
    setBusy(true); setErr('')
    try { const { url } = await request('/api/admin/upload', { method: 'POST', body: { dataUrl: await prepare(file), name: file.name } }); onChange(url) }
    catch (ex) { setErr(ex.message) } finally { setBusy(false); e.target.value = '' }
  }
  return (
    <div className="text-sm font-medium">
      {label}
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        {value && !pdf && <img src={value} alt="" className="h-14 w-20 rounded-lg border border-line/20 object-cover" />}
        {value && pdf && <a href={value} target="_blank" rel="noopener noreferrer" className="text-accent underline">Current file</a>}
        <label className="btn btn-ghost cursor-pointer !py-1.5">{busy ? 'Uploading…' : value ? 'Replace file' : 'Upload file'}<input type="file" accept={accept} onChange={pick} disabled={busy} className="sr-only" /></label>
      </div>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="…or paste a URL / path" aria-label={`${label} URL`} className={inputCls} />
      {err && <p role="alert" className="mt-1 text-xs text-red-400">{err}</p>}
    </div>
  )
}

export function Field({ f, value, onChange, request }) {
  const opts = (f.options || []).map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
  if (f.type === 'checkbox') return <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={value !== false && !!value} onChange={(e) => onChange(e.target.checked)} /> {f.label}</label>
  if (f.type === 'file') return <div className={f.wide ? 'sm:col-span-2' : ''}><FileField label={f.label} value={value} onChange={onChange} request={request} accept={f.accept} /></div>
  if (f.type === 'list') return <div className="sm:col-span-2"><p className="mb-2 text-sm font-medium">{f.label}</p><ListEditor items={value || []} onChange={onChange} {...f} request={request} nested /></div>
  const wide = f.type === 'textarea' ? 'sm:col-span-2' : ''
  return (
    <label className={`block text-sm font-medium ${wide}`}>{f.label}
      {f.type === 'textarea' ? <textarea rows={f.rows || 3} value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        : f.type === 'select' ? <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputCls}>{opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        : <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={f.placeholder} className={inputCls} />}
    </label>
  )
}

export function ListEditor({ items, onChange, fields, newItem, labelKey, addLabel = 'Add item', request, nested }) {
  const upd = (i, k, v) => onChange(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)))
  const move = (i, d) => { const j = i + d; if (j < 0 || j >= items.length) return; const a = [...items]; [a[i], a[j]] = [a[j], a[i]]; onChange(a) }
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className={`rounded-xl border border-line/15 p-4 ${nested ? 'bg-bg/50' : 'bg-surface/60'}`}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium">{it[labelKey] || `Item ${i + 1}`}</p>
            <div className="flex gap-1.5">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="btn btn-ghost !px-3 !py-1 disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down" className="btn btn-ghost !px-3 !py-1 disabled:opacity-30">↓</button>
              <button type="button" onClick={() => window.confirm('Remove this item?') && onChange(items.filter((_, j) => j !== i))} className="btn btn-ghost !px-3 !py-1 hover:!border-red-400 hover:!text-red-400">Delete</button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">{fields.map((f) => <Field key={f.key} f={f} value={it[f.key]} onChange={(v) => upd(i, f.key, v)} request={request} />)}</div>
        </div>
      ))}
      {!items.length && <p className="text-sm text-muted">Nothing here yet.</p>}
      <button type="button" onClick={() => onChange([...items, { ...newItem }])} className="btn btn-ghost !py-1.5">+ {addLabel}</button>
    </div>
  )
}
export const iconOptions = iconKeys
