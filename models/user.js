const mongoose = require("mongoose");

// A simple user schema defination :

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: true,
    },
    name: String,
    age: Number,
    city: String,
    zip_code: String,
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("User", userSchema);
