const express = require('express')
const router = express.Router()
const Posts = require('../db/models/posts.model')
const logger = require('../support/logger')

/* https://localhost:4000/api/posts/create-post
 *
 * This route will create a post if a valid user token is passed.
 */
router.post('/create-post', async (req, res) => {
  const { userToken, mediaFile, mediaCaption } = await req.body
})

/* https://localhost:4000/api/posts/delete-post
 *
 * This route will delete a post if a valid user token is passed.
 */
router.delete('/delete-post', async (req, res) => {
  const { userToken, mediaId } = await req.body
})

/* https://localhost:4000/api/posts/delete-post
 *
 * This route will edit a post's caption if a valid user token is passed.
 */
router.put('/edit-post', async (req, res) => {
  const { userToken, mediaId, mediaCaption } = await req.body
})

module.exports = router
