import express from 'express'
import {createProject, getAllProjects,deleteProject} from '../controllers/projectController.js'

const router = express.Router();

router.post('/projects',createProject)

router.get('/projects',getAllProjects)
router.delete('/projects/:id',deleteProject)

export default router

