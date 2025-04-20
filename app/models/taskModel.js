import DB from "../config/db.js"

export function taskCreation(project_id, content, description, due_date) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO tasks (project_id, content, description, due_date) VALUES (?, ?, ?, ?)"
  
      DB.run(query, [project_id, content, description, due_date], function (err) {
        if (err) {
          return reject(new Error("Task Creation Failed"))
        }
  
        resolve({
          id: this.lastID,
          project_id,
          content,
          description,
          due_date,
        })
      })
    })
  }
  
  