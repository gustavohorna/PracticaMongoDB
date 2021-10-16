/*
    Investigadores
    ruta: '/api/empleado'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getEmpleado,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    getEmpleadoConsultaUno

} = require('../controllers/empleado.controller');




const router = Router();
router.get('/:sexo/:estado/:pais/:ciudad', validarJWT, getEmpleadoConsultaUno);
router.get('/', validarJWT, getEmpleado);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del empleado es necesario').not().isEmpty(),
        check('dni', 'El dni del empleado es necesario').not().isEmpty(),
        check('telefono', 'El telefono del empleado es necesario').not().isEmpty(),
        check('direccion', 'la direccion del empleado es necesario').not().isEmpty(),
        check('sexo', 'el sexo del empleado es necesario').not().isEmpty(),
        check('pais', 'el pais del empleado es necesario').not().isEmpty(),
        check('ciudad', 'la cuidad del empleado es necesario').not().isEmpty(),
        check('estado', 'el estado del empleado es necesario').not().isEmpty(),
        check('area', 'El id del area debe de ser válido').isMongoId(),
        check('puesto', 'El id del puesto debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearEmpleado
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del empleado es necesario').not().isEmpty(),
        check('dni', 'El dni del empleado es necesario').not().isEmpty(),
        check('telefono', 'El telefono del empleado es necesario').not().isEmpty(),
        check('direccion', 'la direccion del empleado es necesario').not().isEmpty(),
        check('sexo', 'el sexo del empleado es necesario').not().isEmpty(),
        check('pais', 'el pais del empleado es necesario').not().isEmpty(),
        check('ciudad', 'la cuidad del empleado es necesario').not().isEmpty(),
        check('estado', 'el estado del empleado es necesario').not().isEmpty(),
        check('area', 'El id del area debe de ser válido').isMongoId(),
        check('puesto', 'El id del puesto debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarEmpleado
);

router.delete('/:id', validarJWT,
    eliminarEmpleado
);

module.exports = router;