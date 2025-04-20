import {
  projectCreation,
  getProjectsAll,
  projectDeleting,
  allProjectsDelete,
  projectById,
} from "../models/projectModel.js"

export async function createProject(req, res) {
  try {
    const { name, color, is_favorite } = req.body

    if (!name) {
      return res.status(400).json({ error: "Project name is required" })
    }

    let project = await projectCreation(name, color, is_favorite)

    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export async function getAllProjects(req, res) {
  try {
    let projects = await getProjectsAll()

    res.status(200).json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    res.status(400).json({ message: error.message || error })
  }
}

export async function getProjectById(req, res) {
  const { id } = req.params

  try {
    if (isNaN(id)) {
      return res.status(404).json({ error: "Please provide id as number" })
    }

    let project = await projectById(id)

    res.status(200).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message || error })
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params
  try {
    if (isNaN(id)) {
      return res.status(404).json({ error: "Please provide id as number" })
    }
    let project = await projectDeleting(id)

    res.status(200).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message || error })
  }
}

export async function deleteAllProjects(req, res) {
  try {
    let data = await allProjectsDelete()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ message: error.message || error })
  }
}
