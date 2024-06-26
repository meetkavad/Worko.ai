const express = require("express");
const { login } = require("../controllers/auth");

const router = express.Router(); // creating a new auth router

router.route("/login").post(login); // login route for logging in

module.exports = router;
