function comprobarPalindromo() {
    // Obtener el texto que escribió el usuario
    let texto = document.getElementById("textoUsuario").value;
    
    // Si no escribió nada, mostrar mensaje
    if (texto === "") {
        document.getElementById("resultado").innerHTML = "Escribe algo primero 🙈";
        return;
    }
    
    // Limpiar el texto: minúsculas y sin espacios
    let textoLimpio = texto.toLowerCase();
    textoLimpio = textoLimpio.replace(/ /g, "");   // quitar espacios
    
    // Dar la vuelta al texto
    let textoAlReves = "";
    for (let i = textoLimpio.length - 1; i >= 0; i--) {
        textoAlReves = textoAlReves + textoLimpio[i];
    }
    
    // Comprobar si es igual
    let resultadoDiv = document.getElementById("resultado");
    
    if (textoLimpio === textoAlReves) {
        resultadoDiv.innerHTML = "✅ ¡SÍ es un palíndromo!";
        resultadoDiv.style.color = "green";
    } else {
        resultadoDiv.innerHTML = "❌ NO es un palíndromo";
        resultadoDiv.style.color = "red";
    }
}