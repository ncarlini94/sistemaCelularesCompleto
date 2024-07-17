const Administrator = require('./../models/Administrators.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {createAccessToken} = require('./../libs/jwt')



const register = async (req, res) => {
  try {
    const { cuit, username, nombre, apellido, password, email, rol, jurisdicciones } = req.body;
    const userFound = await Administrator.findOne({
      where: {
        cuit: cuit
      }})
    if(userFound) return res.status(400).json({message:'Ya existe un suario con ese Cuit'})
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await Administrator.create({cuit,  username, nombre, apellido, password:passwordHash, email, rol, jurisdicciones });
    res.json({
      username: newUser.username,
      email: newUser.email,
      rol: newUser.rol,
      jurisdicciones: newUser.jurisdicciones,
      message:'La creación del usuario fue exitosa'
    })
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await Administrator.findOne({
      where: {
        username: username
      }
    });
    if (!userFound) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    const token = await createAccessToken({ cuit: userFound.cuit });
    res.cookie('token', token);
    return res.json({
      cuit:userFound.cuit,
      username: userFound.username,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      email: userFound.email,
      rol: userFound.rol,
      jurisdicciones: userFound.jurisdicciones,
      createDate: userFound.createDate,
      updateDate: userFound.updateDate
    })
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}

const logout = async (req, res) => {
  res.cookie('token', '',{
  expires: new Date(0)
  })
  return res.sendStatus(200)
}

const verifyToken = async (req,res) => {
  const { token } = req.cookies;
  if(!token) return res.status(401).json({message:'No autorizado'})
  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
  if(err) return res.status(401).json({message:'No autorizado'})
  const userFound = await Administrator.findOne({
    where: {
      cuit: user.cuit
    }
  })
if(!userFound) return res.status(401).json({message:'No autorizado'})
return res.json({
  cuit: userFound.cuit,
  username: userFound.username,
  nombre: userFound.nombre,
  apellido: userFound.apellido,
  email: userFound.email,
  rol: userFound.rol,
  jurisdicciones: userFound.jurisdicciones,
  createDate: userFound.createDate,
  updateDate: userFound.updateDate
})
})
}


module.exports = {
  register,
  login,
  logout,
  verifyToken,
};