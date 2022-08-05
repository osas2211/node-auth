require("dotenv").config()
const express = require("express")
const app = express()

const PORT = process.env.PORT || 5500

app.use(express.json())

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
})
