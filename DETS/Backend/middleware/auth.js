const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.verifyTokenMiddleware = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Clear invalid token cookie
      res.clearCookie("token");
      return res.status(403).json({ message: "Invalid token" });
    }

    userModel.findUserById(decoded.id, (err, user) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (!user) {
        res.clearCookie("token");
        return res.status(404).json({ message: "User not found" });
      }

      delete user.password;
      req.user = user;
      next();
    });
  });
};
