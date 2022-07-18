const Users = require('../db/models/users.model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_EXPIRATION = 60 * 60 * 24 * 14; // 14 days
