const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const db = require('../db')

const Comments = db.define(
  'commenst',
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'comment_id',
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'post_id',
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'comment',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    totalLikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'total_likes',
    },
  },
  {
    define: {
      freezeTableName: true,
    },
  }
)

module.exports = Comments
