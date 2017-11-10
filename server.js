import Express from 'express';
import bodyParser from 'body-parser'

import routes from './router';
import sequelize from './config.js'

const app = new Express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api', routes);
app.get('/api', (req, res) => {
    res.send(JSON.stringify('corriendo la api', null, 2))
});

sequelize.authenticate().then(() => {
    console.log('---Conexion a la base de datos establecida exitosamente---')
}).catch(() => {
    console.log('***Conexion fallida, vuelve a intentarlo***')
});
app.listen(3000, () => { });