const { response } = require('express');

const Puesto = require('../models/puesto.models');

const getPuesto = async(req, res = response) => {

    const puesto = await Puesto.find()
        .populate('usuario', 'nombre')
        .populate('area', 'nombre')


    res.json({
        ok: true,
        puesto: puesto
    })
}

const crearPuesto = async(req, res = response) => {

    const uid = req.uid;
    const puesto = new Puesto({
        usuario: uid,
        ...req.body
    });


    try {

        const puestoDB = await puesto.save();


        res.json({
            ok: true,
            puesto: puestoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el puesto, consulte con el administrador'
        })
    }


}

const actualizarPuesto = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const puesto = await Puesto.findById(id);

        if (!puesto) {
            return res.status(404).json({
                ok: true,
                msg: 'puesto no encontrado por id',
            });
        }

        const cambiosPuesto = {
            ...req.body,
            usuario: uid
        }

        const puestoActualizado = await Puesto.findByIdAndUpdate(id, cambiosPuesto, { new: true });


        res.json({
            ok: true,
            puesto: puestoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el puesto, consulte con el administrador'
        })
    }

}

const eliminarPuesto = async(req, res = response) => {

    const id = req.params.id;

    try {

        const puesto = await Puesto.findById(id);

        if (!puesto) {
            return res.status(404).json({
                ok: true,
                msg: 'puesto no encontrado por id',
            });
        }

        await Puesto.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'puesto borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'el puesto no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getPuesto,
    crearPuesto,
    actualizarPuesto,
    eliminarPuesto
}