const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Test = db.define("Test", {
  scheduling_name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = Test;
