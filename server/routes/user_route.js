const express = require("express");
const route = express.Router();
const user_conroller = require("../controller/user_controller");
route.post("/login", user_conroller.login);
route.post("/otp", user_conroller.otpVerification);
module.exports = route;
