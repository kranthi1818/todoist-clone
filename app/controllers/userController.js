import DB from "../config/db.js"

import {
  createUserInDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  deleteUserByIdFromDB,
  deleteAllUsersFromDB,
} from "../models/userModel.js"

export async function createUser(req, res) {
  const { name, email } = req.body

  if (!name) {
    return res.status(400).json({ error: "user name is required" })
  }

  try {
    const result = await createUserInDB(name, email)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersFromDB()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getUserById(req, res) {
  const { id } = req.params

  try {
    const user = await getUserByIdFromDB(id)
    res.status(200).json(user)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500
    res.status(status).json({ error: error.message })
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "user id is required" })
  }

  try {
    const result = await deleteUserByIdFromDB(id)
    res.status(200).json(result)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500
    res.status(status).json({ error: error.message })
  }
}

export async function deleteAllUsers(req, res) {
  try {
    const result = await deleteAllUsersFromDB()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


