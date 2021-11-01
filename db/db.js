require('dotenv').config()

const { Sequelize } = require('sequelize')

const { DB_DIALECT, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env
const dbURI = `${DB_DIALECT}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  protocol: DB_PORT,
})

module.exports = db
