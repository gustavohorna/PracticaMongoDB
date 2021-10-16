const { response } = require('express');

const Capacitacion = require('../models/capacitacion.models');

const getCapacitacion = async(req, res = response) => {

    const capacitacion = await Capacitacion.find()
        .populate('usuario', 'nombre');

    res.json({
        ok: true,
        capacitacion
    })
}

const crearCapacitacion = async(req, res = response) => {

    const uid = req.uid;
    const capacitacion = new Capacitacion({
        usuario: uid,
        ...req.body
    });

    try {

        const capacitacionDB = await capacitacion.save();

        res.json({
            ok: true,
            capacitacion: capacitacionDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar proyecto, consulte con el administrador'
        })
    }

}

const actualizarCapacitacion = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const capacitacion = await Capacitacion.findById(id);

        if (!capacitacion) {
            return res.status(404).json({
                ok: true,
                msg: 'Capacitacion no encontrada por id',
            });
        }

        const cambiosCapacitacion = {
            ...req.body,
            usuario: uid
        }

        const capacitacionActualizado = await Capacitacion.findByIdAndUpdate(id, cambiosCapacitacion, { new: true });


        res.json({
            ok: true,
            capacitacion: capacitacionActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar la capacitacion, consulte con el administrador'
        })
    }

}

const eliminarCapacitacion = async(req, res = response) => {

    const id = req.params.id;

    try {

        const capacitacion = await Capacitacion.findById(id);

        if (!capacitacion) {
            return res.status(404).json({
                ok: true,
                msg: 'capacitacion no encontrado por id',
            });
        }

        await Capacitacion.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'la capacitacion se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar la capacitacion, consulte con el administrador'
        })
    }
}

module.exports = {
    getCapacitacion,
    crearCapacitacion,
    actualizarCapacitacion,
    eliminarCapacitacion
}