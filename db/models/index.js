const Users = require('./users.model')
const Follows = require('./follows.model')
const Likes = require('./likes.model')
const Posts = require('./posts.model')
const Comments = require('./comments.model')

// Users Relationships
Users.hasMany(Posts)
Users.hasMany(Follows)
Users.hasMany(Likes)
Users.hasMany(Comments)

Posts.belongsTo(Users)
Follows.belongsTo(Users)
Likes.belongsTo(Users)
Comments.belongsTo(Users)

// Posts Relationships
Posts.hasMany(Likes)
Posts.hasMany(Comments)

Likes.belongsTo(Posts)
Comments.belongsTo(Likes)

module.exports = { Users, Posts, Follows, Likes, Comments }
