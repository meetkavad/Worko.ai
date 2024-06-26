const express = require("express");

const { authenticateToken } = require("../middlewares/authorization"); // Authorization middleware
const {
  getUserList,
  getUser,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = express.Router(); // Creating a user router

// get user list and post new user : /worko/api/
router
  .route("/")
  .get(authenticateToken, getUserList)
  .post(authenticateToken, postUser);

// get, update and delete user by id : /worko/api/:id
router
  .route("/:id")
  .get(authenticateToken, getUser)
  .patch(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

module.exports = router;
