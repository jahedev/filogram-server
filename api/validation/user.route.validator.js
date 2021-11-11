/*
 * This file will contain validations critical to users.route.js
 * such as verifying if a user already exists before adding/deleting
 * a user.
 */

const validator = require('./validator')
const Users = require('../../db/models/users.model')

const UserValidator = {
  // validation before a new user is added to database
  validateNewUser(username, email, firstName, lastName, password) {
    if (!validator.isUsername(username))
      return {
        result: false,
        message: 'Invalid Username: only letters and numbers are allowed.',
      }

    if (!validator.isEmail(email))
      return { result: false, message: 'Invalid Email.' }

    if (!validator.isName(firstName) || !validator.isName(lastName))
      return {
        result: false,
        message: 'Invalid Name: name should contain letters only.',
      }

    if (!validator.isStrongPassword(password))
      return {
        result: false,
        message:
          'Invalid Password: must contain at least 8 characters, at least 1 letter and number.',
      }

    return { result: true, message: 'Success.' }
  },
  // returns a promise of a db search for the username, rather than a boolean value
  async usernameExists(username) {
    let user = await Users.findOne({ where: { username } })
    return user !== null
  },
}

module.exports = UserValidator
