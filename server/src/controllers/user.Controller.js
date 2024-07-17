const Reparticion = require('../models/Repartitions.model');
const User = require('./../models/Users.model')
const UserHistory = require('./../models/UsersHistory.model')

const createUser = async (req, res) => {
    try {
    const {
        cuit,
        nombre,
        apellido,
        mail,
        usuarioSade,
        jurisdiccion,
        cargo,
        observaciones,
        activo
        } = req.body;
    const userFound = await User.findOne({
        where: {
            cuit: cuit
        }})
    if(userFound) return res.status(400).json({message:'Ya existe ese usuario'})
    await User.create({
        cuit,
        nombre,
        apellido,
        mail,
        usuarioSade,
        jurisdiccion,
        cargo,
        observaciones,
        activo
    });
    res.json({
        cuit: cuit,
        nombre: nombre,
        apellido: apellido,
        mail: mail,
        usuarioSade: usuarioSade,
        jurisdiccion: jurisdiccion,
        cargo: cargo,
        observaciones: observaciones,
        activo: activo,
        message:'La creación del usuario fue exitosa'
    })
    } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
    }
}


const getUser = async (req, res) => {
    try {
    const { id } = req.params;
        const user = await User.findOne({
        where: {
            cuit: id
            },
        include: [
                {
                    model: Reparticion,
                    as: 'jurisdiccionData',
                }
            ]
        });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
    } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Reparticion,
                    as: 'jurisdiccionData',
                }
            ],
            order:[
                ['activo', 'DESC']
            ]
        });
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}


const getAllUsersForRol = async (req, res) => {
    try {
        const { jurisdicciones } = req.query;
        const users = await User.findAll({
            include: [
                {
                    model: Reparticion,
                    as: 'jurisdiccionData',
                }
            ]
        });

        const filteredUsers = users.filter(user => {
            return user.activo === 'SI' && jurisdicciones.includes(user.jurisdiccionData.jurisdiccion);
        });

        res.json(filteredUsers);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}




const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { cuit, nombre, apellido, mail, usuarioSade, jurisdiccion, cargo, observaciones, activo, userAdmin } = req.body;
    try {
    const user = await User.findByPk(userId);
    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
    }
    if (cuit !== user.cuit) {
        const userFound = await User.findOne({
            where: {
                cuit: cuit
            }
        });
        if (userFound) {
            return res.status(400).json({ message: 'Ya existe ese usuario' });
        }
    }

    const reparticionFound = await Reparticion.findOne({
        where: {
        id: user.jurisdiccion
        }})

        let jurisdiccionInfo = reparticionFound.jurisdiccion ? reparticionFound.jurisdiccion : '';
        let reparticion1info = reparticionFound.reparticion1 ? reparticionFound.reparticion1 : '';
        let reparticion2info = reparticionFound.reparticion2 ? reparticionFound.reparticion2 : '';
        let reparticion3info = reparticionFound.reparticion3 ? reparticionFound.reparticion3 : '';

        const userHistoryData = {
            cuit:user.cuit,
            nombre:user.nombre,
            apellido:user.apellido,
            mail:user.mail,
            usuarioSade:user.usuarioSade,
            jurisdiccion: jurisdiccionInfo,
            reparticion1: reparticion1info,
            reparticion2: reparticion2info,
            reparticion3: reparticion3info,
            cargo:user.cargo,
            observaciones: user.observaciones,
            activo: user.activo,
            updateDate: new Date(),
            userAdmin: userAdmin,
        }

        await UserHistory.create(userHistoryData);


    user.cuit = cuit;
    user.nombre = nombre;
    user.apellido = apellido;
    user.mail = mail;
    user.usuarioSade = usuarioSade;
    user.jurisdiccion = jurisdiccion;
    user.cargo = cargo;
    user.observaciones = observaciones;
    user.activo = activo;
    await user.save();
    console.log('Usuario actualizado');
    res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
    const user = await User.findByPk(userId);
    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
    }
    await user.destroy();
    console.log('Usuario eliminado');
    res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}

const getUserHistory = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserHistory.findAll({
            where: {
                cuit: id
            },
        });
        if (!user || user.length === 0) {
            console.error('No se pudieron obtener los números.');
            return res.status(500).json({ message: 'Error al obtener los números' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error en la consulta' });
    }
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getAllUsersForRol,
    updateUser,
    deleteUser,
    getUserHistory
};