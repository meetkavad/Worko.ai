// This is the controller Leayer for user entity. It contains functions for handling user related requests.
// Flow : create requestDTO -> validate request -> pass to service -> get responseDTO -> send response with a statuscode.

const joi = require("joi");
const userService = require("../services/userService");
const asyncWrapper = require("../middlewares/asyncwrapper");
const { UserRequestDto } = require("../dto/userDto");
const { userValidator } = require("../validators/userValidator");

const getUserList = asyncWrapper(async (req, res) => {
  const resObjects = await userService.getUserList();
  return res.status(200).json({ user_list: resObjects });
});

const getUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { error } = userValidator.validate({ id });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const resObject = await userService.getUserById(id);
  return res.status(200).json({ user: resObject });
});

const postUser = asyncWrapper(async (req, res) => {
  const reqObject = new UserRequestDto(req.body);
  const { email, zip_code } = reqObject;
  const { error } = userValidator.validate({ email, zip_code });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const resObject = await userService.createUser(req.body);
  return res.status(201).json({ new_user: resObject });
});

const updateUser = asyncWrapper(async (req, res) => {
  const reqObject = new UserRequestDto(req.body);
  const { id } = req.params;

  const { email, zip_code } = reqObject;
  const { error } = userValidator.validate({ email, zip_code, id });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const resObject = await userService.updateUser(id, reqObject);
  return res.status(200).json({ updated_user: resObject });
});

const deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { error } = userValidator.validate({ id });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const resObject = await userService.deleteUser(id);
  return res.status(200).json({ deleted_user: resObject });
});

module.exports = { getUserList, getUser, postUser, updateUser, deleteUser };
