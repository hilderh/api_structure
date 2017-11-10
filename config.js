import Sequelize from 'sequelize';
/**
 * Datos para la conexion a BD.
 * Los datos a introducir seran en los 3 primeros parametros del new Sequelize
 * Ejem: 'testjob','root','123', donde 'testjob' es el nombre la BD, 'root' el usuario y '123' el pasword del servidor en el cual se importo el script
 */
const sequelize = new Sequelize('testjob','root','123',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 
    },
    logging: false
});


export default sequelize;