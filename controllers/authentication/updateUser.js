

// ===========      JWT Key ,id(user id) as Query Parameter and Body is Required==============


const User = require("../../models/User");
const Role = require("../../models/Role");
const bcrypt = require("bcrypt");


module.exports = async (req, res) => {
  try {

    const {name,email}=req.body
    const updateID=req.query.id
    await User.updateOne({_id:updateID},{$set:{name:name,email:email}})

    return res.status(500).json({message: "User Updated Successfully..."});
} catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Oops, Something went wrong. please try again later",
    });
  }
};