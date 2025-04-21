
import { taskCreation,getTasksAll,updateTaskStatus,deleteTaskById} from "../models/taskModel.js"

export async function createTask(req, res) {
  try {
    const { project_id, content, description, due_date } = req.body

    if (!project_id || !content || !description || !due_date) {
      return res
        .status(400)
        .json({ error: "Project ID and Content are required" })
    }

    const task = await taskCreation(project_id, content, description, due_date)

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getAllTasks(req, res) {
  try {
    const tasks = await getTasksAll()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export async function updateTask(req, res) {
  try {
    const { id } = req.params
    const { is_completed ,description,content} = req.body

    const result = await updateTaskStatus(id, is_completed,content,description)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const result = await deleteTaskById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}