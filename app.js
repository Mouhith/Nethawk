// Require necessary modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const cookie_parsser = require("cookie-parser");
const db = require("./util/db");
const Leads = require("./models/leads");
const Employee = require("./models/employee");
const User_credentials = require("./models/user_credentials");

// Create an instance of the Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to handle JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie_parsser());

// Set the view engine to EJS for rendering templates
app.set("view engine", "ejs");

// Define routes
app.use("/", require("./server/routes/user_route"));
app.use("/employee", require("./server/routes/employee_route"));

// Define associations
User_credentials.hasOne(Employee);

// Determine the port to listen on (process.env.PORT for Heroku, or 5000 by default)
const port = process.env.PORT || 5000;

///atest path

app.get("/test", (req, res) => {
  res.render("Login");
});
// Connect to the database and start the server
async function startServer() {
  try {
    await db.sync();
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
