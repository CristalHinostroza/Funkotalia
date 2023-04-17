if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready) 
}else{
    ready();
}
//funcion para eliminar productos del carrito
function ready(){
    var botonesEliminarProduct = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarProduct.length; i++){
        var button = botonesEliminarProduct[i];
        button.addEventListener('click',eliminarProductCarrito);
    }
    //funcion para agregar cantidad
    var botonSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i< botonSumarCantidad.length;i++){
        var button = botonSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }
    //funcion para restar cantidad
    var botonRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i< botonRestarCantidad.length;i++){
        var button = botonRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    /* //Funcion para el boton agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('add-to-cart-global');
    for(var i = 0; i<botonesAgregarAlCarrito.length; i++){
        var button=botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarroClicked);

    } */
}
function eliminarProductCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //actualizar el carrito despues de eliminar un producto
    actualizarTotalCarrito();
}
function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoProduct = carritoContenedor.getElementsByClassName('container-car');
    var total = 0;

    //Para recorrer todos por productos del carrito
    for(var i=0; i < carritoProduct.length; i++){
        var product = carritoProduct[i];
        var precioProduct = product.getElementsByClassName('producto__price')[0];
        console.log(precioProduct);
        //hay que quitar el simbolo peso y los puntos
        var precio = parseFloat(precioProduct.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadProduct = product.getElementsByClassName('carrito-cantidad')[0];
        var cantidad = cantidadProduct.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('total-carrito-precio')[0].innerText = '$'+ total.toLocaleString("es");

}
//aumentar de uno en uno los productos
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-cantidad')[0].value = cantidadActual;
    //actualizamos el total
    actualizarTotalCarrito();
}
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    //se debe controlar que no sea menor que 1
    if(cantidadActual>=1){
       selector.getElementsByClassName('carrito-cantidad')[0].value = cantidadActual;
    //actualizamos el total
    actualizarTotalCarrito(); 
    }
    
}   
/* function agregarAlCarroClicked(event){
    var button = event.target;
    var product = button.parentElement;
    var titulo = product.getElementsByClassName('product__title')[0].innerText;
    console.log(titulo);
    var precio = product.getElementsByClassName('producto__price')[0].innerText;
    var imagenSrc = product.getElementsByClassName('img-product')[0];
    console.log(imagenSrc);

    //la funcion que agrega al carrito
    agregarProductAlCarrito(titulo,precio,imagenSrc);
}
function agregarProductAlCarrito(titulo, precio, imagenSrc){
    var product = document.createElement('div');
    product.classList.add = 'product';
    var productCarrito = document.getElementsByClassName('carrito')[0];

    productCarrito.append(product);
 }   
     */