const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Jurisdiction = sequelize.define('jurisdictions', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    unique:true,
    primaryKey: true,
  },
  jurisdiccion: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
},{
  timestamps: false
}
);

module.exports = Jurisdiction;
