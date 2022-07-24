const express = require("express");
const router = express.Router();
const Likes = require("../db/models/likes.model");
const logger = require("../support/logger");

/* https://localhost:4000/api/likes/like-post
 *
 * This route will like a post if a valid user token is passed.
 */
router.post("/follow-user", async (req, res) => {
    const { userToken, postId } = await req.body;
});

/* https://localhost:4000/api/likes/unlike-post
 *
 * This route will delete a post if a valid user token is passed.
 */
router.delete("/unfollow-user", async (req, res) => {
    const { userToken, postId } = await req.body;
});

module.exports = router;
