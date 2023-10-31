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
    unique: true,
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = {
  States,
  Town_City,
  Area,
};
