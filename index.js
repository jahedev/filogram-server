const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const db = require('./db');
const auth = require('./auth/authMiddleware');

// .env //
require('dotenv').config();
const { HOST, PORT } = process.env;

// MIDDLEWARE //
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(
  session({
    secrent: 'cats',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(auth.initialize());
app.use(auth.session());
app.use(express.urlencoded({ extended: false }));

// ROUTES //
app.use('/api', require('./api/index'));

// INITIALIZE DB AND SERVER //

db.sync();
app.listen(PORT, () => {
  console.log(`>> app is listening on ${HOST}:${PORT}`);
});
