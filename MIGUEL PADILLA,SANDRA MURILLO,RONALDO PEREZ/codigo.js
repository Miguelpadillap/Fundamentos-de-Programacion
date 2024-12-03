
let carros = []
let compras = []
const myToast = new bootstrap.Toast(document.getElementById('liveToast'));

let carro = {
   modelo : '',
   marca : '',
   cilindraje : '',
   imagen : '',
   precio : 0,

}



let cajita = document.getElementById('numero')

function registro(){
    agregarcarro()
    limpiar()
   
}

function comprasvehiculo(pos){
   compras.push(carros[pos])
   let carrito = document.getElementById('carrito')
   carrito.innerText = compras.length
   document.getElementById('mensajetoast').innerText = "Compra realizada con exito ..."
   myToast.show();
   console.log(compras)
}

function agregarcarro(){
      carro.modelo     =   document.getElementById('modelo').value
      carro.marca      =   document.getElementById('marca').value
      carro.cilindraje =   document.getElementById('cilindraje').value
      carro.imagen     =   document.getElementById('imagen').value
      carro.precio     =   parseInt(document.getElementById('precio').value)
      carros.push({...carro})
     
      document.getElementById('mensajetoast').innerText = "Registro guardado con exito ..."
      myToast.show();
     
}

function cantidadelementos(){
    document.getElementById('cantidad').innerText = numeros.length
 }

function limpiar() {
    let marca = document.getElementById('marca')
    marca.value = ''
     document.getElementById('modelo').value = ''
    document.getElementById('cilindraje').value = 0
    document.getElementById('imagen').value = ''
    document.getElementById('precio').value = 0
    marca.focus()
}

function visualizarcatalogo(){
    let tarjetas = `<div class="row">`
    for(pos in carros){
       let data = carros[pos]
      tarjetas +=   `<div class="col-3">
                        <div class="card " style="width: 18rem;">
                           
                                <img src=${data.imagen} class="card-img-top imagen" alt="...">
                            
                           
                             <div class="card-body">
                                 <h5 class="card-title">${data.marca}</h5>
                                 <p <span >Modelo : ${data.modelo}</span>
                                 <span >Cilindraje : ${data.cilindraje}</span></p>
                                 <button onclick="comprasvehiculo(${pos})">$ ${data.precio}</button>
                             </div>
                       </div></div>`
    }
    tarjetas += "</div>"
    document.getElementById('catalogo').innerHTML = tarjetas

}

function visualizardatos(){
    let tabla = `<table class="table table-dark table-hover" border='1'>
       <thead>
         <th>MARCA</th>
         <th>MODELO</th>
         <th>CILINDRAJE</th>
         <th>PRECIO</th>
         <th>IMAGEN</th>
        </thead>`
     for(data of carros){
      tabla += `<tr>
                  <td>${data.marca}</td>
                  <td>${data.modelo}</td>
                  <td>${data.cilindraje}</td>
                  <td>${data.precio}</td>
                  <td><img src="${data.imagen}" class="imagen"></td>
                </tr>`
  }
  tabla += `</table>`
  document.getElementById('datos').innerHTML = tabla

}
