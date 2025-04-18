import express from 'express'

import { createUser,deleteAllUsers,deleteUser,getAllUsers,getUserById } from '../controllers/userController.js'

const router = express.Router();


router.post('/users',createUser)

router.get('/users',getAllUsers)

router.get('/users/:id',getUserById)

router.delete('/users/:id',deleteUser)

router.delete('/users',deleteAllUsers)


export default router

