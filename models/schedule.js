const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Schedule = db.define("Schedule", {
  Schedule_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Booking_datetime_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  Booking_datetime_to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  test_request_staus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  confirmation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fleet_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scenario_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scheduling_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scheduler_job_id: {
    type: DataTypes.STRING,
  },
});

module.exports = Schedule;
