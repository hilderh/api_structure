import Sequelize from 'sequelize';
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