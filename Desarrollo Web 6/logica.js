// Datos iniciales (productos cubanos)
let productos = [
    { id: 1, nombre: "Arroz", categoria: "Alimentos", anio: 2023 },
    { id: 2, nombre: "Frijoles", categoria: "Alimentos", anio: 2023 },
    { id: 3, nombre: "Ron Havana Club", categoria: "Bebidas", anio: 2022 },
    { id: 4, nombre: "Cerveza Cristal", categoria: "Bebidas", anio: 2024 },
    { id: 5, nombre: "Bicicleta", categoria: "Transporte", anio: 2021 },
    { id: 6, nombre: "Televisor", categoria: "Electrodomésticos", anio: 2023 },
    { id: 7, nombre: "Café Serrano", categoria: "Alimentos", anio: 2024 }
];

let productoEditando = null; // Para saber si estamos editando
let filtroActual = {
    busqueda: "",
    categoria: "Todas",
    columnaOrden: "nombre",
    ordenAscendente: true
};

// Cargar tabla al iniciar
window.onload = function() {
    mostrarTabla();
};

function mostrarTabla() {
    let tbody = document.getElementById("tablaBody");
    let productosFiltrados = filtrarProductos();
    
    // Ordenar productos
    productosFiltrados.sort((a, b) => {
        let valorA = a[filtroActual.columnaOrden];
        let valorB = b[filtroActual.columnaOrden];
        
        if (typeof valorA === "string") {
            valorA = valorA.toLowerCase();
            valorB = valorB.toLowerCase();
        }
        
        if (valorA < valorB) return filtroActual.ordenAscendente ? -1 : 1;
        if (valorA > valorB) return filtroActual.ordenAscendente ? 1 : -1;
        return 0;
    });
    
    // Generar HTML de la tabla
    let html = "";
    productosFiltrados.forEach(producto => {
        html += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>${producto.anio}</td>
                <td class="acciones">
                    <button class="btn-editar" onclick="editarProducto(${producto.id})">✏️ Editar</button>
                    <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">❌ Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    document.getElementById("totalProductos").innerHTML = productosFiltrados.length;
}

function filtrarProductos() {
    return productos.filter(producto => {
        // Filtro por búsqueda
        let cumpleBusqueda = true;
        if (filtroActual.busqueda) {
            let busqueda = filtroActual.busqueda.toLowerCase();
            cumpleBusqueda = producto.nombre.toLowerCase().includes(busqueda) ||
                           producto.categoria.toLowerCase().includes(busqueda) ||
                           producto.anio.toString().includes(busqueda);
        }
        
        // Filtro por categoría
        let cumpleCategoria = true;
        if (filtroActual.categoria !== "Todas") {
            cumpleCategoria = producto.categoria === filtroActual.categoria;
        }
        
        return cumpleBusqueda && cumpleCategoria;
    });
}

function filtrarTabla() {
    filtroActual.busqueda = document.getElementById("busqueda").value;
    filtroActual.categoria = document.getElementById("filtroCategoria").value;
    mostrarTabla();
}

function ordenarTabla(columna) {
    if (filtroActual.columnaOrden === columna) {
        filtroActual.ordenAscendente = !filtroActual.ordenAscendente;
    } else {
        filtroActual.columnaOrden = columna;
        filtroActual.ordenAscendente = true;
    }
    mostrarTabla();
}

function guardarProducto() {
    let nombre = document.getElementById("nombre").value.trim();
    let categoria = document.getElementById("categoria").value;
    let anio = document.getElementById("anio").value;
    
    // Validaciones
    if (!nombre || !categoria || !anio) {
        alert("❌ Por favor, completa todos los campos");
        return;
    }
    
    if (anio < 1900 || anio > 2026) {
        alert("❌ El año debe estar entre 1900 y 2026");
        return;
    }
    
    if (productoEditando) {
        // Actualizar producto existente
        productoEditando.nombre = nombre;
        productoEditando.categoria = categoria;
        productoEditando.anio = parseInt(anio);
        
        // Actualizar en el array
        let index = productos.findIndex(p => p.id === productoEditando.id);
        if (index !== -1) {
            productos[index] = productoEditando;
        }
        
        alert("✅ Producto actualizado correctamente");
        productoEditando = null;
        document.getElementById("btnGuardar").innerHTML = "💾 Guardar Producto";
    } else {
        // Crear nuevo producto
        let nuevoProducto = {
            id: Date.now(), // ID único basado en timestamp
            nombre: nombre,
            categoria: categoria,
            anio: parseInt(anio)
        };
        
        productos.push(nuevoProducto);
        alert("✅ Producto añadido correctamente");
    }
    
    limpiarFormulario();
    mostrarTabla();
}

function editarProducto(id) {
    let producto = productos.find(p => p.id === id);
    if (producto) {
        productoEditando = producto;
        
        // Llenar el formulario
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("categoria").value = producto.categoria;
        document.getElementById("anio").value = producto.anio;
        
        document.getElementById("btnGuardar").innerHTML = "📝 Actualizar Producto";
    }
}

function eliminarProducto(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este producto? 🗑️")) {
        productos = productos.filter(p => p.id !== id);
        
        // Si estábamos editando este producto, cancelar edición
        if (productoEditando && productoEditando.id === id) {
            limpiarFormulario();
        }
        
        mostrarTabla();
        alert("✅ Producto eliminado correctamente");
    }
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("anio").value = "";
    productoEditando = null;
    document.getElementById("btnGuardar").innerHTML = "💾 Guardar Producto";
}

// Bonus: Permitir búsqueda con Enter
document.getElementById("busqueda").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        filtrarTabla();
    }
});