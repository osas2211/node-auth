const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const userRegister = async (req, res, next) => {
  const { email, password, userName } = req.body
  const encryptedPassword = await bcrypt.hash(password, 10)
  const userData = {
    email,
    password: encryptedPassword,
    userName,
  }

  try {
    if (email && password && userName) {
      const user = await userModel.create(userData)
      const token = jwt.sign(
        { userID: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      )
      user.token = token
      return res.status(200).json({ success: "true", user: user })
    }
    res
      .status(400)
      .json({ success: "false", message: "Some fields are missing" })
  } catch (error) {
    res.status(500).json({ success: "false", message: error.message })
    console.log(error.message)
  }
}

const userLogin = async (req, res, next) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      const user = await userModel.findOne({ email: email })
      if (!user) {
        return res
          .status(400)
          .json({ success: "false", message: "user does not exist" })
      }
      const isPassword = await bcrypt.compare(password, user.password)
      if (!isPassword) {
        return res
          .status(400)
          .json({ success: "false", message: "Password is incorrect" })
      }
      const token = jwt.sign(
        {
          userID: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      )
      user.token = token
      return res.status(200).json({ success: true, user: user })
    } catch (error) {
      res.status(500).json({ success: "false", message: error.message })
      console.log(error.message)
    }
  }
}

const dashboard = (req, res, next) => {
  res.status(200).json({ auth: true, user: req.user })
}

module.exports = {
  userRegister,
  userLogin,
  dashboard,
}
