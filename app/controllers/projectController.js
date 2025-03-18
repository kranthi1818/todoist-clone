import DB from "../config/db.js"

export function createProject(req, res) {
  const { name, color, is_favorite } = req.body

  if (!name) {
    return res.status(400).json({ error: "Project name is required" })
  }

  DB.run(
    "INSERT INTO projects (name, color, is_favorite) VALUES (?, ?, ?)",
    [name, color, is_favorite ? 1 : 0],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.status(201).json({ id: this.lastID, name, color, is_favorite })
    }
  )
}

export function getAllProjects(req, res) {
  DB.all("SELECT * FROM projects", [], function (err, data) {
    if (err) {
      return res.status(500).json({ err: err.message })
    }
    res.json(data)
  })
}

export function deleteProject(req, res) {
  const { id } = req.params
       console.log(id)
  DB.run("DELETE FROM projects WHERE id = ?", [id], function (err) {

    if (err)  return res.status(500).json({ err: err.message })

    if (this.changes === 0) return res.status(404).json({ error: "Project not found" });

    res.json({message:'Project Deleted Successfully'})
  })
}
