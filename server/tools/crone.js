const readFile = require("./readFile");

const results = require("./results");

const crojob = () => {
  const task = async () => {
    console.log("run" + new Date());
    try {
      const date = await readFile();
      if (date === "null") {
        console.log(date);
        const data = await results(0);
        console.log(data.length);
      } else {
        console.log(
          date,
          "  " +
            JSON.stringify(
              new Date().toISOString().replace("T", " ").split(".")[0]
            )
        );
        await results(date);
      }
    } catch (error) {
      console.error("Error in cron job task:", error.message);
    }
  };

  // Schedule the cron job to run every 3 minutes in UTC
  return task;
  // Start the cron job
};

module.exports = crojob;
