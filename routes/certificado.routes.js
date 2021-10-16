/*
    Investigadores
    ruta: '/api/certificado'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCertificado,
    crearCertificado,
    actualizarCertificado,
    eliminarCertificado
} = require('../controllers/certificado.controller');



const router = Router();

router.get('/', validarJWT, getCertificado);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del certificado es necesario').not().isEmpty(),
        check('area', 'El id del area debe de ser válido').isMongoId(),
        check('puesto', 'El id del puesto debe de ser válido').isMongoId(),
        check('empleado', 'El id del empleado debe de ser válido').isMongoId(),
        check('capacitacion', 'El id de la capacitacion debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearCertificado
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del certificado es necesario').not().isEmpty(),
        check('area', 'El id del area debe de ser válido').isMongoId(),
        check('puesto', 'El id del puesto debe de ser válido').isMongoId(),
        check('empleado', 'El id del empleado debe de ser válido').isMongoId(),
        check('capacitacion', 'El id de la capacitacion debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarCertificado
);

router.delete('/:id', validarJWT,
    eliminarCertificado
);

module.exports = router;