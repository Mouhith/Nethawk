// Require necessary modules
const val = require("./server/tools/chartOperations");
const chatData = require("./server/tools/chatDataFilter");
//
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const CronJob = require("cron").CronJob;
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
const crojob = require("./server/tools/crone");

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
app.set("views", path.join(__dirname, "views"));
// Define routes
app.use("/", require("./server/routes/user_route"));
app.use("/employee", require("./server/routes/employee_route"));
app.use("/admin", require("./server/routes/admin_route"));

//test
app.get("/test", async (req, res) => {
  const result = await Result.findAll({ where: { scheduling_name: "nuron" } });
  const mapedValues = result.map((result) => result.dataValues);
  const upload = await chatData.nuroSpeed(mapedValues, "speedUploadFile");
  const download = await chatData.nuroSpeed(mapedValues, "speedDownloadFile");
  const stream = await chatData.nuroSpeed(mapedValues, "streaming");
  const streamquality = await chatData.nuroSpeed(mapedValues, "streaming");
  const browser = await chatData.nuroSpeed(mapedValues, "browse");
  const data = await val.group(
    download,
    "startDateTimeUtc",
    "speedDownloadDuration"
  );
  const speedDownloadAvgExclFileSlowstart = await val.group(
    download,
    "startDateTimeUtc",
    "speedDownloadAvgExclFileSlowstart"
  );

  const chartspeedDownloadPacketLoss = await val.group(
    download,
    "startDateTimeUtc",
    "speedDownloadPacketLoss"
  );

  const speedUploadDuration = await val.group(
    download,
    "startDateTimeUtc",
    "speedUploadDuration"
  );
  const speedUploadAvgExclFileSlowstart = await val.group(
    download,
    "startDateTimeUtc",
    "speedUploadAvgExclFileSlowstart"
  );

  const speedUploadFilePeak = await val.group(
    download,
    "startDateTimeUtc",
    "speedUploadFilePeak"
  );

  const streamPr = await val.group(stream, "startDateTimeUtc", "streamPr");

  const browserurl = await val.brouseGroup(
    browser,
    "browserUrl",
    "browseUrlLoadingTime"
  );

  const streamQualityPreloadingTime = await val.group(
    streamquality,
    "startDateTimeUtc",
    "streamQualityPreloadingTime"
  );

  const [
    speedUploadLoadedJitter,
    speedUploadLoadedLatency,
    speedDownloadLoadedLatency,
    speedDownloadLoadedJitter,
    speedDownloadPacketLoss,
  ] = await Promise.all([
    val.average(upload, "startDateTimeUtc", "speedUploadLoadedJitter"),
    val.average(upload, "startDateTimeUtc", "speedUploadLoadedLatency"),
    val.average(download, "startDateTimeUtc", "speedDownloadLoadedLatency"),
    val.average(download, "startDateTimeUtc", "speedDownloadLoadedJitter"),
    val.average(download, "startDateTimeUtc", "speedDownloadPacketLoss"),
  ]);
  const speed = {
    speedUploadLoadedJitter,
    speedUploadLoadedLatency,
    speedDownloadLoadedLatency,
    speedDownloadLoadedJitter,
    speedDownloadPacketLoss,
  };

  res.render("test", {
    data,
    speed,
    speedDownloadAvgExclFileSlowstart,
    chartspeedDownloadPacketLoss,
    speedUploadDuration,
    speedUploadAvgExclFileSlowstart,
    speedUploadFilePeak,
    streamPr,
    streamQualityPreloadingTime,
    browserurl,
  });
});

///
app.use((err, req, res, next) => {
  let status = 500;
  let message = "Internal server error";
  console.log(err);

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

Inventory_type.hasMany(Inventory);

Area.hasMany(Inventory);
States.hasMany(Inventory);
Town_City.hasMany(Inventory);
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

///atest path

// Connect to the database and start the server
async function startServer() {
  try {
    await db.sync();
    console.log("Database is connected");
    app.listen(port, async () => {
      console.log(`Server is running on port ${port}`);

      const cronExpression = "*/3 * * * *";
      const cronJob = new CronJob(cronExpression, crojob(), null, true, "UTC");
      cronJob.start();
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
