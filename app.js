// Require necessary modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");

// Create an instance of the Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to handle JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS for rendering templates
app.set("view engine", "ejs");

// Define a route for the root URL ("/") and render a "test" view
app.get("/", (req, res) => {
  res.render("test");
});

// Determine the port to listen on (process.env.PORT for Heroku, or 3000 by default)
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
