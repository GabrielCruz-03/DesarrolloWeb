// Variables
let numero = 0;
let vecesSuma = 0;
let vecesResta = 0;

// Mostrar los números en la pantalla
function actualizarPantalla() {
    document.getElementById("numeroPrincipal").innerHTML = numero;
    document.getElementById("contadorInc").innerHTML = vecesSuma;
    document.getElementById("contadorDec").innerHTML = vecesResta;
}

// Función para sumar
function incrementar() {
    vecesSuma = vecesSuma + 1;
    
    numero = numero + 1;
    if (numero > 10) {
        numero = 0;
    }
    
    actualizarPantalla();
}

// Función para restar
function decrementar() {
    vecesResta = vecesResta + 1;
    
    numero = numero - 1;
    if (numero < 0) {
        numero = 10;
    }
    
    actualizarPantalla();
}