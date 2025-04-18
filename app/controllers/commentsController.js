import DB from "../config/db.js"

export function createComment(req, res) {
  const { user_id, task_id, project_id, content } = req.body

  if (!user_id || !task_id || !project_id || !content) {
    return res.status(400).json({ error: "All fields are required" })
  }

  DB.run(
    "INSERT INTO comments (user_id, task_id, project_id, content) VALUES (?, ?, ?, ?)",

    [user_id, task_id, project_id, content],

    function (err) {
      if (err) return res.status(500).json({ err: err.message })
      res.status(200).json({ message: "Added Comment Successfully" })
    }
  )
}

export function getAllComments(req, res) {
    
  DB.all("SELECT * FROM comments", [], function (err, allComments) {

    if (err) return res.status(500).json({ err: err.message })
    res.status(200).json(allComments)
  })

}

export function getCommentsById(req, res) {
  const { id } = req.params

  DB.get(
    "SELECT * FROM comments WHERE id = ?",
    [id],
    function (err, commentData) {
      if (err) return res.status(500).json({ error: err.message })

      if (!commentData) {
        return res
          .status(404)
          .json({ message: `No comment found with id ${id}` })
      }

      res.status(200).json(commentData)
    }
  )
}

export function deleteCommentsById(req, res) {
  const { id } = req.params

  if (!id) return req.status(400).json({ error: "id required" })

  DB.run("DELETE FROM comments WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ err: err.message })

    res
      .status(200)
      .json({ message: `Deleted Comment with id ${id} Successfully` })
  })
}

export function deleteAllComments(req, res) {
  DB.run("DELETE FROM comments", [], function (err) {
    if (err) return res.status(500).json({ err: err.message })

    res.status(200).json({ message: "All Comments Deleted Successfully" })
  })
}

export function updateComment(req, res) {
  const { id } = req.params
  const { content } = req.body

  DB.run(
    "UPDATE comments SET content = ? WHERE id = ?",
    [content, id],
    function (err) {
      if (err) return res.status(500).json({ err: err.message })
      res
        .status(200)
        .json({ message: `updated the comment with ${id} successfully` })
    }
  )
}

export function getAllCommentsFromUser(req, res) {
  const { id } = req.params

  DB.all(
    "SELECT * FROM comments WHERE user_id = ?",
    [id],
    function (err, allComments) {
      if (err) return res.status(500).json({ err: err.message })

      res.status(200).json(allComments)
    }
  )
}

export function getAllCommentsPerTask(req, res) {
  const { projectId, taskId } = req.params

  DB.all(
    "SELECT * FROM comments WHERE project_id = ? AND task_id = ? ",
    [projectId, taskId],
    function (err, allCommentsPerTask) {
      if (err) return res.status(500).json({ err: err.message })

      res.status(200).json(allCommentsPerTask)
    }
  )
}

export function getAllCommentsPerProject(req, res) {
  const { projectId,taskId } = req.params

  DB.all(
    "SELECT * FROM comments WHERE task_id IS NULL AND project_id = ?",
    [projectId],
    function (err, commentsPerProject) {
      if (err) return res.status(500).json({ err: err.message })
      res.status(200).json(commentsPerProject)
    }
  )
}
