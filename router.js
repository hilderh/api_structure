import Express from 'express';
import sequelize from './config.js'
import UserModel from './models/user';
import { getUsers } from './functions/user'
import { validateEmpty, validateKeys } from './tools'
const app = new Express();
const router = Express.Router();

let data = {
    dataReq: '',
    dataRes: ''
}

router.get('/users', (req, res) => {
    // let GetUsers = getUsers();
    // console.log(GetUsers)
    // res.json(GetUsers)
    UserModel.findAll({ attributes: { exclude: ['password'] } }).then(users => {
        if (Object.keys(users).length == 0) {
            res.json({
                success: false,
                message: 'There are no users on the platform'
            });
        } else {
            if (Object.keys(users).length > 0) {
                res.json({
                    success: true,
                    result: [users]
                });
            }
        }

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
    console.log(validateParamsBody)
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
        console.log(51545)
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
router.post('/users/login', (req, res) => {

    let authLogin = req.body;
    let params = Object.keys(UserModel.rawAttributes).filter((i) => i == 'Username' || i == 'password');
    const respTool = validateEmpty(authLogin);
    const validateRequest = validateKeys(params, authLogin);
    if (!respTool.error && !validateRequest.error) {
        UserModel.findOne({ where: { Username: authLogin.Username } }).then(user => {
            if (!user) {
                res.json({
                    success: false,
                    message: "User not found"
                });
            } else {
                if (authLogin.Username == user.Username && authLogin.password == user.password) {
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
                console.log('Parametro Username: --->', req.body.Username);
                console.log('Parametro password: --->', req.body.password);
                console.log('usuario passrowd: --->', user.password);
                console.log('usuario Username: --->', user.Username);
                // if(req.params.id == user.id && user.mail == req.params.mail){

                // }
            }
        });

    } else {
        res.json({
            success: false,
            message: respTool.message
        });
    }
});
export default router;