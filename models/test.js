const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Test = db.define("Test", {
  SCHEDULING_NAME: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = Test;
