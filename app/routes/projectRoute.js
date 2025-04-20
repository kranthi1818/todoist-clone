import express from 'express'
import {createProject, getAllProjects,deleteProject,deleteAllProjects,getProjectById} from '../controllers/projectController.js'

const router = express.Router();

router.post('/projects',createProject)

router.get('/projects',getAllProjects)

router.get('/projects/:id',getProjectById)

router.delete('/projects/:id',deleteProject)

router.delete('/projects',deleteAllProjects)

export default router

