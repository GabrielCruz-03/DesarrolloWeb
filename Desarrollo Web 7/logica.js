// Datos iniciales de empleados
let empleados = [
    { 
        id: 1, 
        nombre: "Juan", 
        apellido: "Pérez", 
        email: "juan.perez@empresa.cu",
        telefono: "5 1234567",
        salario: 5000,
        fechaNacimiento: "1990-05-15",
        imagen: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    { 
        id: 2, 
        nombre: "María", 
        apellido: "García", 
        email: "maria.garcia@empresa.cu",
        telefono: "5 2345678",
        salario: 6000,
        fechaNacimiento: "1985-08-22",
        imagen: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    { 
        id: 3, 
        nombre: "Carlos", 
        apellido: "Rodríguez", 
        email: "carlos.rodriguez@empresa.cu",
        telefono: "5 3456789",
        salario: 4500,
        fechaNacimiento: "1995-03-10",
        imagen: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    { 
        id: 4, 
        nombre: "Ana", 
        apellido: "Martínez", 
        email: "ana.martinez@empresa.cu",
        telefono: "5 4567890",
        salario: 5500,
        fechaNacimiento: "1992-11-30",
        imagen: "https://randomuser.me/api/portraits/women/4.jpg"
    }
];

let empleadoEditando = null;
let filtroActual = {
    busqueda: "",
    ordenarPor: "nombre",
    ordenAscendente: true
};

// Imagen por defecto
const IMAGEN_DEFECTO = "https://randomuser.me/api/portraits/lego/1.jpg";

// Cargar empleados al iniciar
window.onload = function() {
    mostrarEmpleados();
};

function mostrarEmpleados() {
    let container = document.getElementById("tarjetasContainer");
    let empleadosFiltrados = filtrarEmpleadosArray();
    
    // Ordenar empleados
    empleadosFiltrados.sort((a, b) => {
        let valorA, valorB;
        
        switch(filtroActual.ordenarPor) {
            case "nombre":
                valorA = a.nombre.toLowerCase();
                valorB = b.nombre.toLowerCase();
                break;
            case "apellido":
                valorA = a.apellido.toLowerCase();
                valorB = b.apellido.toLowerCase();
                break;
            case "salario":
                valorA = a.salario;
                valorB = b.salario;
                break;
            case "fechaNacimiento":
                valorA = new Date(a.fechaNacimiento);
                valorB = new Date(b.fechaNacimiento);
                break;
            default:
                valorA = a.nombre.toLowerCase();
                valorB = b.nombre.toLowerCase();
        }
        
        if (valorA < valorB) return filtroActual.ordenAscendente ? -1 : 1;
        if (valorA > valorB) return filtroActual.ordenAscendente ? 1 : -1;
        return 0;
    });
    
    // Generar HTML de las tarjetas
    let html = "";
    empleadosFiltrados.forEach(empleado => {
        // Calcular edad
        let edad = calcularEdad(empleado.fechaNacimiento);
        
        // Formatear teléfono cubano
        let telefonoFormateado = empleado.telefono.startsWith("+53") ? 
            empleado.telefono : `+53 ${empleado.telefono}`;
        
        html += `
            <div class="tarjeta-empleado">
                <div class="tarjeta-header">
                    <img src="${empleado.imagen || IMAGEN_DEFECTO}" alt="${empleado.nombre}" class="tarjeta-imagen" onerror="this.src='${IMAGEN_DEFECTO}'">
                    <div class="tarjeta-nombre">
                        <h3>${empleado.nombre} ${empleado.apellido}</h3>
                        <p>${empleado.email}</p>
                    </div>
                </div>
                
                <div class="tarjeta-info">
                    <div class="info-item">
                        <span class="label">📞 Teléfono:</span>
                        <span class="value telefono-cubano">${empleado.telefono}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">💰 Salario:</span>
                        <span class="value">$${empleado.salario.toLocaleString()}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">🎂 Edad:</span>
                        <span class="value">${edad} años</span>
                    </div>
                    <div class="info-item">
                        <span class="label">📅 Nacimiento:</span>
                        <span class="value">${formatearFecha(empleado.fechaNacimiento)}</span>
                    </div>
                </div>
                
                <div class="tarjeta-acciones">
                    <button class="btn-editar" onclick="editarEmpleado(${empleado.id})">✏️ Editar</button>
                    <button class="btn-eliminar" onclick="eliminarEmpleado(${empleado.id})">❌ Eliminar</button>
                </div>
            </div>
        `;
    });
    
    if (empleadosFiltrados.length === 0) {
        html = '<p style="text-align: center; padding: 40px;">No hay empleados que coincidan con la búsqueda 📭</p>';
    }
    
    container.innerHTML = html;
    document.getElementById("totalEmpleados").innerHTML = empleadosFiltrados.length;
}

function filtrarEmpleadosArray() {
    return empleados.filter(empleado => {
        if (!filtroActual.busqueda) return true;
        
        let busqueda = filtroActual.busqueda.toLowerCase();
        return empleado.nombre.toLowerCase().includes(busqueda) ||
               empleado.apellido.toLowerCase().includes(busqueda) ||
               empleado.email.toLowerCase().includes(busqueda) ||
               empleado.telefono.includes(busqueda);
    });
}

function filtrarEmpleados() {
    filtroActual.busqueda = document.getElementById("busqueda").value;
    mostrarEmpleados();
}

function ordenarEmpleados() {
    filtroActual.ordenarPor = document.getElementById("ordenarPor").value;
    filtroActual.ordenAscendente = true; // Resetear a ascendente
    mostrarEmpleados();
}

function guardarEmpleado() {
    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let salario = document.getElementById("salario").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let imagen = document.getElementById("imagen").value.trim();
    
    // Validaciones
    if (!nombre || !apellido || !email || !telefono || !salario || !fechaNacimiento) {
        alert("❌ Por favor, completa todos los campos obligatorios");
        return;
    }
    
    // Validar email
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
        alert("❌ Por favor, introduce un email válido");
        return;
    }
    
    // Validar teléfono cubano
    let regexTelefono = /^(\+53)?\s*[0-9]{1}\s*[0-9]{7}$/;
    if (!regexTelefono.test(telefono.replace(/\s/g, ""))) {
        alert("❌ Por favor, introduce un teléfono cubano válido (ej: +53 5 1234567)");
        return;
    }
    
    // Validar edad (mayor de 18 años)
    let edad = calcularEdad(fechaNacimiento);
    if (edad < 18) {
        alert("❌ El empleado debe ser mayor de 18 años");
        return;
    }
    
    if (empleadoEditando) {
        // Actualizar empleado existente
        empleadoEditando.nombre = nombre;
        empleadoEditando.apellido = apellido;
        empleadoEditando.email = email;
        empleadoEditando.telefono = telefono;
        empleadoEditando.salario = parseFloat(salario);
        empleadoEditando.fechaNacimiento = fechaNacimiento;
        empleadoEditando.imagen = imagen || IMAGEN_DEFECTO;
        
        // Actualizar en el array
        let index = empleados.findIndex(e => e.id === empleadoEditando.id);
        if (index !== -1) {
            empleados[index] = empleadoEditando;
        }
        
        alert("✅ Empleado actualizado correctamente");
        empleadoEditando = null;
        document.getElementById("btnGuardar").innerHTML = "💾 Guardar Empleado";
    } else {
        // Crear nuevo empleado
        let nuevoEmpleado = {
            id: Date.now(),
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            salario: parseFloat(salario),
            fechaNacimiento: fechaNacimiento,
            imagen: imagen || IMAGEN_DEFECTO
        };
        
        empleados.push(nuevoEmpleado);
        alert("✅ Empleado añadido correctamente");
    }
    
    limpiarFormulario();
    mostrarEmpleados();
}

function editarEmpleado(id) {
    let empleado = empleados.find(e => e.id === id);
    if (empleado) {
        empleadoEditando = empleado;
        
        // Llenar el formulario
        document.getElementById("nombre").value = empleado.nombre;
        document.getElementById("apellido").value = empleado.apellido;
        document.getElementById("email").value = empleado.email;
        document.getElementById("telefono").value = empleado.telefono;
        document.getElementById("salario").value = empleado.salario;
        document.getElementById("fechaNacimiento").value = empleado.fechaNacimiento;
        document.getElementById("imagen").value = empleado.imagen !== IMAGEN_DEFECTO ? empleado.imagen : "";
        
        document.getElementById("btnGuardar").innerHTML = "📝 Actualizar Empleado";
    }
}

function eliminarEmpleado(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este empleado? 🗑️")) {
        empleados = empleados.filter(e => e.id !== id);
        
        // Si estábamos editando este empleado, cancelar edición
        if (empleadoEditando && empleadoEditando.id === id) {
            limpiarFormulario();
        }
        
        mostrarEmpleados();
        alert("✅ Empleado eliminado correctamente");
    }
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("imagen").value = "";
    empleadoEditando = null;
    document.getElementById("btnGuardar").innerHTML = "💾 Guardar Empleado";
}

function calcularEdad(fechaNacimiento) {
    let hoy = new Date();
    let nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    
    return edad;
}

function formatearFecha(fecha) {
    let f = new Date(fecha);
    return f.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Bonus: Permitir búsqueda con Enter
document.getElementById("busqueda").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        filtrarEmpleados();
    }
});