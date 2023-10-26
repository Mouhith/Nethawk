const joi = require("joi");

const leadSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone_num: joi.string().length(10).required(),
  address: joi.string().required(),
  pan: joi.string().required(),
  designation_of_contract_person: joi.string().required(),
  organisation_name: joi.string().required(),
  date_of_appointment: joi.string().required(),
  time_of_appointment: joi.string().required(),
});

const loginSchema = joi.object({
  phone_num: joi.string().length(10).required(),
});

module.exports = {
  leadSchema,
  loginSchema,
};
