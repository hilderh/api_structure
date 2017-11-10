import Express from 'express';
import sequelize from '../config.js'
import UserModel from '../models/user';
import {validateEmpty} from '../tools'

var resObj = {
    success: false,
    message: ''
};
const getUsers = ()=>{
    UserModel.findAll({attributes:{exclude: ['password']}}).then(users => {
        if(Object.keys(users).length == 0) {
            
            resObj.success= false;
            resObj.message= 'There are no users on the platform';
        }else{ 
            if(Object.keys(users).length > 0){
                resObj.success=true;
                resObj.success=users;
               
            }
        }
        return resObj;
    })
}
export {getUsers};