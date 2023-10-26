const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Result = db.define("Result", {
  result_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  stream_pr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stream_quality_preloading_time_ms: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_upload_file_peak: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_upload_file_avg_excl_slowstart: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_latency_avg: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  speed_latency_jitter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  browse_url_loading_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_loaded_latency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_loaded_jitter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_file_peak: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_file_avg_excl_slowstart: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_packetloss: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_peak: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speed_download_avg_excl_slowstart: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Result;
