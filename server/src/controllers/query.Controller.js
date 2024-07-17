const Jurisdiction = require('../models/Jurisdictions.model');
const Reparticion = require('../models/Repartitions.model');
const Number = require('../models/Numbers.model')
const Plan = require('../models/Plans.model');
const User = require('../models/Users.model');
const NumberHistory = require('../models/NumbersHistory.model');
const { Op } = require('sequelize');


const queryGetNumber = async (req, res) => {
    const { id } = req.params;
    try {
        const numbers = await Number.findOne({
            where: {
                linea: id
                },
            include: [
                {
                    model: User,
                    as: 'funcionarioData',
                    include: [
                        {
                            model: Reparticion,
                            as: 'jurisdiccionData',
                        }
                    ]
                },
                {
                    model: Plan,
                    as : 'planData'
                }
            ]
        });
        if (!numbers || numbers.length === 0) {
            console.error('No se pudieron obtener los números.');
            return res.status(500).json({ message: 'Error al obtener los números' });
        }
        res.json(numbers);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(error.message);
    }
};



const queryGetNumbers = async (req, res) => {
    try {
        const numbers = await Number.findAll({
            include: [
                {
                    model: User,
                    as: 'funcionarioData',
                    include: [
                        {
                            model: Reparticion,
                            as: 'jurisdiccionData',
                        }
                    ]
                },
                {
                    model: Plan,
                    as : 'planData'
                }
            ],
            order:[
                ['activo', 'DESC']
            ]
        });
        if (!numbers || numbers.length === 0) {
            console.error('No se pudieron obtener los números.');
            return res.status(500).json({ message: 'Error al obtener los números' });
        }
        res.json(numbers);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(error.message);
    }
};


const queryGetNumbersForRol = async (req, res) => {
    try {
        const { jurisdicciones } = req.query;
        const jurisdiccionesArray = JSON.parse(jurisdicciones);
        console.log(jurisdiccionesArray)
        const numbers = await Number.findAll({
            where: {
                activo: 'SI',
            },
            include: [
                {
                    model: User,
                    as: 'funcionarioData',
                    include: [
                        {
                            model: Reparticion,
                            as: 'jurisdiccionData',
                        }
                    ]
                }
            ],
            where: {
                '$funcionarioData.jurisdiccionData.jurisdiccion$': {
                    [Op.in]: jurisdiccionesArray
                }
            }
        });

        if (!numbers || numbers.length === 0) {
            console.error('No se pudieron obtener los números.');
            return res.status(500).json({ message: 'Error al obtener los números' });
        }

        res.json(numbers);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(error.message);
    }
};





const queryAddNumber = async (req, res) => {
    try {
        const { linea, funcionario, compañia, cliente, formaContratacion, modelo, imei, sim, activo } = req.body;
        const numberFound = await Number.findOne({
            where: {
            linea: linea
            }})
            if (numberFound) {
                return res.status(400).json({ message: 'Ya existe ese número' });
            }
            await Number.create({ linea, funcionario, compañia, cliente, formaContratacion, modelo, imei, sim, activo });
            res.json({
                message:'La creación de la linea fue exitosa'
            })
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
        return res.status(500).send(error.message);
    }
}


const queryUpdateNumber = async(req, res) => {
    const { id } = req.params;
    const { funcionario, compañia, cliente,  modelo, plan, imei, sim, observaciones, activo, userAdmin } = req.body;
    try {
        const number = await Number.findByPk(id);
        if (!number) {
            res.status(404).json({ message: 'Linea no encontrada' });
            return;
        }
        const funcionarioFound = await User.findOne({
            where: {
            cuit: funcionario
            }})

            const PlanFound = await Plan.findOne({
                where: {
                id: number.plan
                }})

            let funcionarioInfo = '';

            if (funcionarioFound) {
                funcionarioInfo = `${funcionarioFound.nombre} ${funcionarioFound.apellido}`;
            }

        const numberHistoryData = {
            linea: number.linea,
            cuit: funcionarioFound ? funcionarioFound.cuit : null,
            funcionario: funcionarioInfo,
            compañia: number.compañia,
            cliente: number.cliente,
            formaContratacion: number.formaContratacion,
            plan: PlanFound ? PlanFound.nombre : '',
            modelo: number.modelo,
            imei: number.imei,
            sim: number.sim,
            observaciones: number.observaciones,
            activo: number.activo,
            updateDate: new Date(),
            userAdmin: userAdmin,
        };

        await NumberHistory.create(numberHistoryData);

        number.funcionario = funcionario;
        number.compañia = compañia;
        number.cliente = cliente;
        number.plan = plan;
        number.modelo = modelo;
        number.imei = imei;
        number.sim = sim;
        number.observaciones = observaciones;
        number.activo = activo;

        await number.save();
        console.log('Linea actualizada');
        res.json({ message: 'Linea actualizada exitosamente' });
    } catch (error) {
        console.error(`Error al actualizar la linea: ${id}`, error);
        return res.status(500).send(error.message);
    }
}


