import express from 'express';

import router from './routes/index.js';
import db from './config/db.js';


const app = express();

//conectar la base de datos
db.authenticate()
    .then(() => console.log('Base De Datos conectada'))
    .catch(error => console.log(error))

//definir puerto 
const port = process.env.PORT || 4000;

//habilitar pug 
app.set('view engine', 'pug')


//middleware obtener el año actual
app.use((req, res, next) => {
    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    res.locals.nombresSitio = 'Agencia De Viajes'
    next()
})

// agregrar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }))


//definir la carpeta publica
app.use(express.static('public'))

//agregar router
app.use('/', router)

app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})