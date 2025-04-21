
import DB from "../config/db.js"

export function createCommentInDB(user_id, task_id, project_id, content) {
    return new Promise((resolve, reject) => {
      DB.run(
        "INSERT INTO comments (user_id, task_id, project_id, content) VALUES (?, ?, ?, ?)",
        [user_id, task_id, project_id, content],
        function (err) {
          if (err) return reject(err);
  
          resolve({ message: "Added Comment Successfully" });
        }
      );
    });
  }

  export function getAllCommentsFromDB() {
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM comments", [], function (err, allComments) {
        if (err) return reject(err);
        
        resolve(allComments);
      });
    });
  }


  export function getCommentsByIdFromDB(id) {
    return new Promise((resolve, reject) => {
      DB.get(
        "SELECT * FROM comments WHERE id = ?",
        [id],
        function (err, commentData) {
          if (err) return reject(err);
  
          if (!commentData) {
            return reject(new Error(`No comment found with id ${id}`));
          }
  
          resolve(commentData);
        }
      );
    });
  }

  export function deleteCommentByIdFromDB(id) {
    return new Promise((resolve, reject) => {
      DB.run("DELETE FROM comments WHERE id = ?", [id], function (err) {
        if (err) return reject(err);
  
        resolve({ message: `Deleted Comment with id ${id} Successfully` });
      });
    });
  }

  export function deleteAllCommentsFromDB() {
    return new Promise((resolve, reject) => {
      DB.run("DELETE FROM comments", [], function (err) {
        if (err) return reject(err);
  
        resolve({ message: "All comments deleted successfully." });
      });
    });
  }
  

  export function updateCommentInDB(id, content) {
    return new Promise((resolve, reject) => {
      DB.run(
        "UPDATE comments SET content = ? WHERE id = ?",
        [content, id],
        function (err) {
          if (err) return reject(err);
  
          resolve({ message: `Updated the comment with ${id} successfully` });
        }
      );
    });
  }

  export function getAllCommentsFromUserDB(userId) {
    return new Promise((resolve, reject) => {
      DB.all(
        "SELECT * FROM comments WHERE user_id = ?",
        [userId],
        function (err, allComments) {
          if (err) return reject(err);
          resolve(allComments);
        }
      );
    });
  }

  export function getAllCommentsPerTaskDB(projectId, taskId) {
    return new Promise((resolve, reject) => {
      DB.all(
        "SELECT * FROM comments WHERE project_id = ? AND task_id = ?",
        [projectId, taskId],
        function (err, allCommentsPerTask) {
          if (err) return reject(err);
          resolve(allCommentsPerTask);
        }
      );
    });
  }