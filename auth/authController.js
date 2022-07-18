const Users = require('../db/models/users.model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_EXPIRATION } = process.env;
