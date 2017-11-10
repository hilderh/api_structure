import Express from 'express';
import sequelize from './config.js'
import UserModel from './models/user';
import { getUsers } from './functions/user'
import { validateEmpty, validateKeys } from './tools'
const app = new Express();
const router = Express.Router();
/**
 * Lista de peticiones aceptadas por la API
 */

router.get('/users', (req, res) => {
    UserModel.findAll({ attributes: { exclude: ['password'] } }).then(users => {
        if (Object.keys(users).length == 0) {
            return res.json({
                success: false,
                message: 'There are no users on the platform'
            });
        }
        res.json({
            success: true,
            result: users
        });

    })
});

router.get('/users/:id', (req, res) => {
    UserModel.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } }).then(user => {
        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
        } else {
            res.json({
                success: true,
                data: user
            });
        }

    });
});

router.put('/users/:id', (req, res) => {
    const validateParamsBody = validateEmpty(req.body);
    let params = Object.keys(UserModel.rawAttributes).filter((i) => i !== 'id');
    const validateRequest = validateKeys(params, newUser);
    if (validateParamsBody.error) {
        res.json({
            success: false,
            message: validateParamsBody.message
        });
    } else {
        UserModel.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } }).then(user => {
            if (!user) {
                res.json({
                    success: false,
                    message: "User not found"
                });
            } else {
                UserModel.update(req.body, { where: { id: req.params.id } });
                res.json({
                    success: true,
                    message: "User updated"
                });
            }

        });
    }
});

router.delete('/users/:id', (req, res) => {
    UserModel.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } }).then(user => {
        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
        } else {
            UserModel.destroy({ where: { id: req.params.id } });
            res.json({
                success: true,
                message: "User deleted"
            });
        }
    });
});
const verifyPost = (req, res, next) => {
    let newUser = req.body;
    const respTool = validateEmpty(newUser);
    let params = Object.keys(UserModel.rawAttributes).filter((i) => i !== 'id');
    const validateRequest = validateKeys(params, newUser);
    if (respTool.error || validateRequest.error) {
        return res.json({
            success: false,
            message: respTool.message
        });
    }
    req.newUser = newUser;
    next();

};
router.post('/users', verifyPost, (req, res, next) => {

    const { newUser } = req;
    UserModel.findOne({ where: { Username: newUser.Username } }).then(user => (user) ?
        res.json({
            success: false,
            message: "User already exists"
        })
        : UserModel.create(newUser).then(user => {
            res.json({
                success: true,
                data: user
            });

        })
    )


});
const verifyPostLogin = (req, res, next) => {
    let authData = req.body;
    const respTool = validateEmpty(authData);
    let params = Object.keys(UserModel.rawAttributes).filter((i) => i == 'Username' || i == 'password');
    const validateRequest = validateKeys(params, authData);
    if (respTool.error || validateRequest.error) {
        return res.json({
            success: false,
            message: respTool.message
        });
    }
    req.authData = authData;
    next();

};
router.post('/users/login', verifyPostLogin, (req, res) => {
    const { authData } = req;
    UserModel.findOne({ where: { Username: authData.Username } }).then(user => {
        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
        } else {
            if (authData.Username == user.Username && authData.password == user.password) {
                res.json({
                    success: true,
                    data: [user]
                });
            } else {
                res.json({
                    success: false,
                    message: "Username or Password incorrect"
                });
            }
        }
    });
});
export default router;