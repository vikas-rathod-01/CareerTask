const jwt = require("jsonwebtoken");
const User= require('../models/User')
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.get("authorization");

    if (!bearerHeader) return res.status(401).json({ message: "Login to continue" });

    const bearerToken = await bearerHeader.split("Bearer ")[1];

    if (!bearerToken) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(bearerToken,"socialjwtkeyasdghasd623gdsa129jbwqkjhdghfhgfgh" ,async (error, valid) => {

      if (error) return res.status(401).json({ message: "Unauthorized" });

      if (valid) {
        const decodedToken = jwt.decode(bearerToken);
        const userId = decodedToken.userId;
        const isAvailable=await User.findOne({ _id: userId})

        if (!isAvailable)  return res.status(400).json({ message: "user Not Found"  });
        
        if (userId) {
          req.userId = userId;
          next();
        } else {
          return res.status(400).json({ message: "Session Expired" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Oops, Something went wrong. please try again",
    });
  }
};
