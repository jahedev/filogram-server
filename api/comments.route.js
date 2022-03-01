const express = require('express')
const router = express.Router()
const Comments = require('../db/models/comments.model')
const logger = require('../support/logger')

/* https://localhost:4000/api/comments/comment-post
 *
 * This route will comment on a post if a valid user token is passed.
 */
router.post('/post-comment', async (req, res) => {
  const { userToken, postId, commentContent } = await req.body
})

/* https://localhost:4000/api/comments/delete-comment
 *
 * This route will delete a comment if a valid user token is passed.
 */
router.delete('/delete-comment', async (req, res) => {
  const { userToken, postId } = await req.body
})

module.exports = router
