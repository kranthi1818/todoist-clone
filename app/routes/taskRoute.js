import express from 'express'
import {createTask, deleteTask, getAllTasks, updateTask} from '../controllers/taskController.js'

const router = express.Router();

router.post('/task',createTask)
router.get('/task',getAllTasks)
router.put('/task/:id',updateTask)
router.delete('/task/:id',deleteTask)

export default router


