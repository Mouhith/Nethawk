const schedule = require("node-schedule");
const nPerf_API = require("./results");
const scheduleJob = {};

const createSchedule = (date, jobName) => {
  const schuduleTime = new Date(date);
  console.log(date);
  const job = schedule.scheduleJob(jobName, schuduleTime, () => {
    console.log("Schudelur is runninggg ");
    nPerf_API();
    console.log("Schudelur is runninggg ");
  });
  scheduleJob[jobName] = job;
  // console.log(scheduleJob);
};

const deletSchedule = (jobname) => {
  if (scheduleJob[jobname]) {
    scheduleJob[jobname].cancel();
    delete scheduleJob[jobname];
  }
};
module.exports = createSchedule;
