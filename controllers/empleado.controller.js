const { response } = require('express');

const Empleado = require('../models/empleado.models');

const getEmpleado = async(req, res = response) => {

    const empleado = await Empleado.find()
        .populate('usuario', 'nombre')
        .populate('area', 'nombre')
        .populate('puesto', 'nombre')

    res.json({
        ok: true,
        empleado: empleado
    })
}
const getEmpleadoConsultaUno = async(req, res) => {


    const { sexo, estado, pais, ciudad } = req.params;
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [empleado, total] = await Promise.all([
        Empleado
        .find()
        .select(['nombre', 'sexo', 'pais', 'ciudad', 'estado'])
        .where('sexo').equals(sexo)
        .where('estado').equals(estado)
        .where('pais').equals(pais)
        .where('ciudad').equals(ciudad)

        .skip(desde)
        .limit(limite),
        Empleado.countDocuments()
    ]);

    res.json({
        ok: true,
        empleado,
        total
    });
}

const crearEmpleado = async(req, res = response) => {

    const uid = req.uid;
    const { dni } = req.body;

    ///

    try {
        const existeDni = await Empleado.findOne({ dni });
        if (existeDni) {
            return res.status(400).json({
                ok: false,
                msg: 'El DNI ya ha sido registrado'
            });
        }
        const empleado = new Empleado({
            usuario: uid,
            ...req.body
        });
        await empleado.save();

        res.json({
            ok: true,
            empleado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el empleado, consulte con el administrador'
        })
    }


}

const actualizarEmpleado = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const empleado = await Empleado.findById(id);

        if (!empleado) {
            return res.status(404).json({
                ok: true,
                msg: 'empleado no encontrado por id',
            });
        }

        const { nombre, dni, telefono, direccion } = req.body;
        if (empleado.dni !== dni) {
            const existeDni = await Empleado.findOne({ dni });
            if (existeDni) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un empleado con este DNI'
                });
            }
        }

        const cambiosEmpleado = {
            ...req.body,
            usuario: uid
        }

        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, cambiosEmpleado, { new: true });


        res.json({
            ok: true,
            empleado: empleadoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el empleado, consulte con el administrador'
        })
    }

}

const eliminarEmpleado = async(req, res = response) => {

    const id = req.params.id;

    try {

        const empleado = await Empleado.findById(id);

        if (!empleado) {
            return res.status(404).json({
                ok: true,
                msg: 'empleado no encontrado por id',
            });
        }

        await Empleado.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'empleado borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'el empleado no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getEmpleado,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    getEmpleadoConsultaUno
}