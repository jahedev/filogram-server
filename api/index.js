const express = require('express')
const router = express.Router()

router.use('/users', require('./users.route'))

//Anything not found gets a 404
router.use((req, res, next) => {
  const error = new Error(
    "404 Not Found - We couldn't find the page you were looking for."
  )
  error.status = 404
  next(error)
})

module.exports = router
