/*
    Investigadores
    ruta: '/api/puesto'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPuesto,
    crearPuesto,
    actualizarPuesto,
    eliminarPuesto
} = require('../controllers/puesto.controller')


const router = Router();

router.get('/', validarJWT, getPuesto);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del puesto es necesario').not().isEmpty(),
        check('area', 'El id del area debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearPuesto
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del puesto es necesario').not().isEmpty(),
        check('area', 'El id del area debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarPuesto
);

router.delete('/:id', validarJWT,
    eliminarPuesto
);

module.exports = router;