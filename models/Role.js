const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      
},
  { timestamps: true }
);
module.exports = mongoose.model("role", roleSchema);
