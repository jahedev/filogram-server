const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db')
const Users = require('../db/models/users.model')
const validPassword = require('../lib/password-utils').validPassword

const verifyCb = (username, password, done) => {
  Users.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) return done(null, false)
      const isValid = validPassword(password, user.hash, user.salt)

      if (isValid) return done(null, user)
      else return done(null, false)
    })
    .catch((err) => {
      return done(err)
    })
}

const strategy = new LocalStrategy(verifyCb)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => {
      done(null, user)
    })
    .catch((err) => done(err))
})

module.exports = passport
