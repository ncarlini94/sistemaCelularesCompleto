const Administrator = require('./../models/Administrators.model')
const bcrypt = require('bcryptjs')

const getAdministrator = async (req, res) => {
    try {
    const { username } = req.query;
        const user = await Administrator.findOne({
        where: {
            username: username
            }
        });
    if (!user) {
        return res.status(404).json({ message: 'Administrador no encontrado' });
    }
    res.json(user);
    } catch (error) {
    console.error('Error al obtener el Administrador:', error);
    res.status(500).json({ message: 'Error al obtener el Administrador' });
    }
}


const getAllAdministrators = async (req, res) => {
    try {
        const administrators = await Administrator.findAll({
        });
        res.json(administrators);
    } catch (error) {
        console.error('Error al obtener Administrador:', error);
        res.status(500).json({ message: 'Error al obtener Administradores' });
    }
}

const updateAdministrator = async (req, res) => {
    const userId = req.params.id;
    const { username, password, email, rol, jurisdicciones } = req.body;
    try {
    const user = await Administrator.findByPk(userId);
    if (!user) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
    }
    if (username !== user.username) {
        const userFound = await Administrator.findOne({
            where: {
                username: username
            }
        });
        if (userFound) {
            return res.status(400).json({ message: 'Ya existe ese Administrador' });
        }
    }
    user.username = username;
    user.email = email;
    user.rol = rol;
    user.jurisdicciones = jurisdicciones;
    if (password) {
        const passwordHash = await bcrypt.hash(password, 10);
        user.password = passwordHash;
    }
    await user.save();
    console.log('Administrador actualizado');
    res.json({ message: 'Administrador actualizado exitosamente' });
    } catch (error) {
    console.error('Error al actualizar el Administrador:', error);
    res.status(500).json({ message: 'Error al actualizar el Administrador' });
    }
}

const deleteAdministrator = async (req, res) => {
    const userId = req.params.id;
    try {
    const user = await Administrator.findByPk(userId);
    if (!user) {
        res.status(404).json({ message: 'Administrador no encontrado' });
        return;
    }
    await user.destroy();
    console.log('Administrador eliminado');
    res.json({ message: 'Administrador eliminado exitosamente' });
    } catch (error) {
    console.error('Error al eliminar el Administrador:', error);
    res.status(500).json({ message: 'Error al eliminar el Administrador' });
    }
}

const changePassword = async (req, res)=> {
    const cuit = req.params.id;
    const { password, newPassword, verifyPassword } = req.body;
    try {
      const user = await Administrator.findByPk(cuit);
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'La contraseña es incorrecta' });
      }
      if(newPassword !== verifyPassword){
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
      }
        const passwordHash = await bcrypt.hash(newPassword, 10)
    user.password = passwordHash;
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
      await user.save()
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
  }

module.exports = {
    getAdministrator,
    getAllAdministrators,
    updateAdministrator,
    deleteAdministrator,
    changePassword
};