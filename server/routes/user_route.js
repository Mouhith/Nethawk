const express = require("express");

const { userAuth } = require("../middleware/userAuth");
const route = express.Router();
const user_conroller = require("../controller/user_controller");
route.get("/login", user_conroller.login);
route.post("/login", user_conroller.postLogin);
route.post("/otp", userAuth, user_conroller.otpVerification);
route.get("/dashboard", userAuth, user_conroller.getDashboard);
module.exports = route;
