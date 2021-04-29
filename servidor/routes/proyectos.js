const express= require('express');
const router =express.Router();
const proyectosController=require('../controllers/proyectosController');
const auth=require('../middleware/auth');
const {check}=require('express-validator');

router.post('/',
auth,
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()

],
proyectosController.crearProyecto
);

router.get('/',
auth,
proyectosController.obtenerProyectos
);

//actualizar proyectos

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    
    ],
    proyectosController.actualizarProyecto
);



module.exports=router;