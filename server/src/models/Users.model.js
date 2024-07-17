const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Number = require('./Numbers.model');
const Reparticion = require('./Repartitions.model');

const User = sequelize.define('users', {
    cuit: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique:true,
        primaryKey: true,
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
        references: {
            model: 'repartitions',
            key: 'id',
        }
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
}, {
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'updateDate',
});

User.belongsTo(Reparticion, {
    foreignKey: 'jurisdiccion',
    as: 'jurisdiccionData',
});


module.exports = User;
