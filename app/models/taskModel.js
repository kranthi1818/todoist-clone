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
  
  export function getTasksAll() {
    return new Promise((resolve, reject) => {
      DB.all(`SELECT * FROM tasks`, [], function (err, rows) {
        if (err) {
          return reject(new Error("Failed to fetch tasks"))
        }
        resolve(rows)
      })
    })
  }

  export function updateTaskStatus(id, is_completed,content,description) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE tasks SET is_completed = ?, content = ?, description = ? WHERE id = ?`
  
      DB.run(query, [is_completed,content,description,id], function (err) {
        if (err) {
          return reject(new Error("Failed to update task"))
        }
  
        if (this.changes === 0) {
          return reject(new Error("Task not found"))
        }
  
        resolve({ message: "updated task successfully" })
      })
    })
  }


  export function deleteTaskById(id) {
    return new Promise((resolve, reject) => {
      DB.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
        if (err) return reject(err);
  
        if (this.changes === 0) {
          return reject(new Error("Task not found"));
        }
  
        resolve({ message: "Task deleted successfully" });
      });
    });
  }
  
