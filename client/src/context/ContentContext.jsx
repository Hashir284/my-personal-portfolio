import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultContent } from '../data/content'
import { mergeContent } from '../lib/content'
import { API, request } from '../lib/api'

const CACHE_KEY = 'content_cache'
const ContentContext = createContext(null)

const readCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}
  } catch {
    return {}
  }
}

export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(readCache)

  useEffect(() => {
    if (!API) return
    request('/api/content')
      .then((data) => {
        setRemote(data)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        } catch {
          /* storage unavailable — defaults still render */
        }
      })
      .catch(() => {})
  }, [])

  const content = useMemo(() => {
    const merged = mergeContent(defaultContent, remote)
    const githubUser = merged.profile.github.replace(/\/$/, '').split('/').pop()
    return {
      ...merged,
      profile: {
        ...merged.profile,
        githubUser,
        phoneHref: `tel:${merged.profile.phone.replace(/[^+\d]/g, '')}`,
      },
    }
  }, [remote])

  useEffect(() => {
    const { siteTitle, siteDescription } = content.settings
    if (siteTitle) document.title = siteTitle
    if (siteDescription) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', siteDescription)
    }
  }, [content.settings])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export const useContent = () => useContext(ContentContext)
