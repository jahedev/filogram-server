const jwt = require("jsonwebtoken");
const Users = require("../db/models/users.model");
const resAPI = require("../support/resAPI");

require("dotenv").config();

const no_auth = "unauthorized";

// middleware used to lock certain routes to require a verified user login via JWT
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.JWT;

    if (!token) {
        return res.status(401).json(resAPI(no_auth, "Not logged in."));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res
                .status(401)
                .json(resAPI(no_auth, "Unable to verify token."));
        }
        next();
    });
};

// update the user local variable to contain information about logged in user,
// if the user is not logged in, the res.locals.user will be null
module.exports.checkUser = async (req, res, next) => {
    res.locals.user = null;

    const token = req.cookies.JWT;

    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            return next();
        }

        let user = await Users.findByPk(decodedToken.id);
        console.log(user);
        res.locals.user = user;
        next();
    });
};
