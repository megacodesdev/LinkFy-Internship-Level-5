const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.verifyAuth = async (req, res, next) => {
  try {
    // var token;
    let token;

    //Extracting req headers where token has been sent
    const headers = req.headers.authorizaton;
    if (headers && headers.authorizaton.startsWith("Bearer ")) {
      token = headers.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Ooops! You're not authorized!" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedToken.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "There is no user found!" });
    }

    next();
  } catch (err) {
    console.log("Error during auth verification: ", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
