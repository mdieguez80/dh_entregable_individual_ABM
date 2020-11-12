var express = require('express');
var router = express.Router();
//requiero el controlador (funcionalidad)
const productosController = require('../controllers/productosController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Estoy en productos');
});

//Crear un producto
//Ruta que devuelve la vista del formulario
router.get('/create', productosController.create);
//Ruta que envia los datos del formulario para guardar
router.post('/create', productosController.store);


//Editar un producto
//Ruta que devuelve la vista del formulario edicion con los datos cargados por la variable ID que envio en la ruta
router.get('/edit/:id', productosController.edit);
//Ruta que envia los datos del formulario para guardar por ID enviada en la ruta
router.post('/edit/:id', productosController.update);

//Ruta para eliminar producto
router.get('/destroy/:id', productosController.destroy);


module.exports = router;
