const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('users_history', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique:true,
        primaryKey: true,
        autoIncrement: true,
    },
        cuit: {
            type: DataTypes.STRING,
            allowNull: false,
    },
        nombre: {
            type: DataTypes.STRING,
            trim: true
    },
        apellido: {
            type: DataTypes.STRING,
            trim: true,
    },
        mail: {
            type: DataTypes.STRING,
            trim: true
    },
        usuarioSade: {
            type: DataTypes.STRING,
            trim: true
    },
        jurisdiccion: {
            type: DataTypes.STRING,
            trim: true,
    },
    reparticion1: {
        type: DataTypes.STRING,
        trim: true
    },
    reparticion2: {
        type: DataTypes.STRING,
        trim: true
    },
    reparticion3: {
        type: DataTypes.STRING,
        trim: true
    },
        cargo: {
            type: DataTypes.STRING,
            trim: true
    },
        observaciones: {
            type: DataTypes.STRING,
            trim: true
    },
        activo: {
            type: DataTypes.STRING,
            trim: true
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
        tableName: 'users_history',
        timestamps: false,
    });


module.exports = User;
