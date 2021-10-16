const { response } = require('express');

const Area = require('../models/area.models');

const getArea = async(req, res = response) => {

    const area = await Area.find()
        .populate('usuario', 'nombre');

    res.json({
        ok: true,
        area
    })
}

const crearArea = async(req, res = response) => {

    const uid = req.uid;
    const area = new Area({
        usuario: uid,
        ...req.body
    });

    try {

        const areaDB = await area.save();

        res.json({
            ok: true,
            area: areaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar el area, consulte con el administrador'
        })
    }

}

const actualizarArea = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const area = await Area.findById(id);

        if (!area) {
            return res.status(404).json({
                ok: true,
                msg: 'area no encontrada por id',
            });
        }

        const cambiosArea = {
            ...req.body,
            usuario: uid
        }

        const areaActualizado = await Area.findByIdAndUpdate(id, cambiosArea, { new: true });


        res.json({
            ok: true,
            area: areaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el area, consulte con el administrador'
        })
    }

}

const eliminarArea = async(req, res = response) => {

    const id = req.params.id;

    try {

        const area = await Area.findById(id);

        if (!area) {
            return res.status(404).json({
                ok: true,
                msg: 'area no encontrado por id',
            });
        }

        await Area.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'el area se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el area, consulte con el administrador'
        })
    }
}

module.exports = {
    getArea,
    crearArea,
    actualizarArea,
    eliminarArea
}