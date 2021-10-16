const { response } = require('express');

const Certificado = require('../models/certificado.models');

const getCertificado = async(req, res = response) => {

    const certificado = await Certificado.find()
        .populate('usuario', 'nombre')
        .populate('area', 'nombre')
        .populate('puesto', 'nombre')
        .populate('empleado', 'nombre')
        .populate('capacitacion', 'nombre fecha')

    res.json({
        ok: true,
        certificado: certificado
    })
}

const crearCertificado = async(req, res = response) => {

    const uid = req.uid;
    const certificado = new Certificado({
        usuario: uid,
        ...req.body
    });


    try {

        const certificadoDB = await certificado.save();


        res.json({
            ok: true,
            certificado: certificadoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el certificado, consulte con el administrador'
        })
    }


}

const actualizarCertificado = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const certificado = await Certificado.findById(id);

        if (!certificado) {
            return res.status(404).json({
                ok: true,
                msg: 'certificado no encontrado por id',
            });
        }

        const cambiosCertificado = {
            ...req.body,
            usuario: uid
        }

        const certificadoActualizado = await Certificado.findByIdAndUpdate(id, cambiosCertificado, { new: true });


        res.json({
            ok: true,
            certificado: certificadoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el certificado, consulte con el administrador'
        })
    }

}

const eliminarCertificado = async(req, res = response) => {

    const id = req.params.id;

    try {

        const certificado = await Certificado.findById(id);

        if (!certificado) {
            return res.status(404).json({
                ok: true,
                msg: 'certificado no encontrado por id',
            });
        }

        await Certificado.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'certificado borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'el certificado no puede eliminarse, consulte con el administrador'
        })
    }

}


module.exports = {
    getCertificado,
    crearCertificado,
    actualizarCertificado,
    eliminarCertificado
}