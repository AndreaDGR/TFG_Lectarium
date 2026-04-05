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
        const respuesta = await fetch('http://localhost:3000/api/libros/novedades');
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

//Deslizamiento de carruseles
function desplazarCarrusel() {
    const carruseles = document.querySelectorAll('.carrusel-contenedor');
    
    carruseles.forEach(contenedor => {
        const carrusel = contenedor.querySelector('.carrusel');
        const btnIzq = contenedor.querySelector('.flecha.izq');
        const btnDcha = contenedor.querySelector('.flecha.dcha');
        

        const desplazamiento = 240;

        btnDcha.addEventListener('click', () => {
            carrusel.scrollBy({ left: desplazamiento, behavior: 'smooth' });
        });
        btnIzq.addEventListener('click', () => {
            carrusel.scrollBy({ left: -desplazamiento, behavior: 'smooth' });
        });
    });
}

Promise.all([cargarDestacados(), cargarNovedades()])
    .then(() => desplazarCarrusel());