const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const db = require('../db')

const Users = db.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'username',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'salt',
    },
  },
  {
    define: {
      freezeTableName: true,
    },
  }
)

module.exports = Users
