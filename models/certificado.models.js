const { Schema, model } = require('mongoose');

const CertificadoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    },
    puesto: {
        type: Schema.Types.ObjectId,
        ref: 'Puesto',
        required: true
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true
    },
    capacitacion: {
        type: Schema.Types.ObjectId,
        ref: 'Capacitacion',
        required: true
    },

});


CertificadoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Certificado', CertificadoSchema);