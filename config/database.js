const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        //Debemos utilizar la cadena de conexion que tenemos en mongocompass    
        // mongodb://adimnproject:E5Owhmbvi7wd71oG@cluster0-shard-00-00.uzd87.mongodb.net:27017,cluster0-shard-00-01.uzd87.mongodb.net:27017,cluster0-shard-00-02.uzd87.mongodb.net:27017/proyectosdb    
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexion exitosa a la BD')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
}
module.exports = {
    dbConection
}