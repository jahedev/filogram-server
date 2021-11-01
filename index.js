const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db')

// .env file
require('dotenv').config()

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
