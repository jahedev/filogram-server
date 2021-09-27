const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  first_name: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
  },
  last_name: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
  },
  bio: String,
  image: String,
})

const UserModel = mongoose.model('user', userSchema)
