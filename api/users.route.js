const express = require('express')
const router = express.Router()
const Users = require('../db/models/users.model')
const UserValidator = require('./validation/user.route.validator')
const logger = require('../support/logger')
// const auth = require('../auth/auth.js')

// router.get('/auth', async (req, res) => {})

/* https://localhost:4000/api/users/create-user
 *
 * This route will create a user, validate for correct input -- including
 * a strong password, encrypt the password, and added the user to the
 * database if the email and username does not exist.
 */
router.post('/create-user', async (req, res) => {
  const { username, email, firstName, lastName, password } = await req.body

  const validation = UserValidator.validateNewUser(
    username,
    email,
    firstName,
    lastName,
    password
  )

  let usernameExists = await UserValidator.usernameExists(username)
  let emailExists = await UserValidator.emailExists(email)

  if (usernameExists) {
    logger.message(`Username '${username}' already exists.`, 'User Creation')
    return res.status(409).send({
      message: `Error: ${username} already exists.`,
    })
  } else if (emailExists) {
    logger.message(`Email '${email}' already exists.`, 'User Creation')
    return res.status(409).send({
      message: `Error: ${email} already exists.`,
    })
  }

  if (!validation.result)
    return res.status(400).send({
      message: `Error: ${validation.message}`,
    })

  // create user in database
  try {
    let user = await Users.create({
      firstName,
      lastName,
      username,
      email,
      password, // Password needs to be protected, this is just temporary.
    })

    res
      .status(200)
      .send({ message: ` User: ${user.username} | ${user.email} created.` })
  } catch (error) {
    logger.log(error, 'Internal Server Error')
    res.status(500).send({ message: '500 - Internal Server Error' })
  }
})

module.exports = router
