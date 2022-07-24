const jwt = require("jsonwebtoken");
const Users = require("../db/models/users.model");
const logger = require("../support/logger");
const resAPI = require("../support/resAPI");

require("dotenv").config();

const no_auth = "unauthorized";

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.JWT;

    if (!token) {
        return res.status(401).json(resAPI(no_auth, "Not logged in."));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res
                .status(401)
                .json(resAPI(no_auth, "Unable to verify token."));
        }
        next();
    });
};

module.exports.checkUser = async (req, res, next) => {
    res.locals.user = null;

    const token = req.cookies.JWT;

    if (!token) {
        logger.log("No token.", "checkUser");
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            logger.log("Unable to verify", "checkUser");
            return next();
        }

        let user = await Users.findByPk(decodedToken.id);
        console.log(user);
        res.locals.user = user;
        logger.log("Checked for user", "checkUser");
        next();
    });
};
