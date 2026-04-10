const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require("./routes/authRoutes")
const equipmentsRoutes = require("./routes/equipmentsRoutes")
const cookieParser = require("cookie-parser")

dotenv.config()

const app = express()

app.use(cors({ 
    credentials: true,
    origin: ["http://localhost:5173", ""],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello! DETS Server is active.")
})

app.use('/api/auth', authRoutes)
app.use("/api/add", equipmentsRoutes)
app.use('/api/delete', equipmentsRoutes)
app.use('/api/update', equipmentsRoutes)


const PORT = process.env.PORT || 5172;


app.listen(PORT, 'localhost', () => {
    console.log(`DETS Server is running on port ${PORT}`)
})

