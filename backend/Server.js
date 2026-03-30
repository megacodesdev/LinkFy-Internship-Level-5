require("dotenv").config()
const express = require("express")
const connectDB = require("./config/conn")
const PORT = process.env.PORT

const app = express()

//Automatically connect to MongoDB on server start
connectDB()

//Middleware for parsing incoming data into JSON format
app.use(express.json())

//Exposing backend route and connection status
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

