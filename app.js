require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connect")
const router = require("./routes")
const app = express()
const auth = require("./middlewares/auth")

const PORT = process.env.PORT || 5500

app.use(express.json())
app.use("/api/v1", router)

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
