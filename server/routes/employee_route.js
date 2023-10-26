// Import required modules and create a new Express router
const express = require("express");
const routes = express.Router();

// Import the employee controller module
const employee_controller = require("../controller/employee_controller");

// Define a route for creating leads
routes.post("/leads", employee_controller.leadCreation);

// Export the router for use in other parts of the application
module.exports = routes;
