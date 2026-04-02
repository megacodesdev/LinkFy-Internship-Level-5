require('dotenv').config()
const express = require("express")
const PORT = process.env.PORT
const connectDB = require("./config/conn")
const userRoutes = require("./routes/userRoutes")

const app = express()

//Connecting MongoDB Database
connectDB()

//Middleware for parsing incoming data into JSON format
app.use(express.json())

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})