const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: true,
      select: false,
    },
    roleID:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    }],

    jwtToken: [String],

},
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);



