const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./Users.model');
const Plan = require('./Plans.model');


const Number = sequelize.define('numbers', {
    linea: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique:true,
        primaryKey: true,
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
        trim: true
},
    formaContratacion: {
        type: DataTypes.STRING,
        trim: true
},
    plan: {
        type: DataTypes.STRING,
        trim: true,
        references: {
            model: 'plans',
            key: 'id',
        }
},
    modelo: {
        type: DataTypes.STRING,
        trim: true
},
    imei: {
        type: DataTypes.STRING,
        trim: true
},
    modeloConectado: {
        type: DataTypes.STRING,
        trim: true
},
    imeiConectado: {
        type: DataTypes.STRING,
        trim: true
},
    sim: {
        type: DataTypes.STRING,
        trim: true
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
},
    observaciones: {
        type: DataTypes.TEXT,
        trim: true
},
    activo: {
        type: DataTypes.STRING,
        trim: true
},
}, {
    timestamps: true,
    createdAt: 'fechaAlta',
    updatedAt: 'updateDate',
});

Number.belongsTo(User, {
    foreignKey: 'funcionario',
    as: 'funcionarioData',
});

Number.belongsTo(Plan, {
    foreignKey: 'plan',
    as: 'planData',
});

module.exports = Number;
