import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultContent } from './data/content'
import { mergeContent } from './lib/content'
import { API, request } from './lib/api'

const Ctx = createContext(null)
const CACHE = 'content_cache'

export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(() => { try { return JSON.parse(localStorage.getItem(CACHE)) || {} } catch { return {} } })
  useEffect(() => {
    if (!API) return
    request('/api/content').then((d) => { setRemote(d); try { localStorage.setItem(CACHE, JSON.stringify(d)) } catch { /* ignore */ } }).catch(() => {})
  }, [])

  const content = useMemo(() => {
    const c = mergeContent(defaultContent, remote)
    const user = c.profile.github.replace(/\/$/, '').split('/').pop()
    return { ...c, profile: { ...c.profile, githubUser: user, phoneHref: `tel:${c.profile.phone.replace(/[^+\d]/g, '')}` } }
  }, [remote])

  useEffect(() => {
    const { siteTitle, siteDescription } = content.settings
    if (siteTitle) document.title = siteTitle
    if (siteDescription) document.querySelector('meta[name="description"]')?.setAttribute('content', siteDescription)
  }, [content.settings])

  return <Ctx.Provider value={content}>{children}</Ctx.Provider>
}
export const useContent = () => useContext(Ctx)
