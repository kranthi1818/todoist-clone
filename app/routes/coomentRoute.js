import express from "express"

import {
  createComment,
  getAllComments,
  getCommentsById,
  deleteCommentsById,
  deleteAllComments,
  updateComment,
  getAllCommentsFromUser,
  getAllCommentsPerTask,
  getAllCommentsPerProject
} from "../controllers/commentsController.js"

const router = express.Router()

router.post("/comments", createComment)

router.get("/comments", getAllComments)

router.get("/comments/:id", getCommentsById)

router.delete("/comments/:id", deleteCommentsById)

router.delete("/comments", deleteAllComments)

router.put("/comments/:id", updateComment)

router.get("/comments/user/:id", getAllCommentsFromUser)

router.get('/comments/:projectId/:taskId',getAllCommentsPerTask)

router.get('/comments/project/:id',getAllCommentsPerProject)

export default router




