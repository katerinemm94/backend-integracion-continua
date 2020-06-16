const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('morgan');
const bodyParser = require('body-parser');
// Esta será nuestra entrada de solicitud. Configuraremos nuestro servidor http aquí.
const http = require('http');


var get_ip = require('ipware')().get_ip;

// Configuramos la aplicación con express
const app = express();
// Registra las solicitudes a la consola.
app.use(logger('dev'));
// Analizar los datos de las solicitudes entrantes (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Manejo de Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    next();
});

// Obtener la ip de quien hace la petición
app.use(function(req, res, next) {
    var ip_info = get_ip(req);
    req.ip_info = ip_info;
    next();
});

// Importar modelos para sequelize
var models = require('./models');
models.sequelize.sync().then(function() {
    console.log('Base de datos corriendo');
}).catch(function(err) {
    console.log(err, 'Ocurrieron algunos errores');
});

// Require routes
require('./routes')(app);

// Configurar una ruta predeterminada que devuelva un mensaje de bienvenida en formato JSON.
app.get('*', (req, res) => res.status(200).send({
    message: 'Bienvenido api de backend integración continua de katerine martinez',
}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// Crear el servidor y escuchar por el puerto configurado
const server = http.createServer(app);
server.listen(port);
module.exports = app;