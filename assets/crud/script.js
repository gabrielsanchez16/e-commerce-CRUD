"use strict"

const baseURL = 'https://e-commerce-api-academlo.herokuapp.com/api/products';
let editingID = null; 

function generateContent(product){

    const container = document.getElementById('product')
    
    let html = '';
    for(let i = 0; i < product.length; i++){
        html += `
        <div class="col-md-6 col-lg-4 mt-3  border-cards">
        <img src="${product[i].image}" class="card-img-top img-size" alt="img-producto">
        <div class="card-body">
        <p class="card-text fs-5">${product[i].name}</p>
        <button class="btn btn-danger" onclick="deleteProduct(${product[i].id})">
            <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn btn-primary" onclick="editProduct(${product[i].id})">
        <i class="fa-solid fa-pencil"></i>
        </button>
        <p class="d-inline-block fs-3 ms-4">${product[i].price}</p>
        </div>
        </div>`
    }

    container.innerHTML = html;
}


function getProduct(){
    axios.get('https://e-commerce-api-academlo.herokuapp.com/api/products') // aqui estoy haciendo la peticion.
    .then(function (response){
        const product = response.data; // aqui es donde recibo la respuesta, esto recibe un callback
        generateContent(product)
    })
    .catch(function (error){ 
        console.log(error) // esto utilizamos para pescar errores, esto recibe un callback
    }) 
}




// crear nuevo producto
function createCard(){
    const image = document.getElementById('image').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const newCard = {
        image: image,
        name: name,
        price: price
    }

    axios.post('https://e-commerce-api-academlo.herokuapp.com/api/products', newCard)
    .then(function (response){
        const product = response.data; // aqui es donde recibo la respuesta, esto recibe un callback
        generateContent(product);
        getProduct();
    })
    .catch(function (error){ 
        console.log(error) // esto utilizamos para imprimir errores, esto recibe un callback
    }) 
}
    function editProduct(id){
        axios.get(`${baseURL}/${id}`)
        .then(function (response) {
            editingID = id;
            const product =  response.data;
            document.getElementById('image').value = product.image;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
        })
        .catch(function (error) {
            alert('No se pudo cargar la tarea');
        })
    }
    function deleteProduct(id){
        const confirmation = confirm('¿Esta seguro de eliminar el producto?');
        if(!confirmation){
            return
        }
        axios.delete(`${baseURL}/${id}`)
            .then(function () {
                alert('La tarea se eliminó correctamente');
                getProduct();
            })
            .catch(function (error) {
                alert('No se pudo eliminar la tarea');
            })
    }

    function updateProduct() {
        const productEdited = {
            image: document.getElementById('image').value,
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
        }
    
        axios.put(`${baseURL}/${editingID}`, productEdited)
            .then(function (response) {
                alert('Se editó la tarea correctamente');
                getProduct();
            })
            .catch(function (error) {
                alert('No se pudo editar la tarea');
            })
    }


getProduct();