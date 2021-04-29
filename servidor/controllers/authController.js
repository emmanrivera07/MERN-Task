const Usuario=require('../models/Usuario');
const bcryptjs= require('bcryptjs');
const {validationResult}=require('express-validator');
const JTW=require('jsonwebtoken');


exports.autenticarUsuario=async(req, res)=>{

    const  errores=validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer el email y password
    const { email, password}=req.body;

    try{

        //revisar si el usario está registrado
        let usuario= await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //revisar el password

        const passCorrecto=await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'El password es incorrecto'});
        }

        //si todo es correcto crea y firma el jwt
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


    }catch(error){
        console.log(error);
    }

}