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

//FUNCION PARA VALIDAR RUT
// Capturando el DIV alerta y mensaje
let alerta = document.getElementById("alerta");
let mensaje = document.getElementById("mensaje");

// Permitir sólo números y letra K en el imput
function isNumber(evt) {
  let charCode = evt.which;

  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 75) {
    return false;
  }

  return true;
}

function checkRut(rut) {

  if (rut.value.length <= 1) {
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingrese un RUT en el siguiente campo de texto para validar si es correcto o no';
  }

  // Obtiene el valor ingresado quitando puntos y guión.
  let valor = clean(rut.value);

  // Divide el valor ingresado en dígito verificador y resto del RUT.
  let bodyRut = valor.slice(0, -1);
  let dv = valor.slice(-1).toUpperCase();

  // Separa con un Guión el cuerpo del dígito verificador.
  rut.value = format(rut.value);

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (bodyRut.length < 7) {
    rut.setCustomValidity("RUT Incompleto");
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingresó un RUT muy corto, el RUT debe ser mayor a 7 Dígitos. Ej: x.xxx.xxx-x';
    return false;
  }

  // Calcular Dígito Verificador "Método del Módulo 11"
  suma = 0;
  multiplo = 2;

  // Para cada dígito del Cuerpo
  for (i = 1; i <= bodyRut.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(bodyRut.length - i);

    // Sumar al Contador General
    suma = suma + index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;

  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    rut.setCustomValidity("RUT Inválido");

    alerta.classList.remove('alert-info', 'alert-success');
    alerta.classList.add('alert-danger');
    mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + ' Es <strong>INCORRECTO</strong>.';

    return false;
  } else {
    rut.setCustomValidity("RUT Válido");

    alerta.classList.remove('d-none', 'alert-danger');
    alerta.classList.add('alert-success');
    mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + ' Es <strong>CORRECTO</strong>.';
    return true;
  }
}

function format (rut) {
  rut = clean(rut)

  var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
  for (var i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }

  return result;
}

function clean (rut) {
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}