// This is a controller layer for the auth entity. It contains a function for handling login request.

require("dotenv").config();
const asyncwrapper = require("../middlewares/asyncwrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = asyncwrapper(async (req, res) => {
  const { admin, password } = req.body;

  is_correct = bcrypt.compare(process.env.PASSWORD, password);

  if (!is_correct || admin !== process.env.ADMIN) {
    console.log("invalid credentials");
    res.status(400).json({
      message: "invalid credentials",
    });
  } else {
    const jwt_token = jwt.sign({ id: admin }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "logged in successfully",
      jwt_token: jwt_token,
    });
  }
});

module.exports = { login };
