require('dotenv').config()

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db')
const Users = require('../db/models/users.model')

passport.use(
  new LocalStrategy((userName, passWord, done) => {
    Users.findOne({
      where: {
        username: userName,
        password: passWord,
      },
    })
      .then((user) => {
        return done(null, user)
      })
      .catch((err) => {
        return done(err)
      })
  })
)

module.exports = passport
