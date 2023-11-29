const express = require("express");

const { userAuth } = require("../middleware/userAuth");
const route = express.Router();
const user_conroller = require("../controller/user_controller");
route.get("/", user_conroller.login);
route.get("/logout", user_conroller.logout);
route.post("/login", user_conroller.postLogin);
route.post("/otp", user_conroller.otpVerification);
route.get("/dashboard", userAuth, user_conroller.getDashboard);
route.get("/dashboard/nuron", userAuth, user_conroller.getDashboard_nuron);
route.get("/dashboard/others", userAuth, user_conroller.getDashboard_others);

route.get("/dashboard/nuron-other", userAuth, user_conroller.getnuron_others);

module.exports = route;
