const express = require('express');
const router = express.Router();
const Users = require('../db/models/users.model');
const resApi = require('../support/resApi');

const { JWT_SECRET, JWT_EXPIRATION } = process.env;

router.get('/logout', async (req, res) => {
  res.cookie('JWT', 'DELETE', { maxAge: 1, httpOnly: true });
  res.status(200).json(resApi(result.SUCCESS, 'Successfully logged out'));
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // DeMorgan's Law from Discrete Class: !A or !B == !(A and B)
  if (!(email && password)) {
    res.status(400).send(resApi(false, 'Error: email or password is empty.'));
  }

  try {
    const user = await Users.login(email, password);
    const token = createToken(user.id);
    res.cookie('JWT', token, { httpOnly: true, maxAge: JWT_EXPIRATION * 1000 });
    res.status(200).json(resAPI(true, { user: user.id }));
  } catch (err) {
    res.status(409).json(resApi(false, err.message));
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // DeMorgan's Law from Discrete Class: !A or !B == !(A and B)
  if (!(email && password)) {
    res.status(400).send(resApi(false, 'Error: email or password is empty.'));
  }

  try {
    let user = await Users.create({ email, password });
    const token = createToken(user.id);
    res.cookie('JWT', token, { httpOnly: true, maxAge: JWT_EXPIRATION * 1000 });
    res.status(201).json(resAPI(true, { user: user.id }));
  } catch (err) {
    res.status(409).json(resApi(false, err.message));
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

module.exports = router;
