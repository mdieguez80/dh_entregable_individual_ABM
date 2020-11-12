//Requiro File System
const fs = require('fs'); 
//Leo el archivo readFileSyng productosBD.json, convierto de JSON a JS con JSON.parse y lo devuelvo en la variable productos
var productos = JSON.parse(fs.readFileSync(__dirname + "/../database/productosBD.json"));


const productosController = {
    //Cargar vista productosCrear con res.render
    create : function (req, res, next){
        res.render('productosCrear')
    },
    //funcion para ingresar un porducto al JSON
    store : function(req, res, next){
        //realizo un push sobre la variable de productos
        productos.push(req.body);
        //convierto el array en un JSON dentro de prodctosJSON para poder almacenarlo
        productosJSON = JSON.stringify(productos);
        //utilizo File system para escribir el contenido de productosJSON
        fs.writeFileSync(__dirname + "/../database/productosBD.json", productosJSON);
        //envio mensaje de confirmacion
        res.send("Se registro el producto " + req.body.nombre);
    },
    //Cargar vista productosEditar con res.render
    edit: function(req,res,next){
        //tomo el id que viene por la ruta con req.params.id para poder cargar el producto a editar
        var idProductos = req.params.id;
        //variable donde guardo el producto encontrado en el for
        var productoFound;
        //utilizo un bucle (for) para recorrer la variable productos [array de objetos] para encontrar el producto por ID
        for (var i=0; i<productos.length; i++){
            /*en el IF si productos en la posicion i es igual a idproductos, guardar en productoFound el producto en la posicion i. 
            Corto con el break.*/
            if (productos[i].id == idProductos){
                productoFound = productos[i];
                break;
            }
        //Si (if) encuentro el producto por ID, osea productoFound llega con un objeto muestro la vista productosEditar con res.render()
        }if (productoFound) {
            res.render("productosEditar", {productoFound});
        //Si no (else) si la variable productoFound es undefined (vacia) mostra un msj de error
        }else{
            res.send("Producto inexistente")
        }
    },
    //funcion para guardar lo editado
    update:function(req,res,next){
        //tomo el id que viene por la ruta con req.params.id con el producto modificado
        var idProductos = req.params.id;
        /*utilizamos la funcion map para recorrer todo el array productos, generar un nuevo array (productoEditado), 
        donde guardara el producto editado y el resto de los productos que estan en el JSON sin modificar*/
        var productoEditado = productos.map(function(prod){
            /*si (IF) el id del producto que se esta recorriendo es igual al que me llega por la ruta, pisarlo con el que me llega 
            por ruta (req.body)*/
            if(prod.id == idProductos){
                return req.body;
            }
            //si no, retorna el mismo producto sin editar que estaba en el JSON
            return prod;
        });
        //convierto el array productoEditado que viene como JS y los convierto en JSON para ser guadardo por fs.writeFileSync
        productoEditadoJSON = JSON.stringify(productoEditado);
        //Con el nuevo arrray productoEditadoJSON lo guardo en el JSON (productoBD)
        fs.writeFileSync(__dirname + "/../database/productosBD.json", productoEditadoJSON);
        //devuelvo un la vista de edicion con res.redirec mas el ID del producto que recien modifique 
        res.redirect("/productos/edit/" + req.params.id)
    },
    //Creo la funcion destroy para eliminar el producto
    destroy : function(req, res, next){
        //tomo el id que viene por la ruta con req.params.id para poder cargar el producto a eliminar
        var idProductos = req.params.id;
        //variable donde guardo el producto encontrado en el for
        var productoFound;
        //utilizo un bucle (for) para recorrer la variable productos [array de objetos] para encontrar el producto por ID
        for (var i=0; i<productos.length; i++){
            /*en el IF si productos en la posicion i es igual a idproductos, guardar en productoFound el producto en la posicion i. 
            Corto con el break.*/
            if (productos[i].id == idProductos){
                productoFound = productos[i];
                break;
            }
        //Si (if) encuentro el producto por ID, osea productoFound llega con un objeto, ese mismo se elimina a traves del filter
        }if (productoFound) {
            //teniendo el producto identificado por ID aplico in filter para que me lo saque del array y volver a sobreescribir sin el mismo
            /*Creo la variable productos eliminados, llamo a la variable productos que trae toda la BD y la filtro con la funcion con la que
            le solicito que tome cada usuario y devuelva los que son distintos de ID que le pase*/
            var productoEliminado = productos.filter(function(producto){
                return producto.id != idProductos;
            });
            /*convierto el array productoEliminado que viene como JS y los convierto en JSON con JSON.stringify en productoEliminadoJSON,
            para ser guadardo por fs.writeFileSync*/
            productoEliminadoJSON = JSON.stringify(productoEliminado);
            //Con el nuevo arrray productoEliminadoJSON lo guardo en el JSON (productoBD)
            fs.writeFileSync(__dirname + "/../database/productosBD.json", productoEliminadoJSON);
            //devuelvo un mensaje con res.send
            res.send("Producto eliminado :-(");
            //Si no (else) si la variable productoFound es undefined (vacia) mostra un msj de error
        }else{
            res.send("Producto inexistente")
        }
    }
}

module.exports = productosController