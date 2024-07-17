const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Reparticion = sequelize.define('repartitions', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        primaryKey: true,
    },
    jurisdiccion: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },{
        timestamps: false
    }
);

module.exports = Reparticion;
