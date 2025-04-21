import DB from "../config/db.js"

import {createCommentInDB,
  getAllCommentsFromDB,
  getCommentsByIdFromDB,
  deleteCommentByIdFromDB,
  deleteAllCommentsFromDB,
  updateCommentInDB,
  getAllCommentsFromUserDB,
  getAllCommentsPerTaskDB} from '../models/commentsModel.js'
 


export async function createComment(req, res) {
  const { user_id, task_id, project_id, content } = req.body

  if (!user_id || !task_id || !project_id || !content) {
    return res.status(400).json({ error: "All fields are required" })
  }

  try {
    const result = await createCommentInDB(user_id, task_id, project_id, content)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export async function getAllComments(req, res) {
  try {
    const allComments = await getAllCommentsFromDB()
    res.status(200).json(allComments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export async function getCommentsById(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "Comment ID is required" })
  }

  try {
    const comment = await getCommentsByIdFromDB(id)
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export async function deleteCommentsById(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "id required" })
  }

  try {
    const result = await deleteCommentByIdFromDB(id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export async function deleteAllComments(req, res) {
  try {
    const result = await deleteAllCommentsFromDB()

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateComment(req, res) {
  const { id } = req.params;
  const { content } = req.body;

  if (!id || !content) {
    return res.status(400).json({ error: "Both id and content are required" });
  }

  try {
    const result = await updateCommentInDB(id, content);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllCommentsFromUser(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const allComments = await getAllCommentsFromUserDB(id);
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getAllCommentsPerTask(req, res) {
  const { projectId, taskId } = req.params;

  if (!projectId || !taskId) {
    return res.status(400).json({ error: "projectId and taskId are required" });
  }

  try {
    const comments = await getAllCommentsPerTaskDB(projectId, taskId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


