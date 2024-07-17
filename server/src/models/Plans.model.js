const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Plan = sequelize.define('plans', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique:true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    llamadas: {
        type: DataTypes.INTEGER,
        trim: true
    },
    mensajes: {
        type: DataTypes.INTEGER,
        trim: true
    },
    datos: {
        type: DataTypes.DECIMAL(10, 2),
        trim: true
    }
}, {
    timestamps: true,
    createdAt: 'fechaAlta',
    updatedAt: 'updateDate',
});

module.exports = Plan;
