const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { fullnames, email, password } = req.body;

  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(403).json({ message: "User email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullnames,
      email,
      password: hashedPassword,
    });

    await user.save();

    //_id

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const savedUser = await User.findOne({email}).select("-password")

    res.status(201).json({
      data: {
        user: savedUser,
        token,
      },
      message: "User account has been created successfully!",
    });
  } catch (err) {
    console.log("Error during registration process: ", err);
    return res.status(500).json({
      message: "We've got an error, please try again after a moment!",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try{
    const existingUser = await User.findOne({email})
    if(!existingUser){
        return res.status(401).json({message: "There is no user found with provided crdentials!"})
    }

    const isPwdMatch = await bcrypt.compare(password, existingUser.password)
    if (!isPwdMatch){
        return res.status(401).json({message: "Invalid credentials!"})
    }

    const token = await jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
    res.status(200).json({
        data: {
            user: existingUser,
            token
        },
        message: "Login done successfully!"
    })

  }catch(err){
    console.log("Error during login process: ", err)
    return res.status(500).json({message: "We couldn't log you in, try after a moment"})
  }
};

exports.getCurrentUser =async (req, res) => {
    try{
        var user = await User.findById(req.user._id).select("-password")
        return res.status(200).json({user})
    } catch (err){
        console.log("Failed to get user: ", err)
    }
}
