const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const User_credentials = db.define("User_credentials", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = User_credentials;
