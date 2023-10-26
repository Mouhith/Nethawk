const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Schedule = db.define("Schedule", {
  Schedule_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Booking_date_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Booking_date_to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Booking_time_from: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Booking_time_to: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  test_request_staus: {
    type: DataTypes.STRING,
    allowNull: false,
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
  streaming: {
    type: DataTypes.STRING,
  },
  speed_upload: {
    type: DataTypes.STRING,
  },
  speed_upload_file: {
    type: DataTypes.STRING,
  },
  speed_latency: {
    type: DataTypes.STRING,
  },
  browse: {
    type: DataTypes.STRING,
  },
  speed_download_file: {
    type: DataTypes.STRING,
  },
  speed_download: {
    type: DataTypes.STRING,
  },
});

module.exports = Schedule;
