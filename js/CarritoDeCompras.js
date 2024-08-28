export class CarritoDeCompras {
    constructor() {
        this.carrito = [];
    }

    agregarProducto(producto) {
        const productoExistente = this.carrito.find(item => item.nombre === producto.nombre);
        if (productoExistente) {
            productoExistente.aumentarCantidad();
        } else {
            this.carrito.push(producto);
        }
    }

    eliminarProducto(nombreProducto) {
        this.carrito = this.carrito.filter(item => item.nombre !== nombreProducto);
    }

    obtenerTotal() {
        return this.carrito.reduce((suma, producto) => suma + producto.obtenerPrecioTotal(), 0).toFixed(2);
    }

    generarFactura() {
        let factura = `Factura Electrónica\n\n`;
        factura += `Producto\tCantidad\tPrecio\n`;

        this.carrito.forEach(producto => {
            factura += `${producto.nombre}\t${producto.cantidad}\t${producto.obtenerPrecioTotal()}$\n`;
        });

        factura += `\nTotal: ${this.obtenerTotal()}$`;
        return factura;
    }
}