const express = require('express')
const { register, login, verifyToken, logout } = require('../controllers/authController')
const { verifyTokenMiddleware } = require("../middleware/auth")

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post("/logout", logout)
router.get("/verify", verifyTokenMiddleware, verifyToken)

module.exports = router

