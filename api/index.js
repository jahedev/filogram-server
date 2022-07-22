const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
// router.use("/comments", require("./comments.route"));
// router.use("/follows", require("./follows.route"));
// router.use("/likes", require("./likes.route"));
// router.use("/posts", require("./posts.route"));
router.use("/users", require("./users.route"));

//Anything not found gets a 404
router.use((req, res, next) => {
    const error = new Error(
        "404 Not Found - We couldn't find the page you were looking for."
    );
    error.status = 404;
    next(error);
});

module.exports = router;
