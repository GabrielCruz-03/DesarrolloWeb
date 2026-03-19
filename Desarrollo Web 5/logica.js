async function buscarUsuario() {
    // Obtener el nombre de usuario
    let usuario = document.getElementById("usuarioGit").value.trim();
    let resultadoDiv = document.getElementById("resultado");
    let boton = document.querySelector("button");
    
    // Si no escribió nada, mostrar mensaje
    if (usuario === "") {
        resultadoDiv.innerHTML = "<p class='error'>📝 Escribe un nombre de usuario primero</p>";
        return;
    }
    
    // Mostrar estado de carga
    resultadoDiv.innerHTML = "<p class='cargando'>🔍 Buscando usuario...</p>";
    boton.disabled = true;
    
    try {
        // Llamada a la API de GitHub para el usuario
        let respuestaUsuario = await fetch(`https://api.github.com/users/${usuario}`);
        
        if (!respuestaUsuario.ok) {
            if (respuestaUsuario.status === 404) {
                throw new Error("Usuario no encontrado 😢");
            } else {
                throw new Error("Error en la búsqueda");
            }
        }
        
        let datosUsuario = await respuestaUsuario.json();
        
        // Llamada a la API para los repositorios
        let respuestaRepos = await fetch(`https://api.github.com/users/${usuario}/repos?sort=updated&per_page=5`);
        let datosRepos = await respuestaRepos.json();
        
        // Mostrar los resultados
        mostrarResultados(datosUsuario, datosRepos);
        
    } catch (error) {
        // Mostrar error
        resultadoDiv.innerHTML = `<p class='error'>❌ ${error.message}</p>`;
    } finally {
        // Habilitar botón de nuevo
        boton.disabled = false;
    }
}

function mostrarResultados(usuario, repos) {
    let resultadoDiv = document.getElementById("resultado");
    
    // Construir HTML del perfil
    let html = `
        <div class="perfil">
            <img src="${usuario.avatar_url}" alt="${usuario.login}" class="avatar">
            <div class="info">
                <h2>${usuario.name || usuario.login}</h2>
                <p>${usuario.bio || "Sin biografía"}</p>
                <div class="stats">
                    <span>📦 ${usuario.public_repos} repos</span>
                    <span>👥 ${usuario.followers} seguidores</span>
                    <span>👤 ${usuario.following} siguiendo</span>
                </div>
                <p>📍 ${usuario.location || "Ubicación no especificada"}</p>
                <p>🔗 <a href="${usuario.html_url}" target="_blank">${usuario.html_url}</a></p>
            </div>
        </div>
    `;
    
    // Añadir repositorios
    html += '<div class="repositorios"><h3>📚 Últimos repositorios actualizados:</h3>';
    
    if (repos.length === 0) {
        html += "<p>Este usuario no tiene repositorios públicos</p>";
    } else {
        repos.forEach(repo => {
            html += `
                <div class="repo">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>${repo.description || "Sin descripción"}</p>
                    <div>
                        ${repo.language ? `<span class="lenguaje">${repo.language}</span>` : ''}
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                </div>
            `;
        });
    }
    
    html += '</div>';
    
    resultadoDiv.innerHTML = html;
}