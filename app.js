const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const db = require('./db')
const passport = require('./config/passport')

/**
 * ---------- CONFIG ----------
 */
require('dotenv').config()
const { HOST, PORT } = process.env

/**
 * ---------- MIDDLEWARE ----------
 */
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
)

/**
 * ---------- USER AUTHENTICATION ----------
 */
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

/**
 * ---------- ROUTES ----------
 */
app.use('/api', require('./api/index'))

/**
 * ---------- INITALIZE DB AND SERVER ----------
 */
db.sync()
app.listen(PORT, () => {
  console.log(`>> app is listening on ${HOST}:${PORT}`)
})
