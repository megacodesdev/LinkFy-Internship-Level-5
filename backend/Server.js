require("dotenv").config()
const PORT = process.env.PORT || 5000
const express = require("express")
const connectDB = require("./config/conn")
const userRoutes = require("./routes/userRoutes")

const app = express()

connectDB()

app.use(express.json())
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})

