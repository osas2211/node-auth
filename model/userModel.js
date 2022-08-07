const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: [true, "user name already exists"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
})

module.exports = mongoose.model("user", userSchema)
