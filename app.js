const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const pool = require('./db')

// .env file
require('dotenv').config()

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// initialize express app
app.listen(process.env.PORT, () => {
  console.log(`>> app is listening on localhost:${process.env.PORT}`)
})

/* #region: connect to database */

/* #endregion: connect to database */

/* #region: middleware */
app.use(morgan('dev'))
/* #endregion: middleware */
