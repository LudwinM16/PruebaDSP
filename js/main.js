import { CarritoDeCompras } from './CarritoDeCompras.js';
import { Producto } from './Producto.js';

const carrito = new CarritoDeCompras();

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.add-to-cart').forEach(boton => {
        boton.addEventListener('click', function () {
            const nombre = this.getAttribute('data-name');
            const precio = parseFloat(this.getAttribute('data-price'));
            const imagen = this.getAttribute('data-image');

            const producto = new Producto(nombre, precio, imagen);
            carrito.agregarProducto(producto);
            actualizarCarritoUI();
        });
    });

    document.getElementById('cart-icon').addEventListener('click', function () {
        mostrarCarrito();
    });

    document.getElementById('close-cart').addEventListener('click', function () {
        ocultarCarrito();
    });

    document.getElementById('generate-invoice').addEventListener('click', function () {
        const factura = carrito.generarFactura();
        alert(factura); // Puedes implementar la lógica para mostrar o imprimir la factura.
    });

    manejarBotonesCarrito(); // Inicializa los manejadores de eventos para los botones de la UI
});

function actualizarCarritoUI() {
    const elementosCarrito = document.querySelector('.cart-items');
    const elementoTotal = document.querySelector('.total');
    const elementoCantidadCarrito = document.getElementById('cart-count');
    
    elementosCarrito.innerHTML = ''; // Limpia el contenido actual del carrito en la UI

    // Recorre los productos en el carrito y los agrega a la UI
    carrito.carrito.forEach((producto, indice) => {
        const elemento = document.createElement('li');
        elemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="item-content">
                ${producto.nombre} x${producto.cantidad} - $${producto.obtenerPrecioTotal().toFixed(2)}
                <div class="item-controls">
                    <button class="decrease" data-index="${indice}">-</button>
                    <button class="increase" data-index="${indice}">+</button>
                    <button class="remove" data-index="${indice}">x</button>
                </div>
            </div>
        `;
        elementosCarrito.appendChild(elemento);
    });

    // Actualiza el total y la cantidad de productos en el carrito
    elementoTotal.textContent = carrito.obtenerTotal();
    elementoCantidadCarrito.textContent = carrito.carrito.reduce((suma, item) => suma + item.cantidad, 0);
}

function mostrarCarrito() {
    const overlayCarrito = document.getElementById('cart-overlay');
    overlayCarrito.style.display = 'flex'; // Muestra el carrito en la pantalla
}

function ocultarCarrito() {
    const overlayCarrito = document.getElementById('cart-overlay');
    overlayCarrito.style.display = 'none'; // Oculta el carrito de la pantalla
}

function manejarBotonesCarrito() {
    const elementosCarrito = document.querySelector('.cart-items');

    elementosCarrito.addEventListener('click', function (e) {
        const indice = e.target.getAttribute('data-index');

        if (e.target.classList.contains('increase')) {
            carrito.carrito[indice].aumentarCantidad();
        } else if (e.target.classList.contains('decrease')) {
            carrito.carrito[indice].disminuirCantidad();
            if (carrito.carrito[indice].cantidad === 0) {
                carrito.eliminarProducto(carrito.carrito[indice].nombre);
            }
        } else if (e.target.classList.contains('remove')) {
            carrito.eliminarProducto(carrito.carrito[indice].nombre);
        }

        actualizarCarritoUI();
    });
}