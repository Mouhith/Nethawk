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
const { Inventory, Inventory_type } = require("./models/inventory");
const { States, Town_City, Area } = require("./models/placeDirectory");
const Result = require("./models/result");
const Roles = require("./models/roles");
const Schedule = require("./models/schedule");
const Test = require("./models/test");
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
app.use("/admin", require("./server/routes/admin_route"));

app.use((err, req, res, next) => {
  let status = 500;
  let message = "Internal server error";

  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = err.errors[0].message;
  }

  res.status(status).json({ error: message });
});

// Define associations
User_credentials.hasOne(Employee);
Employee.belongsTo(User_credentials);
Roles.hasMany(Employee);
Employee.belongsTo(Roles);
User_credentials.hasOne(Leads);
Leads.belongsTo(User_credentials);
States.hasMany(Town_City);
Town_City.belongsTo(States);
Town_City.hasMany(Area);
Area.belongsTo(Town_City);
Inventory_type.hasMany(Inventory);
Inventory.belongsTo(Inventory_type);
Area.hasMany(Inventory);
Inventory.belongsTo(Area);
Leads.hasOne(Schedule);
Schedule.belongsTo(Leads);
Inventory.hasOne(Schedule);
Schedule.belongsTo(Inventory);
Test.hasMany(Result);
Result.belongsTo(Test);
Schedule.hasMany(Result);
Result.belongsTo(Schedule);
// Determine the port to listen on (process.env.PORT for Heroku, or 5000 by default)
const port = process.env.PORT || 5000;

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
