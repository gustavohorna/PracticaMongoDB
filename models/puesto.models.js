const { Schema, model } = require('mongoose');

const PuestoSchema = Schema({
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

});


PuestoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Puesto', PuestoSchema);