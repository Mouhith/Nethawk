const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/db");
const Leads = db.define("Lead", {
  lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_num: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation_of_contract_person: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  organisation_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_appointment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time_of_appointment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lead_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
});

module.exports = Leads;
