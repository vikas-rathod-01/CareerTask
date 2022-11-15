
// =========================          registration api            ==========================

const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  try {


    const salt = await bcrypt.genSalt(parseInt(8));
    const newPasswordHash = await bcrypt.hash(req.body.password , salt);
    req.body.password = newPasswordHash;

    const { name, email, password } = req.body;
    if (await User.findOne({ email: email })) {
      return res.status(400).json({
        message: "User Already Exist. Please Login",
      });
    }

    const newUser = await new User({
      name ,
      email,
      password,
    });

    const user = await newUser.save();
    if (user._id) {
      return res.status(201).json({
        message: `Account created for ${user.email}`,
        id:user._id
      });
    }
    return res.status(500).json({ error: "Failed to Create Account" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Oops, Something went wrong. please try again",
    });
  }
};
