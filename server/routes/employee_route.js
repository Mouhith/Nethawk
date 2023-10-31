// Import required modules and create a new Express router
const express = require("express");
const routes = express.Router();

const { authentication } = require("../middleware/authentication");
// Import the employee controller module
const employee_controller = require("../controller/employee_controller");

// Define a route for creating leads
routes.post("/leads", authentication, employee_controller.leadCreation);
routes.post("/schedule", authentication, employee_controller.scheduleCreation);
routes.patch(
  "/schedule/:id",
  authentication,
  employee_controller.scheduleUpdate
);

routes.get("/schedule", authentication, employee_controller.getschedule);

// Export the router for use in other parts of the application
module.exports = routes;
