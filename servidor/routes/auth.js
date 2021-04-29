//rutas para autenticar usuarios
const express =require('express');
const router = express.Router();
const {check}=require('express-validator');
const authController=require('../controllers/authController');

router.post('/', 
[
    check('email', 'Agreag un email válido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min: 6})
],
authController.autenticarUsuario
); 
module.exports =router;