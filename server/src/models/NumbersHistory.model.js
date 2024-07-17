const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./Users.model');
const Plan = require('./Plans.model');

const NumbersHistory = sequelize.define('numbers_history', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    linea: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    cuit: {
        type: DataTypes.STRING,
        trim: true,
    },
    funcionario: {
        type: DataTypes.STRING,
        trim: true,
        references: {
            model: 'users',
            key: 'cuit',
        }
    },
    compañia: {
        type: DataTypes.STRING,
        trim: true,
    },
    cliente: {
        type: DataTypes.STRING,
        trim: true,
    },
    formaContratacion: {
        type: DataTypes.STRING,
        trim: true,
    },
    plan: {
        type: DataTypes.INTEGER,
        trim: true,
    },
    modelo: {
        type: DataTypes.STRING,
        trim: true,
    },
    imei: {
        type: DataTypes.STRING,
        trim: true,
    },
    sim: {
        type: DataTypes.STRING,
        trim: true,
    },
    observaciones: {
        type: DataTypes.TEXT,
        trim: true,
    },
    activo: {
        type: DataTypes.STRING,
        trim: true,
    },
    updateDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    userAdmin: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
    },
}, {
    tableName: 'numbers_history',
    timestamps: false,
});

module.exports = NumbersHistory;
