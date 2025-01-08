let carrito = [];

function agregarAlCarrito(nombre, precio, imagen) {
    const producto = { nombre, precio, imagen };
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    const productosCarrito = document.getElementById('productos-carrito');
    if (!productosCarrito) return;
    
    productosCarrito.innerHTML = '';

    if (carrito.length === 0) {
        productosCarrito.innerHTML = '<p>Aún no tienes artículos seleccionados.</p>';
        const carritoIcon = document.querySelector('.cart-icon');
        carritoIcon.setAttribute('data-count', '0');
        return;
    }

    carrito.forEach((producto, index) => {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('producto-carrito');
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito">
            <p>${producto.nombre} - ${producto.precio}</p>
            <button onclick="eliminarProducto(${index}, event)">Eliminar</button>
        `;
        productosCarrito.appendChild(productoElemento);
    });

    const carritoIcon = document.querySelector('.cart-icon');
    carritoIcon.setAttribute('data-count', carrito.length);
}

function eliminarProducto(index, event) {
    event.stopPropagation(); 
    carrito.splice(index, 1);
    actualizarCarrito();

    if (carrito.length === 0) {
        const carritoContenido = document.getElementById('carrito-contenido');
        carritoContenido.style.display = 'none';
    }
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.style.display = 'none';
}

function mostrarCarrito(event) {
    event.stopPropagation();
    const carritoContenido = document.getElementById('carrito-contenido');
    const menu = document.getElementById('menu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    }
    carritoContenido.style.display = carritoContenido.style.display === 'none' || carritoContenido.style.display === '' ? 'block' : 'none';
}

function mostrarMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('menu');
    const carritoContenido = document.getElementById('carrito-contenido');
    if (carritoContenido.style.display === 'block') {
        carritoContenido.style.display = 'none';
    }
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'flex' : 'none';
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const carritoContenido = document.getElementById('carrito-contenido');
    
    if (!menu.contains(event.target) && !event.target.matches('.menu-icon')) {
        menu.style.display = 'none';
    }

    if (!carritoContenido.contains(event.target) && !event.target.matches('.cart-icon')) {
        carritoContenido.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.comprar').forEach((button) => {
        button.addEventListener('click', () => {
            const producto = button.closest('.producto');
            const nombre = producto.querySelector('h3').innerText;
            const precio = producto.querySelector('strong').innerText;
            const imagen = producto.querySelector('img').src;
            agregarAlCarrito(nombre, precio, imagen);
        });
    });

    document.querySelectorAll('.menu a').forEach((link) => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('menu');
            menu.style.display = 'none';
        });
    });
});

document.querySelector('.menu-icon').addEventListener('click', () => {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
});

function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}
