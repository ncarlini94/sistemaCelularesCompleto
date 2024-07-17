const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Administrator = sequelize.define('administrators', {
  cuit: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    unique: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  nombre: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: true,
  },
  apellido: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    unique:true
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  jurisdicciones: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
}, {
  timestamps: true,
  createdAt: 'createDate',
  updatedAt: 'updateDate',
});

module.exports = Administrator;
