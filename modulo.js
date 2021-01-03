/* Éste es un ejercicio optativo, para reforzar lo visto hasta ahora. Quienes lo resuelvan,
pueden dejarlo en el hilo de comentarios. ¡Éxitos!
¡CRUD Simulator!
En esta ejercitación te pediremos que desarrolles una pequeña aplicación modularizada que,
dado un archivo .json de productos (lo encontrarán abajo, en los comentarios), al ejecutarla por línea de comandos pueda recibir las
siguientes instrucciones:
- listar todos los productos 
- agregar un nuevo producto 
- filtrar los productos según su precio(ej.: Todos los productos que tengan un precio entre 20 y 100)
- modificar el precio de un producto específico
+Extras+
- eliminar un producto 
- buscar un producto  */

const fs = require('fs');
module.exports = {
    archivo: "./json.json",
leerJSON : function(){
    let listaJson = fs.readFileSync(this.archivo, 'utf-8');
    return JSON.parse(listaJson);
    
},
escribirJSON: function(nombreProducto, precio){ //le pasamos una funcion que recibe dos parametros. nombreProducto y precio
  let listaProducto = this.leerJSON(); //creamos una variable que contiene ala funcion leerJSON, que contiene a su vez la lista de producto parseado.
  let lastId = 1; // una variable, donde se van a guardar los nuevos ID.
  listaProducto.map(function(producto){ // con map recorremos la lista de producto e indicamos si, el id de la lista de producto es mayor que la variable lastId , si se cumple la condicion lastId va hacer igual al numero de producto en cada ciclo.
   if(producto.id > lastId){
       lastId = producto.id
   }
  })

  let Producto = function(id, name, price){ // esta funcion recibe 3 parammetros.
      this.id = id, // el this llama a los parametros que tengo por parametro
      this.name = name,
      this.price = price
  }
  let nuevoProducto = new Producto(lastId +1, nombreProducto, precio);// new me permite modificar las variable con nuevos parametros. lastId +1 que contiene los nuevos ID, que indicamos en la condicion map. nombreProducto es el parametro que vamos a ingresar en la funcion escribirJSON y precio, que es el nuevo parametro de escribirJSON
  listaProducto.push(nuevoProducto);//
  let listaActualizada = JSON.stringify(listaProducto);
  fs.writeFileSync('./json.json', listaActualizada, 'utf-8')


},
guardarJSON: function(datos){
let nuevoModulo = JSON.stringify(datos);
fs.writeFileSync(this.archivo, nuevoJSON, 'utf-8');

},
delete: function(id){
    let listaDeProductos = this.leerJSON();
    let quitarProducto = listaDeProductos.filter((producto)=>{
        return producto.id !== id;
    });
    let nuevaLista = JSON.stringify(quitarProducto);
    fs.writeFileSync(this.archivo, nuevaLista, )


},
buscar: function(encontrado){
    let listaDeModulo = this.leerJSON();
    let moduloFiltrado = listaDeModulo.filter(function(modulo){
        return modulo.name.toLowerCase().includes(encontrado.toLowerCase());
    });
    return moduloFiltrado;
}, 
cambiarPrecio: function(id, nuevoPrecio){
    let listaDeProductos = this.leerJSON();
    let productosAModificar = listaDeProductos.filter((producto)=>{
        if(producto.id == id ){
            producto.price = nuevoPrecio;
        }
        return listaDeProductos;
    });
    let productoModificado = JSON.stringify(productosAModificar);
    fs.writeFileSync(this.archivo, productoModificado, 'utf-8')

},

filtrarJSON: function(precioMinimo, precioMaximo){
    let productos = this.leerJSON();
    let productoFiltrados = productos.filter(producto =>{
        return producto.price >= precioMinimo && producto.price <= precioMaximo;
    });
    return productoFiltrados;
}
}