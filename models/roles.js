const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Roles = db.define("Role", {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Roles;
