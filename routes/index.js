const express = require("express")
const { userRegister, userLogin, dashboard } = require("../controllers")
const router = express.Router()
const auth = require("../middlewares/auth")

router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/dashboard", auth, dashboard)

module.exports = router
