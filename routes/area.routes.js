/*
    Path: /api/area
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getArea, crearArea, actualizarArea, eliminarArea } = require('../controllers/area.controller');

const router = Router();

router.get('/', validarJWT, getArea);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Area es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearArea);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Area es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarArea);

router.delete('/:id', validarJWT, eliminarArea);

module.exports = router;