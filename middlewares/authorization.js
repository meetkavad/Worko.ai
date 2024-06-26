// Middleware for authentication of user i.e. checking of valid jwt_token.

require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization"); // retrieving token from request header
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  // verifying the token : jwt.verify(token, secret_key, callback)
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid" });
    }
    req.user = user;
    console.log("authenticaton succesfull.");
    next(); // calling next middleware
  });
};

module.exports = { authenticateToken };
