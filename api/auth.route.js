const express = require("express");
const router = express.Router();
const Users = require("../db/models/users.model");
const resAPI = require("../support/resAPI");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = parseInt(process.env.JWT_EXPIRATION);

router.get("/logout", async (_, res) => {
    res.cookie("JWT", "DELETE", { maxAge: 1, httpOnly: true });
    res.status(200).json(resAPI(true, "Successfully logged out"));
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // make sure fields are valid, and email exists
    const valid = await validateLoginFields(req.body);
    if (valid.result === "error") {
        return res.status(400).json(valid);
    }

    try {
        const user = await Users.login(email, password);
        const token = createToken(user.id);
        res.cookie("JWT", token, {
            httpOnly: true,
            maxAge: JWT_EXPIRATION * 1000,
        });
        res.status(200).json(resAPI(true, { user: user.id }));
    } catch (err) {
        res.status(409).json(resAPI(false, err.message));
    }
});

router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    console.log(`
    Creating New User:
    
      firstName: ${firstName}
      lastName: ${lastName}
      email: ${email}
      password: ${password}
      username: ${lastName}
    `);

    // if fields are not valid, return with the error message
    const valid = await validateSignupFields(req.body);
    if (valid.result === "error") {
        res.status(400).json(valid);
    }

    try {
        let user = await Users.create({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        const token = createToken(user.id);
        res.cookie("JWT", token, {
            httpOnly: true,
            maxAge: JWT_EXPIRATION * 1000,
        });
        res.status(201).json(resAPI(true, { user: user.id }));
    } catch (err) {
        res.status(409).json(resAPI(false, err.message));
    }
});

const validateLoginFields = async function (body) {
    const { email, password } = body;

    if (!(email && password)) {
        return resAPI(false, "Error: email or password is empty.");
    }

    const user = await Users.emailExists(email);
    if (!user) return resAPI(false, "Error: email does not exist.");
    return resAPI(true, "None.");
};

const validateSignupFields = function (body) {
    const { firstName, lastName, email, password, username } = body;

    if (!(email && password)) {
        return resAPI(false, "Error: email or password is empty.");
    }

    if (!(username && firstName && lastName)) {
        return resAPI(
            false,
            "username, firstName, or lastName field(s) are empty."
        );
    }

    return resAPI(true, "None");
};

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION + "s" });
};

module.exports = router;
