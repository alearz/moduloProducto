const process = require('process');

const nuevoModulo = require('./modulo'); //esto representa todo lo que esta en el archivo modulo y lo cambio de nombre a nuevoModulo.

let codigo = process.argv[2]; // representa en la terminal que el indic 2, representa el caso "listar". Mientras que node seria el indice "0", Y el archivo app.js indice "1"

switch (codigo) {
    case 'listar': // lo que va en el case siempre va en comilla
    let modulo = nuevoModulo.leerJSON(); // leerJSON es una funcion y para ejecutarla tengo que poner parentesis con el;

    if (modulo.length === 0){
        console.log("la lista de modulo esta vacia");
    }else{
        console.log("este es tu listado de modulo");
        for(let i= 0; i< modulo.length; i++){
            console.log(modulo[i].id + ": " + modulo[i].name + " Precio: " + modulo[i].price); // hicimos un ciclo, aplicando un for en cada array(id, name y price), recorriendo el array[] de 0 a 30. Donde concatenamos cada elemento del array.
        }
        
    }
        
        break;
        case "agregar":
            let name = process.argv[3];
            let price = Number(process.argv[4]);

            if(name === undefined || price === undefined){
                console.log('****************************')
                console.log("Debe ingresar el nombre del producto y precio");
                console.log('****************************')


            }else{
            nuevoModulo.escribirJSON(name, price);
            console.log('******************************');
            console.log("Producto añadido correctamente");
            console.log('******************************')
            }
            break;

            case 'filtrar': 
            let precioMinimo = process.argv[3];
            let precioMaximo = process.argv[4];

            if(precioMinimo == undefined){
                console.log('Tenes que ingresar un precio minimo')
            }else if(precioMaximo == undefined){
                console.log('Tenes que ingresar un precio maximo')
            }else{ let productosFiltrados = nuevoModulo.filtrarJSON(precioMinimo, precioMaximo);
                console.log('Estos son productos filtrados')
                productosFiltrados.forEach(producto =>{
                    console.log('producto: ' + producto.name + 'precio: ', + producto.price)
                })               
            }
            break;
            case 'cambiarPrecio' :

            let id = Number(process.argv[3]);

            let nuevoPrecio = Number(process.argv[4]);

            if(id === undefined || nuevoPrecio === undefined){
                console.log('Tenes que ingresar los parametros')
            }else{
            nuevoModulo.cambiarPrecio(id, nuevoPrecio);
            console.log('Producto modificado correctamente!')

            }
            break;
            case "delete":
                let deleteId = Number(process.argv[3]);
                if(deleteId == undefined){
                    console.log('Tiene que ingresar un Numero ID')
                }else{
                    nuevoModulo.delete(deleteId);
                    console.log('Producto deleteado correctamente')
                }
                break;
                case 'buscar':
                    let nombreoDeProducto = process.argv[3];
                    let productosBuscados = nuevoModulo.buscar(nombreoDeProducto);
                    if(productosBuscados.length !== 0){
                        console.log('Resultados de la busqueda: ')

                        productosBuscados.forEach(producto=>{

                            console.log('Id: ' + productosBuscados.id + ' productos: ' + producto.name + ' precio: ' + producto.price);
                        })
                        
                    }else{
                        console.log('Producto no encontrado');
                    }
    default:
        break;
}