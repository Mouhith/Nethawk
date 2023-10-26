const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");

const Employee = db.define("Employee", {
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employee_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employee_phone_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employee_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
});

module.exports = Employee;
