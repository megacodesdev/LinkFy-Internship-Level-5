const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.register = (req, res) => {
  const { username, email, password, role, phone } = req.body;

  //Check if user exists
  userModel.findUserByEmail(email, async (err, existingUser) => {
    if (err) {
      console.error("Find user error:", err);
      return res.status(500).json({
        message: "Server error during registration",
        error: err.message,
      });
    }

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists!",
      });
    }

    try {
      //Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      //Create user
      userModel.createUser(
        username,
        email,
        hashedPassword,
        role,
        phone,
        (err, newUser) => {
          if (err) {
            console.error("Create user error:", err);
            return res.status(500).json({
              message: "Failed to create user",
              error: err.message,
            });
          }

          console.log("New user created:", newUser); // Verify data

          //Generate JWT token for auto-login
          const token = jwt.sign(
            {
              id: newUser.id,
              role: newUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(201).json({
            success: true,
            message: "Registration successful!",
            token,
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email,
              role: newUser.role,
              phone: newUser.phone,
            },
          });
        }
      );
    } catch (hashError) {
      console.error("Password hash error:", hashError);
      res.status(500).json({
        message: "Password hashing failed",
        error: hashError.message,
      });
    }
  });
};

exports.login = async (req, res) => {
    const { identifier, password } = req.body;
  
    try {
      const user = await new Promise((resolve, reject) => {
        userModel.findUserByEmailOrUsername(identifier, (err, user) => {
          if (err) reject(err);
          resolve(user);
        });
      }); 
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials!" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password!" });
      }
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Setting HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
        domain: "localhost"
      });
  
      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error!" });
    }
  };
  
  exports.logout = (req, res) => {
    // Clearing the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    res.status(200).json({ message: "Logged out successfully" });
  };
  
  exports.verifyToken = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
    // token is coming from cookies instead of headers
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone,
      },
    });
  };

exports.getClients = (req, res) => {};
