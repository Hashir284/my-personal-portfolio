import { useEffect, useState } from 'react'
import { projects as fallback } from '../data/content'
import { API, request } from '../lib/api'

export default function useProjects() {
  const [projects, setProjects] = useState(fallback)
  useEffect(() => {
    if (!API) return
    let alive = true
    request('/api/projects').then((rows) => alive && setProjects(rows.map((p) => ({ ...p, id: p._id })))).catch(() => {})
    return () => { alive = false }
  }, [])
  return projects
}
