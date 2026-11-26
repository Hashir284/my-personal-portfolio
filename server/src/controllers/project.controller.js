import { Project } from '../models/index.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { httpError } from '../utils/httpError.js'
import { sanitizeProject } from '../utils/sanitizeContent.js'

const PUBLIC_SORT = { featured: -1, order: 1, createdAt: 1 }
const ADMIN_SORT = { order: 1, createdAt: 1 }

export const listPublishedProjects = asyncHandler(async (req, res) => {
  res.json(await Project.find({ published: true }).sort(PUBLIC_SORT).lean())
})

export const listProjects = asyncHandler(async (req, res) => {
  res.json(await Project.find().sort(ADMIN_SORT).lean())
})

export const createProject = asyncHandler(async (req, res) => {
  const data = sanitizeProject(req.body)
  if (!data.title) throw httpError(400, 'Title is required.')
  res.status(201).json(await Project.create(data))
})

export const updateProject = asyncHandler(async (req, res) => {
  const data = sanitizeProject(req.body)
  if (!data.title) throw httpError(400, 'Title is required.')

  const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true })
  if (!project) throw httpError(404, 'Not found.')
  res.json(project)
})

export const deleteProject = asyncHandler(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})
