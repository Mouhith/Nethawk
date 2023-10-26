const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const States = db.define("State", {
  state_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  state_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Town_City = db.define("Town_city", {
  town_city_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.States,
    allowNull: false,
  },
});

const Area = db.define("Area", {
  area_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  area_name: {
    type: DataTypes.States,
    allowNull: false,
  },
});

module.exports = {
  States,
  Town_City,
  Area,
};
