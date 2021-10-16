/*
    Path: /api/capacitacion
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getCapacitacion, crearCapacitacion, actualizarCapacitacion, eliminarCapacitacion } = require('../controllers/capacitacion.controller');

const router = Router();

router.get('/', validarJWT, getCapacitacion);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la capacitacion es obligatorio').not().isEmpty(),
        check('fecha', 'la fecha de la capacitacion es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCapacitacion);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la capacitacion es obligatorio').not().isEmpty(),
        check('fecha', 'la fecha de la capacitacion es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCapacitacion);

router.delete('/:id', validarJWT, eliminarCapacitacion);

module.exports = router;