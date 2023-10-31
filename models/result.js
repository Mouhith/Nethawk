const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Result = db.define("Result", {
  result_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  STREAM_PR: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  STREAM_QUALITY_PRELOADING_TIME: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_UPLOAD_LOADED_LATENCY: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_UPLOAD_LOADED_JITTER: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_UPLOAD_DURATION: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  SPEED_UPLOAD_PEAK: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_UPLOAD_AVG_EXCL_SLOWSTART: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_LATENCY_AVG: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_LATENCY_JITTER: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BROWSE_URL_LOADING_TIME: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_DOWNLOAD_LOADED_LATENCY: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_DOWNLOAD_LOADED_JITTER: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_DOWNLOAD_DURATION: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SPEED_DOWNLOAD_PACKETLOSS: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SCHEDULING_NAME: {
    type: DataTypes.STRING,
  },
  TEST_TYPE: {
    type: DataTypes.STRING,
  },
  DATETIME_UTC: {
    type: DataTypes.DATE,
  },
});

module.exports = Result;
