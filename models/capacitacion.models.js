const { Schema, model, SchemaTypes } = require('mongoose');

//Definicion del esquema para la coleccion de capacitacion

const CapacitacionSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'capacitacion' });

//Este cambio es solo para fines visuales, la bd permanece con _id

CapacitacionSchema.method('toJSON', function() {
        const { __v, ...object } = this.toObject();
        return object;
    })
    //Se exporta el modelo
module.exports = model('Capacitacion', CapacitacionSchema);