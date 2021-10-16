const express = require('express'); //sintaxis para importar modulos en nodejs
require('dotenv').config();

const { dbConection } = require('./config/database')
    //crear el servidor
const cors = require('cors');


const app = express();

//cors
app.use(cors());

app.use(express.json());


//creando ka conexio a la bd

dbConection();
//creando rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));

app.use('/api/login', require('./routes/auth.routes'));

app.use('/api/capacitacion', require('./routes/capacitacion.routes'));

app.use('/api/area', require('./routes/area.routes'));

app.use('/api/puesto', require('./routes/puesto.routes'));

app.use('/api/empleado', require('./routes/empleado.routes'));

app.use('/api/certificado', require('./routes/certificado.routes'));





//codigo para desplegar
app.listen(process.env.PORT, () => {
    console.log('servidor desplegado en el puerto: ' + process.env.PORT)
})