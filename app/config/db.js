import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose()

import path, { resolve } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const relativePath = "../database/data.db"
const absolutePath = path.resolve(__dirname, relativePath)

const DB = new sqlite.Database(
  absolutePath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  connected
)

function connected(err) {
  if (err) {
    console.log("Database connection error:", err.message)
    return
  }
  console.log("Connected to SQLite database.")
}

DB.serialize(() => {
  DB.run(
    `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `,
    (err) => {
      if (err) console.error("Error creating tasks table:", err.message)
      else console.log("Users table created.")
    }
  )

  DB.run(`
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        color TEXT,
        is_favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

  DB.run(
    `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        is_completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        project_id INTEGER,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )`,
    (err) => {
      if (err) console.error("Error creating tasks table:", err.message)
      else console.log("Tasks table created.")
    }
  )

  DB.run(
    `
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        task_id INTEGER NOT NULL,
        project_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        posted_at DATETIME DEFAULT (CURRENT_TIMESTAMP),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
    );`,
    (err) => {
      if (err) console.error("Error creating tasks table:", err.message)
      else console.log("Comments table created.")
    }
  )
})

DB.exec("PRAGMA foreign_keys = ON")

export default DB
