const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db')

// .env //
require('dotenv').config()
const { HOST, PORT } = process.env

// MIDDLEWARE //
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// ROUTES //
app.use('/api', require('./api/index'))

// INITIALIZE DB AND SERVER //

db.sync()
app.listen(PORT, () => {
  console.log(`>> app is listening on ${HOST}:${PORT}`)
})
