// Carga de libros

// Destacados
async function cargarDestacados() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/libros/destacados');
        const libros = await respuesta.json();

        const carrusel = document.getElementById('carrusel-destacados');
        carrusel.innerHTML = '';

        libros.slice(0, 10).forEach(libro => {
            carrusel.innerHTML += `
                <div class="tarjeta-libro" onclick="window.location.href='/frontend/pages/ficha-libro.html?id=${libro.id_libro}'">
                    <div class="tarjeta-portada">
                        <img class="img-portada" src="${libro.portada_url}" alt="Portada ${libro.titulo}" 
                        onerror="this.src='/frontend/assets/img/portada-default.webp'"/>
                    </div>
                    <div class="tarjeta-info">
                        <h3 class="tarjeta-titulo">${libro.titulo}</h3>
                        <p class="tarjeta-autor">${libro.autor}</p>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error('Error al cargar destacados:', error);
    }
}

// Novedades
async function cargarNovedades() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/libros');
        const libros = await respuesta.json();

        const carrusel = document.getElementById('carrusel-novedades');
        carrusel.innerHTML = '';

        libros.slice(-10).reverse().forEach(libro => {
            carrusel.innerHTML += `
                <div class="tarjeta-nov" onclick="window.location.href='/frontend/pages/ficha-libro.html?id=${libro.id_libro}'">
                    <div class="tarjeta-portada-nov">
                        <img class="img-portada" src="${libro.portada_url}" alt="Portada ${libro.titulo}"
                        onerror="this.src='/frontend/assets/img/portada-default.webp'"/>
                    </div>
                    <div class="tarjeta-info">
                        <h3 class="tarjeta-titulo">${libro.titulo}</h3>
                        <p class="tarjeta-autor">${libro.autor}</p>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error('Error al cargar novedades:', error);
    }
}

cargarDestacados();
cargarNovedades();