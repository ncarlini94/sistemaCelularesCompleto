const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const importRouter = require('./routes/import.Routes');
const queryRouter = require('./routes/query.Routes')
const administratorsRouter = require('./routes/administrators.Routes')
const usersRoutes = require('./routes/users.Routes')
const authRoutes = require('./routes/auth.Routes')

app.use(cors());
app.use(express.json());
app.use(cookieParser())


sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

app.set('port', process.env.PORT);
app.use('/api', authRoutes)

app.use('/api', usersRoutes)
app.use('/api', administratorsRouter)
app.use('/api', queryRouter);
app.use('/api', importRouter);

app.listen(app.get('port'), () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${app.get('port')}`);
});
