const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const db = require('../db')

const Users = db.define(
  'users',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'user_id',
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
      field: 'username',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
  },
  {
    define: {
      freezeTableName: true,
    },
  }
)

module.exports = Users
