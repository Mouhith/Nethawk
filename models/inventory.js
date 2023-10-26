const { Sequelize, DataTypes } = require("sequelize");

const db = require("../util/db");
const Inventory = db.define("Inventory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ip_address: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  mac_address: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  date_onboarded: {
    type: DataTypes.STRING,

    allowNull: false,
  },
  fleet_no: {
    type: DataTypes.STRING,

    allowNull: false,
  },
});

const Inventory_type = db.define("Inventory_type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,

    allowNull: false,
  },
});

module.exports = { Inventory, Inventory_type };
