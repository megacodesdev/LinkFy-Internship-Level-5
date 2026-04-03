require('dotenv').config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const PORT = process.env.PORT
const connectDB = require("./config/conn")
const userRoutes = require("./routes/userRoutes")

const app = express()

//Connecting MongoDB Database
connectDB()

//CORS Config
app.use(cors({
    origin: "http://localhost:5173",
    withCredentials: true
}))

//Middleware for parsing incoming data into JSON format
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/users/auth", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})