const queryDeleteNumber = async (req, res) => {
    const numberId = req.params.id;
    try {
    const number = await Number.findByPk(numberId);
    if (!number) {
        res.status(404).json({ message: 'Linea no encontrada' });
        return;
    }
    await Number.destroy({
        where: {
            linea: numberId
            }
        });
    console.log('Linea eliminada');
    res.json({ message: 'Linea eliminada exitosamente' });
    } catch (error) {
    console.error('Error al eliminar la Linea:', error);
    return res.status(500).send(error.message);
    }
}

const queryGetPlans = async(req, res) => {
    try {
        const plans = await Plan.findAll();
        res.json(plans);
    } catch (error) {
        console.error('Error al obtener las Jurisdicciones:', error);
        return res.status(500).send(error.message);
    }
}

const queryChangeDevice = async(req, res) => {
    const { id } = req.params;
    const {number2, devicePrimary , imeiPrimary, deviceSecondary , imeiSecondary, userAdmin} = req.body;
    try {
        const number = await Number.findByPk(id);
        const numberSecondary = await Number.findByPk(number2);
        if(!number || !number2){
            res.status(404).json({ message: 'Linea no encontrada' });
            return;
        }

        const funcionarioFound = await User.findOne({
            where: {
            cuit: number.funcionario
            }})

        const funcionario2Found = await User.findOne({
             where: {
            cuit: numberSecondary.funcionario
            }})

            const PlanFound = await Plan.findOne({
                where: {
                id: number.plan
                }})

            const Plan2Found = await Plan.findOne({
                where: {
                id: numberSecondary.plan
                }})

            let funcionarioInfo = '';
            let funcionarioInfo2 = '';


            if (funcionarioFound) {
                funcionarioInfo = `${funcionarioFound.nombre} ${funcionarioFound.apellido}`;
            }

            if(funcionario2Found){
                funcionarioInfo2 = `${funcionario2Found.nombre} ${funcionario2Found.apellido}`;
            }



            const numberHistoryData = {
                linea: number.linea,
                cuit: funcionarioFound ? funcionarioFound.cuit : null,
                funcionario: funcionarioInfo,
                compañia: number.compañia,
                cliente: number.cliente,
                formaContratacion: number.formaContratacion,
                plan: PlanFound ? PlanFound.nombre : '',
                modelo: number.modelo,
                imei: number.imei,
                sim: number.sim,
                observaciones: number.observaciones,
                activo: number.activo,
                updateDate: new Date(),
                userAdmin: userAdmin,
            };

            const numberHistory2Data = {
                linea: numberSecondary.linea,
                cuit: funcionario2Found ? funcionario2Found.cuit : null,
                funcionario: funcionarioInfo2,
                compañia: numberSecondary.compañia,
                cliente: numberSecondary.cliente,
                formaContratacion: numberSecondary.formaContratacion,
                plan: Plan2Found ? Plan2Found.nombre : '',
                modelo: numberSecondary.modelo,
                imei: numberSecondary.imei,
                sim: numberSecondary.sim,
                observaciones: numberSecondary.observaciones,
                activo: numberSecondary.activo,
                updateDate: new Date(),
                userAdmin: userAdmin,
            };


            await NumberHistory.create(numberHistoryData);
            await NumberHistory.create(numberHistory2Data);

            console.log(numberHistoryData)
            console.log(numberHistory2Data)

        number.emei = imeiSecondary;
        number.modelo = deviceSecondary;
        numberSecondary.imei = imeiPrimary;
        numberSecondary.modelo = devicePrimary;

        await number.save();
        await numberSecondary.save();
        console.log('Equipo actualizado');
        res.json({ message: 'Equipo actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el equipo:', error);
        return res.status(500).send(error.message);
    }
}

const queryAddPlan = async (req, res) => {
    try {
        const { id, nombre,  llamadas, mensajes, datos } = req.body;
        const planFound = await Plan.findOne({
            where: {
            id: id
            }})
            if (planFound) {
                return res.status(400).json({ message: 'Ya existe un plan con ese ID' });
            }
            await Plan.create({ id, nombre, llamadas, mensajes, datos });
            res.json({
                message:'La creación del plan fue exitosa'
            })
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
        return res.status(500).send(error.message);
    }
}


const queryUpdatePlan = async(req, res) => {
    const { id } = req.params;
    const { nombre ,llamadas , mensajes, datos } = req.body;
    try {
        const plan = await Plan.findByPk(id);
        if (!plan) {
            res.status(404).json({ message: 'plan no encontrado' });
            return;
        }

        plan.nombre = nombre;
        plan.llamadas = llamadas;
        plan.mensajes = mensajes;
        plan.datos = datos;

        await plan.save();
        console.log('plan actualizado');
        res.json({ message: 'plan actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el plan:', error);
        return res.status(500).send(error.message);
    }
}

const queryDeletePlan = async (req, res) => {
    const planId = req.params.id;
    try {
    const plan = await Plan.findByPk(planId);
    if (!plan) {
        res.status(404).json({ message: 'Plan no encontrado' });
        return;
    }
    await Plan.destroy({
        where: {
            id: planId
            }
        });
    console.log('Plan eliminado');
    res.json({ message: 'Plan eliminado exitosamente' });
    } catch (error) {
    console.error('Error al eliminar el plan:', error);
    return res.status(500).send(error.message);
    }
}


const querySearchJurisdiction = async (req, res) => {
    try {
    const { id } = req.params;
        const user = await Jurisdiction.findOne({
        where: {
            id: id
            }
        });
    if (!user) {
        return res.status(404).json({ message: 'Jurisdiccion no encontrado' });
    }
    res.json(user);
    } catch (error) {
    console.error('Error al obtener Jurisdiccion:', error);
    return res.status(500).send(error.message);
    }
}

const querySearchJurisdictions = async (req, res) => {
    try {
        const jurisdictions = await Jurisdiction.findAll();
        res.json(jurisdictions);
    } catch (error) {
        console.error('Error al obtener las Jurisdicciones:', error);
        return res.status(500).send(error.message);
    }
}

const queryAddJurisdiction = async (req, res) => {
    try {
        const { id, jurisdiccion } = req.body;
        const jurisdictionFound = await Jurisdiction.findOne({
            where: {
            id: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },})
            if (jurisdictionFound) {
                return res.status(400).json({ message: 'Ya existe esa jurisdiccion' });
            }
            if (!jurisdiccion) {
                return res.status(400).json({ message: 'La propiedad "jurisdiccion" es requerida' });
            }
            await Jurisdiction.create({ id, jurisdiccion });
            res.json({
                id: id,
                jurisdiccion: jurisdiccion,
                message:'La creación de la jurisdiction fue exitosa'
            })
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
        return res.status(500).send(error.message);
    }
}

const queryUpdateJurisdiction = async(req, res) => {
    const { id } = req.params;
    const { jurisdiccion } = req.body;
    try {
        const jurisdiction = await Jurisdiction.findByPk(id);
        if (!jurisdiccion) {
            res.status(404).json({ message: 'Jurisdiccion no encontrada' });
            return;
        }

        jurisdiction.jurisdiccion = jurisdiccion;

        await jurisdiction.save();
        console.log('Jurisdiccion actualizada');
        res.json({ message: 'Jurisdiccion actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la Jurisdiccion:', error);
        return res.status(500).send(error.message);
    }
}

const queryDeleteJurisdiction = async (req, res) => {
    const jurisdictionId = req.params.id;
    try {
    const jurisdiction = await Jurisdiction.findByPk(jurisdictionId);
    if (!jurisdiction) {
        res.status(404).json({ message: 'Jurisdiccion no encontrada' });
        return;
    }
    await jurisdiction.destroy();
    console.log('Jurisdiccion eliminada');
    res.json({ message: 'Jurisdiccion eliminada exitosamente' });
    } catch (error) {
    console.error('Error al eliminar la Jurisdiccion:', error);
    return res.status(500).send(error.message);
    }
}

const querySearchRepartition = async (req, res) => {
    try {
        const { id } = req.params;
        const repartition = await Reparticion.findOne({
            where: {
                id: id
            }
        });
        if (!repartition) {
            return res.status(404).json({ message: 'Reparticion no encontrado' });
        }
        return res.status(200).json(repartition);
    } catch (error) {
        console.error('Error al obtener Reparticion:', error);
        return res.status(500).send(error.message);
    }
}

const querySearchRepartitions = async (req, res) => {
    try {
        const reparticiones = await Reparticion.findAll();
        res.json(reparticiones)
    } catch (error) {
        console.error('Error al obtener las Jurisdicciones:', error);
        return res.status(500).send(error.message);
    }
}

const queryAddRepartition = async (req, res) => {
    try {
    const {
        id,
        jurisdiccion,
        reparticion1,
        reparticion2,
        reparticion3
        } = req.body;


    const reparticionFound = await Reparticion.findOne({
        where: {
            id: id
        }
    });
    if (reparticionFound) {
        return res.status(400).json({ message: 'Ya existe una reparticion con los mismos valores' });
    }
    await Reparticion.create({
        id,
        jurisdiccion,
        reparticion1,
        reparticion2,
        reparticion3
        });
    res.json({
        id: id,
        jurisdiccion: jurisdiccion,
        reparticion1: reparticion1,
        reparticion2: reparticion2,
        reparticion3: reparticion3,
        message: 'La creación de la reparticion fue exitosa'
    });
    } catch (error) {
    console.error('Error al obtener los datos: ', error);
    return res.status(500).send(error.message);
    }
};

const queryDeleteRepartition = async (req, res) => {
    const repartitionId = req.params.id;
    try {
    const reparticion = await Reparticion.findByPk(repartitionId);
    if (!reparticion) {
        res.status(404).json({ message: 'Jurisdiccion no encontrada' });
        return;
    }
    await Reparticion.destroy({
        where: {
            id: repartitionId
            }
        });
    console.log('reparticion eliminada');
    res.json({ message: 'reparticion eliminada exitosamente' });
    } catch (error) {
    console.error('Error al eliminar la reparticion:', error);
    return res.status(500).send(error.message);
    }
}


const queryGetNumberHistory = async (req, res) => {
    const id = req.params.id;
    try {
        const numbers = await NumberHistory.findAll({
            where: {
                linea: id
            }
        });
        if (!numbers || numbers.length === 0) {
            console.error('No se pudieron obtener los números.');
            return res.status(500).json({ message: 'Error al obtener los números' });
        }
        res.json(numbers);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(error.message);
    }
};


const queryGetValuesForDashboard = async (req, res) => {
    const { jurisdicciones, rol } = req.query;
    let numbers;
    let data = {};
    try {
        if(rol === "Administrador") {
            const result = await Number.findAll({
                where: {
                    activo: "SI"
                    },
                include: [
                    {
                        model: User,
                        as: 'funcionarioData',
                        include: [
                            {
                                model: Reparticion,
                                as: 'jurisdiccionData',
                            }
                        ]
                    },
                ]
            });
            numbers = result
        }else if (rol === "Consultor") {
        const jurisdiccionesArray = JSON.parse(jurisdicciones);
        const result = await Number.findAll({
            include: [
                {
                    model: User,
                    as: 'funcionarioData',
                    include: [
                        {
                            model: Reparticion,
                            as: 'jurisdiccionData',
                        }
                    ]
                }
            ],
            where: {
                activo: 'SI',
                '$funcionarioData.jurisdiccionData.jurisdiccion$': {
                    [Op.in]: jurisdiccionesArray
                }
            }
        });
        numbers = result
    }

        if (!numbers || numbers.length === 0) {
            console.error('No se pudieron obtener los números.');
            return res.status(500).json({ message: 'Error al obtener los números' });
        }

        for (const number of numbers) {
            const compañia = number.compañia;
            const jurisdiccion = number.funcionarioData?.jurisdiccionData?.jurisdiccion;
            const reparticion1 = number.funcionarioData?.jurisdiccionData?.reparticion1;
            const cantidad = 1;
        
            if (!data[compañia]) {
                data[compañia] = {};
            }
        
            if (!data[compañia][jurisdiccion]) {
                data[compañia][jurisdiccion] = { total: 0, reparticiones1: {} };
            }
        
            if (!data[compañia][jurisdiccion].reparticiones1[reparticion1]) {
                data[compañia][jurisdiccion].reparticiones1[reparticion1] = cantidad;
            } else {
                data[compañia][jurisdiccion].reparticiones1[reparticion1] += cantidad;
            }
        
            // Actualizar la cantidad total por jurisdicción
            data[compañia][jurisdiccion].total += cantidad;
        }
        
        // Convertir a un array de objetos para cada compañía
        const dataArray = Object.keys(data).map(compañia => {
            return {
                compañia,
                jurisdicciones: Object.keys(data[compañia]).map(jurisdiccion => {
                    return {
                        jurisdiccion,
                        total: data[compañia][jurisdiccion].total,
                        reparticiones1: Object.entries(data[compañia][jurisdiccion].reparticiones1).map(([reparticion1, cantidad]) => {
                            return { reparticion1, cantidad };
                        })
                    };
                })
            };
        });

        console.log(data)
        res.json(data);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send(error.message);
    }
};




module.exports = {
    queryGetNumber,
    queryGetNumbers,
    queryGetNumbersForRol,
    queryAddNumber,
    queryUpdateNumber,
    queryDeleteNumber,
    queryGetPlans,
    queryChangeDevice,
    queryAddPlan,
    queryUpdatePlan,
    queryDeletePlan,
    querySearchJurisdiction,
    querySearchJurisdictions,
    queryAddJurisdiction,
    queryUpdateJurisdiction,
    queryDeleteJurisdiction,
    querySearchRepartition,
    querySearchRepartitions,
    queryAddRepartition,
    queryDeleteRepartition,
    queryGetNumberHistory,
    queryGetValuesForDashboard
};