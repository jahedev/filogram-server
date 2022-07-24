const express = require("express");
const router = express.Router();
const Posts = require("../db/models/posts.model");
const logger = require("../support/logger");
const resAPI = require("../support/resAPI");

/* https://localhost:4000/api/posts/create-post
 *
 * This route will create a post if a valid user token is passed.
 */
router.post("/create-post", async (req, res) => {
    const { user } = res.locals;
    if (!user)
        return res.status(resAPI(401, "You need to be logged in to post."));

    const userId = user.dataValues.id;
    const { mediaURL, mediaCaption } = await req.body;
    const totalComments = 0,
        totalLikes = 0;

    res.status(200).json(
        resAPI(true, {
            userId,
            mediaURL,
            mediaCaption,
            totalComments,
            totalLikes,
        })
    );
});

/* https://localhost:4000/api/posts/delete-post
 *
 * This route will delete a post if a valid user token is passed.
 */
router.delete("/delete-post", async (req, res) => {
    const { userToken, mediaId } = await req.body;
});

/* https://localhost:4000/api/posts/delete-post
 *
 * This route will edit a post's caption if a valid user token is passed.
 */
router.put("/edit-post", async (req, res) => {
    const { userToken, mediaId, mediaCaption } = await req.body;
});

module.exports = router;
