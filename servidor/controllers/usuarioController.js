const Usuario=require('../models/Usuario');
const bcryptjs= require('bcryptjs');
const {validationResult}=require('express-validator');
const JTW=require('jsonwebtoken');

exports.crearUsuario=async(req, res)=>{

        //revisar si hay errores
    const   errores=validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    //destructuring en el body
    const { email, password}=req.body;
    try{

        //revisar que el usuario sea único
        let usuario= await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //crear nuevo usuario
        usuario=new Usuario(req.body);

        //hashear password

        const salt= await bcryptjs.genSalt(10);
        usuario.password=await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //crear y firmar el jwt
        const payload={

            usuario: {
                id: usuario.id
            }

        };

        JTW.sign(payload, process.env.SECRETA, {
            expiresIn:3600
        }, (error, token)=>{
            if(error) throw error;

            res.json({token});
        }
        
        )

        //mensaje de confirmación
       

    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}