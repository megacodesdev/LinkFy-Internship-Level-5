import express, { json } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import mysql from 'mysql2'
import cors from 'cors'
import cookieParser from "cookie-parser";

const PORT =6000;

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "ELSOFTMEGACODER30333el",
    database: "dets"
})

db.connect((err) => err ? console.log("Error while tryin to connect to MySQL Server") : console.log("MySQL Server connected well."))

const SECRET_KEY = "1b86980ae27d60939b2c24a6c038e7210dc6a7580958f2ec1f86c64d9792121766202a4900ce69abfc4867f9ee9cfc8508eb2a9fe3121d76a18106dc85da5876";

function generateToken(user){
    return jwt.sign({
        id: user.userId,
        email: user.email
    },
    SECRET_KEY,
    {expiresIn: "1h"}
)
}

app.post("/register", async (req, res) => {
    const {username, email, password} = req.body;

    try{
        const add= "INSERT INTO users (username, email, password) VALUES(?, ?, ?)"
        await db.promise().query(add, [username, email, password], (err) => {
            if(err){
                console.log("Error while adding new user in the system. ", err)
            }
        })

        //Signing token to users
        jwt.sign({
            id: user.id,
            email: user.email
        }, SECRET_KEY, {expiresIn: "1h"})

        //Setting token into cookies.
        res.cookie("token", token, {
            httpOnly: true,
            sameSite:"lax",
            maxAge:  2 * 60 * 1000
        })

        res.status(200).json({token, user: {id: user.id, email: user.email}})

        console.log("New user added in the databse.")
    } catch(error){
        console.log("Error while trying to add user.")
    }
})

//Verifying token for users
app.get("/verify/token", async (req, res) => {
    const token = req.cookies.token;
    if(!token){
        console.log("User with no token tried to log in but failed")
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            console.log("Error while trying to verify token", err)
        }
        res.json({user: decoded, valid: true})
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})