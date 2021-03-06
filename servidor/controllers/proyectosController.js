const Proyecto = require("../models/Proyecto");
const {validationResult}=require('express-validator');

exports.crearProyecto=async(req, res)=>{

    //revisaar si hay errores
    const  errores=validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try{
        const proyecto=new Proyecto(req.body);

        //guardar el creador via jwt
        proyecto.creador=req.usuario.id;

        //guardar el proyecto
        proyecto.save();
        res.json(proyecto);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//obtner todos los proyectos de l usuario actual

exports.obtenerProyectos=async(req, res)=>{

    try{
        const proyectos=await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({proyectos});

    }catch(error){

        console.log(error);
        res.status(500).send('Hubo un error');

    }

}

//actualizar proyectos

exports.actualizarProyecto=async(req, res)=>{

    //revisaar si hay errores
    const  errores=validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la info del proyecto

    const {nombre}=req.body;
    const nuevoProyecto={};

    if(nombre){
        nuevoProyecto=nombre;

    }

    try{

        //revisar el id
        let proyecto= await Proyecto.findById(req.params.id);


        //si el proyecto existe o no
        if(!proyecto){

            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //verificar el creador del proyecto

        //actualizar

    }catch(error){
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}
