const express = require('express')
const router = express.Router()
const validator = require('validator')
const Users = require('../db/models/users.model')

router.post('/create-user', async (req, res) => {
  const { username, email, firstName, lastName, password } = await req.body

  const validation = validateNewUser(
    username,
    email,
    firstName,
    lastName,
    password
  )

  if (!validation.result) res.status(401).send(`Error: ${validation.message}`)

  let dbResult = await Users.create({
    firstName,
    lastName,
    username,
    email,
    password, // Password needs to be protected, this is just a demo.
  })
})

function validateNewUser(username, email, firstName, lastName, password) {
  if (!validator.isAlphanumeric(username))
    return {
      result: false,
      message: 'Invalid Username: only letters and numbers are allowed.',
    }

  if (!validator.isEmail(email))
    return { result: false, message: 'Invalid Email.' }

  if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName))
    return {
      result: false,
      message: 'Invalid Name: name should contain letters only.',
    }

  if (!validator.isStrongPassword(password))
    return {
      result: false,
      message:
        'Invalid Password: must contain at least 8 characters, 1 upper and lowercase.',
    }

  return { result: true, message: 'Success.' }
}
