import Sequelize from 'sequelize';
import sequelize from '../config.js';

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name:{
        type: Sequelize.STRING
    },
    last_name:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    Username:{
        type: Sequelize.STRING
        
    },

},{tableName:'MOCK_DATA',timestamps: false});

User.sync({force: false}).then(() => {});


export default User;