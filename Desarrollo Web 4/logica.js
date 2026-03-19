function validarEmail() {
    // Obtener el email que escribió el usuario
    let email = document.getElementById("emailUsuario").value;
    
    // Obtener elementos del DOM
    let inputEmail = document.getElementById("emailUsuario");
    let resultadoDiv = document.getElementById("resultado");
    
    // Si no escribió nada, mostrar mensaje
    if (email === "") {
        resultadoDiv.innerHTML = "📧 Escribe un email primero";
        resultadoDiv.className = "resultado";
        inputEmail.className = "";
        return;
    }
    
    // Expresión regular para validar email
    // Esta regex comprueba: texto@texto.texto
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Comprobar si el email cumple la regex
    if (regexEmail.test(email)) {
        // Email válido
        resultadoDiv.innerHTML = "✅ ¡Email válido!";
        resultadoDiv.className = "resultado valido";
        inputEmail.className = "valido";
    } else {
        // Email inválido
        resultadoDiv.innerHTML = "❌ Email no válido<br><small>Debe ser algo como: nombre@dominio.com</small>";
        resultadoDiv.className = "resultado invalido";
        inputEmail.className = "invalido";
    }
}

// Bonus: Validar mientras el usuario escribe (opcional)
document.getElementById("emailUsuario").addEventListener("keyup", function() {
    // Si quieres que valide automáticamente mientras escribe, 
    // puedes llamar a validarEmail() aquí
});