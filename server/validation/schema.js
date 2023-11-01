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

const employeeSchema = joi.object({
  employee_name: joi.string().required(),
  employee_email: joi.string().email().required(),
  employee_phone_no: joi.string().length(10).required(),
});

const roleSchema = joi.object({
  role_name: joi.string().required(),
});

const stateSchema = joi.object({
  state_name: joi.string().required(),
});
const town_city_Schema = joi.object({
  name: joi.string().required(),
});
const areaSchema = joi.object({
  area_name: joi.string().required(),
});

const inventory_types_schema = joi.object({
  name: joi.string().required(),
});
const inventorySchema = joi.object({
  ip_address: joi.string().required(),
  mac_address: joi.string().required(),
  date_onboarded: joi.string().required(),
  fleet_no: joi.string().required(),
});

const scheduleSchema = joi.object({
  Booking_datetime_from: joi.date().iso().required(),
  Booking_datetime_to: joi.date().iso().required(),

  confirmation_date: joi.date().required(),
  fleet_no: joi.string().required(),
  scenario_name: joi.string().required(),
  scheduling_name: joi.string().required(),
});

module.exports = {
  leadSchema,
  loginSchema,
  employeeSchema,
  roleSchema,
  stateSchema,
  town_city_Schema,
  areaSchema,
  inventory_types_schema,
  inventorySchema,
  scheduleSchema,
};
