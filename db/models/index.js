const Users = require('./users.model')
const Follows = require('./follows.model')
const Likes = require('./likes.model')
const Posts = require('./posts.model')
const Comments = require('./comments.model')

Users.hasMany(Posts)
Users.hasMany(Follows)
Users.hasMany(Likes)
Users.hasMany(Comments)

Posts.belongsToMany(Users)
Follows.belongsToMany(Users)
Likes.belongsToMany(Users)
Comments.belongsToMany(Users)

module.exports = { Users }
