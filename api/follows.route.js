const express = require('express')
const router = express.Router()
const Follows = require('../db/models/follows.model')
const logger = require('../support/logger')

/* https://localhost:4000/api/follows/follow-user
 *
 * This route will follow a user if a valid user token is passed.
 */
router.post('/follow-user', async (req, res) => {
  const { userToken, userId } = await req.body
})

/* https://localhost:4000/api/posts/unfollow-user
 *
 * This route will unfollow a user if a valid user token is passed.
 */
router.delete('/unfollow-user', async (req, res) => {
  const { userToken, userId } = await req.body
})

module.exports = router
