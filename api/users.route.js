const express = require('express')
const router = express.Router()
const Users = require('../db/models/users.model')
const UserValidator = require('./validation/user.route.validator')
const logger = require('../lib/logger')
const genPassword = require('../lib/password-utils').genPassword
const passport = require('../config/passport')

/* https://localhost:4000/api/users/register
 *
 * This route will create a user, validate for correct input -- including
 * a strong password, hash and salt the password, and add the user to the
 * database if the email and username does not exist.
 */
router.post('/register', async (req, res) => {
  const { username, email, firstName, lastName, password } = await req.body

  // ---- VALIDATE INPUT ---- //
  const validation = UserValidator.validateNewUser(
    username,
    email,
    firstName,
    lastName,
    password
  )

  // ---- VERIFY THAT USERNAME & EMAIL ARE UNIQUE ---- //

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
  // At this point, we have confirmed that username & email are unique.

  // ---- HASH & SALT PASSWORD ---- //
  const saltHash = genPassword(password)

  const salt = saltHash.salt
  const hash = saltHash.hash

  // ---- CREATE USER IN DATABASE ---- //
  try {
    let user = await Users.create({
      firstName,
      lastName,
      username,
      email,
      password: hash,
      salt: salt,
    })

    res
      .status(200)
      .send({ message: ` User: ${user.username} | ${user.email} created.` })
  } catch (error) {
    logger.log(error, 'Internal Server Error')
    res.status(500).send({ message: '500 - Internal Server Error' })
  }
})

/* https://localhost:4000/api/users/login
 *
 * This route will authenticate a user using passport-local.
 */
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/api/users/login-failure',
    failureMessage: true,
  }),
  (req, res) => {
    // res.redirect('/~' + req.username)
    res.status(200).send({
      message: `User: ${req.user.username} | ${req.user.email} logged in.`,
    })
  }
)

/* https://localhost:4000/api/users/login-failure
 *
 * User will get redirected to this route if user authentication fails.
 */
router.get('/login-failure', (req, res) => {
  logger.error('wrong username or password.')
  res.status(401).send({ message: '401 - Unauthorized' })
})

module.exports = router
