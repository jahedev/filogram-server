const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const db = require('../db')

const Likes = db.define(
  'likes',
  {
    like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'like_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'post_id',
    },
  },
  {
    define: {
      freezeTableName: true,
    },
  }
)

module.exports = Likes
