const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    estado: {
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

});


EmpleadoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Empleado', EmpleadoSchema);