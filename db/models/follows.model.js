const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const db = require('../db');

const Follows = db.define(
  'follows',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id',
    },
    // followerUserId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   field: 'follower_user_id',
    // },
    followedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'followed_user_id',
    },
  },
  {
    define: {
      freezeTableName: true,
    },
  }
);

module.exports = Follows;
