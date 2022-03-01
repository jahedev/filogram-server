const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const db = require('../db')

const Posts = db.define(
  'posts',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id',
    },
    mediaURL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'media_url',
    },
    mediaCaption: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'media_caption',
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   field: 'user_id',
    // },
    totalComments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'total_comments',
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

module.exports = Posts
