const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not found: Authorization Failed",
      })
    }
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedPayload
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    })
  }
  return next()
}

module.exports = verifyToken
