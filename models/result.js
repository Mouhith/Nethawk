const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Result = db.define("Result", {
  result_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  testId: {
    type: DataTypes.BIGINT,
  },
  streamPr: {
    type: DataTypes.DECIMAL,
  },
  streamQualityPreloadingTime: {
    type: DataTypes.DECIMAL,
  },
  speedUploadLoadedLatency: {
    type: DataTypes.DECIMAL,
  },
  speedUploadLoadedJitter: {
    type: DataTypes.DECIMAL,
  },
  speedUploadDuration: {
    type: DataTypes.DECIMAL,
  },

  speedUploadPeak: {
    type: DataTypes.DECIMAL,
  },
  speedUploadAvgExclFileSlowstart: {
    type: DataTypes.DECIMAL,
  },
  speedLatencyAvg: {
    type: DataTypes.DECIMAL,
  },
  speedLatencyJitter: {
    type: DataTypes.DECIMAL,
  },
  browseUrlLoadingTime: {
    type: DataTypes.DECIMAL,
  },
  speedDownloadLoadedLatency: {
    type: DataTypes.DECIMAL,
  },
  speedDownloadLoadedJitter: {
    type: DataTypes.DECIMAL,
  },
  speedDownloadDuration: {
    type: DataTypes.DECIMAL,
  },
  speedDownloadAvgExclFileSlowstart: {
    type: DataTypes.DECIMAL,
  },
  speedDownloadAvgExclSlowstart: {
    type: DataTypes.DECIMAL,
  },
  leadsLeadId: {
    type: DataTypes.STRING,
  },
  speedDownloadPacketLoss: {
    type: DataTypes.DECIMAL,
  },
  scheduling_name: {
    type: DataTypes.STRING,
  },
  testType: {
    type: DataTypes.STRING,
  },
  speedUploadFilePeak: {
    type: DataTypes.DECIMAL,
  },
  speedUploadAvgExclSlowstart: {
    type: DataTypes.DECIMAL,
  },

  speedDownloadFilePeak: {
    type: DataTypes.DECIMAL,
  },
  speedDownloadPeak: {
    type: DataTypes.DECIMAL,
  },

  datetimeUtc: {
    type: DataTypes.DATE,
  },
  startDateTimeUtc: {
    type: DataTypes.DATE,
  },
  browserUrl: {
    type: DataTypes.STRING,
  },
  isp: {
    type: DataTypes.STRING,
  },
  streamStatus: {
    type: DataTypes.STRING,
  },
  ///

  other_streamPr: {
    type: DataTypes.DECIMAL,
  },
  other_streamQualityPreloadingTime: {
    type: DataTypes.DECIMAL,
  },
  other_speedUploadLoadedLatency: {
    type: DataTypes.DECIMAL,
  },
  other_speedUploadLoadedJitter: {
    type: DataTypes.DECIMAL,
  },
  other_speedUploadDuration: {
    type: DataTypes.DECIMAL,
  },

  other_speedUploadPeak: {
    type: DataTypes.DECIMAL,
  },
  other_speedUploadAvgExclFileSlowstart: {
    type: DataTypes.DECIMAL,
  },
  other_speedLatencyAvg: {
    type: DataTypes.DECIMAL,
  },
  other_speedLatencyJitter: {
    type: DataTypes.DECIMAL,
  },
  other_browseUrlLoadingTime: {
    type: DataTypes.DECIMAL,
  },
  other_speedDownloadLoadedLatency: {
    type: DataTypes.DECIMAL,
  },
  other_speedDownloadLoadedJitter: {
    type: DataTypes.DECIMAL,
  },
  other_speedDownloadDuration: {
    type: DataTypes.DECIMAL,
  },
  other_speedDownloadAvgExclFileSlowstart: {
    type: DataTypes.DECIMAL,
  },
  other_speedDownloadPacketLoss: {
    type: DataTypes.DECIMAL,
  },

  other_speedUploadFilePeak: {
    type: DataTypes.DECIMAL,
  },
  other_speedUploadAvgExclSlowstart: {
    type: DataTypes.DECIMAL,
  },

  other_speedDownloadFilePeak: {
    type: DataTypes.DECIMAL,
  },
  other_speedDownloadPeak: {
    type: DataTypes.DECIMAL,
  },

  other_browserUrl: {
    type: DataTypes.STRING,
  },
  other_speedDownloadAvgExclSlowstart: {
    type: DataTypes.DECIMAL,
  },
  stream_quality_status: {
    type: DataTypes.STRING,
  },
  speed_status: {
    type: DataTypes.STRING,
  },
  browse_url_status: {
    type: DataTypes.STRING,
  },
  dates: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = Result;
