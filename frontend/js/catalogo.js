const LIBROS_POR_PAGINA = 15;
let paginaActual = 1;
let todosLosLibros = [];
let librosFiltrados = [];

// Cargar todos los libros
async function cargarLibros() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/libros');
        todosLosLibros = await respuesta.json();
        librosFiltrados = todosLosLibros;
        renderizarGrid();
        renderizarPaginacion();
    } catch (error) {
        console.error('Error al cargar libros:', error);
    }
}

// Renderizar tarjetas en el grid
function renderizarGrid() {
    const grid = document.getElementById('grid-libros');
    const inicio = (paginaActual - 1) * LIBROS_POR_PAGINA;
    const fin = inicio + LIBROS_POR_PAGINA;
    const librosPagina = librosFiltrados.slice(inicio, fin);

    grid.innerHTML = '';

    if (librosPagina.length === 0) {
        grid.innerHTML = '<p class="sin-resultados">No se han encontrado libros</p>';
        return;
    }

    librosPagina.forEach(libro => {
        grid.innerHTML += `
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
}

// Renderizar paginación
function renderizarPaginacion() {
    const paginacion = document.getElementById('paginacion');
    const totalPaginas = Math.ceil(librosFiltrados.length / LIBROS_POR_PAGINA);

    paginacion.innerHTML = '';

    if (totalPaginas <= 1) return;

    paginacion.innerHTML += `<button class="btn-pagina" id="btn-anterior" ${paginaActual === 1 ? 'disabled' : ''}>&#8592;</button>`;

    for (let i = 1; i <= totalPaginas; i++) {
        paginacion.innerHTML += `<button class="btn-pagina ${i === paginaActual ? 'activo' : ''}" onclick="cambiarPagina(${i})">${i}</button>`;
    }

    paginacion.innerHTML += `<button class="btn-pagina" id="btn-siguiente" ${paginaActual === totalPaginas ? 'disabled' : ''}>&#8594;</button>`;

    document.getElementById('btn-anterior').addEventListener('click', () => cambiarPagina(paginaActual - 1));
    document.getElementById('btn-siguiente').addEventListener('click', () => cambiarPagina(paginaActual + 1));
}

// Cambiar de página
function cambiarPagina(pagina) {
    paginaActual = pagina;
    renderizarGrid();
    renderizarPaginacion();
    window.scrollTo(0, 0);
}

// Buscar libros
document.getElementById('btn-buscar').addEventListener('click', async () => {
    const query = document.getElementById('input-buscador').value.trim();
    const filtro = document.getElementById('filtro-disponibilidad').value;

    try {
        let url = query
            ? `http://localhost:3000/api/libros/buscar?query=${query}`
            : 'http://localhost:3000/api/libros';

        const respuesta = await fetch(url);
        let libros = await respuesta.json();

        if (filtro === 'disponibles') {
            libros = libros.filter(libro => libro.disponibilidad === 1);
        }

        librosFiltrados = libros;
        paginaActual = 1;
        renderizarGrid();
        renderizarPaginacion();
    } catch (error) {
        console.error('Error en la búsqueda:', error);
    }
});

// Filtro de disponibilidad
document.getElementById('filtro-disponibilidad').addEventListener('change', () => {
    const filtro = document.getElementById('filtro-disponibilidad').value;

    if (filtro === 'disponibles') {
        librosFiltrados = todosLosLibros.filter(libro => libro.disponibilidad === 1);
    } else {
        librosFiltrados = todosLosLibros;
    }

    paginaActual = 1;
    renderizarGrid();
    renderizarPaginacion();
});

// Buscar al pulsar Enter
document.getElementById('input-buscador').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('btn-buscar').click();
    }
});

cargarLibros();