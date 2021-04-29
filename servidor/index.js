const express = require('express');

//import la conexión de la DB
const conectarDB = require('./config/db');
//crear el servidor
const app=express();

//conectar a la DB
conectarDB();

//habilitar express.JSON
app.use(express.json({extended:true}));
//crear puerto
const PORT = process.env.PORT || 4000;

//importar rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));

//definir la página principal
app.get('/', (req, res)=>{
    res.send('Hola mundo')
});
//arrancar el servidor

app.listen(PORT, ()=>{
    console.log(`el servidor está corriendo en el puerto ${PORT}`);
})