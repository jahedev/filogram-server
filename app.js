const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// .env file
require('dotenv').config();

const app = express();

/* #region: connect to database */
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.y9n5k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('>> connect to database.');

    // initialize express app
    app.listen(process.env.PORT, () => {
      console.log(`>> app is listening on localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
/* #endregion: connect to database */

/* #region: middleware */
app.use(morgan('dev'));
/* #endregion: middleware */
