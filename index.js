const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const db = require("./db");
const { checkUser } = require("./auth/authMiddleware");

/* --- CONFIGURATION --- */
require("dotenv").config();
const { HOST, PORT } = process.env;

/* --- MIDDLEWARE --- */
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* --- ROUTES --- */
app.all("*", checkUser);
app.use("/api", require("./api/index"));

/* --- DATABASE CONNECTION & SERVER --- */
db.sync();
app.listen(PORT, () => {
    console.log(`>> app is listening on ${HOST}:${PORT}`);
});
