require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connect")
const app = express()

const PORT = process.env.PORT || 5500

app.use(express.json())

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
