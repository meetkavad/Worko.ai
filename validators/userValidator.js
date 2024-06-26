const Joi = require("joi");

const userValidator = Joi.object({
  email: Joi.string().email(),
  zip_code: Joi.string().pattern(/^[0-9]{5}$/), // a 5 digit number
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // a 24 digit hex number (or 12 bytes long) mongoDB id
});

module.exports = { userValidator };
