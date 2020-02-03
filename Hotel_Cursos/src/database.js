const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');

const conex = mysql.createPool(database);
conex.getConnection((err,connection) => {
    if(err)
    {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error("LA CONEXION CON LA BASE DE DATOS FUE CERRADA");

        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error("La base de datos tiene muchas conexiones");

        }
        if(err.code === 'ECONNREFUSED'){
            console.error("La conexion ha sido rechazada");

        }
    }

    if(connection)
    {
        connection.release();
        console.log('Conexion exitosa');
    }
});

conex.query = promisify(conex.query);
module.exports = conex;