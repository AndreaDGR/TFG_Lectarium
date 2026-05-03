// Obtener el id del libro de la URL
const params = new URLSearchParams(window.location.search);
const idLibro = params.get('id');
let rutaArchivo = '';

// Cargar los datos del libro
async function cargarLibro() {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/libros/${idLibro}`);
        const libro = await respuesta.json();

        rutaArchivo = libro[0].ruta_archivo;

        document.getElementById('portada').src = libro[0].portada_url;
        document.getElementById('titulo').textContent = libro[0].titulo;
        document.getElementById('autor').textContent = libro[0].autor;
        document.getElementById('genero').textContent = `Género: ${libro[0].genero}`;
        document.getElementById('anio').textContent = `Año de publicación: ${libro[0].anio_publicacion}`;
        document.getElementById('sinopsis').innerHTML = libro[0].sinopsis || 'Sinopsis no disponible';
        document.title = `Lectarium - ${libro[0].titulo}`;

        const disponibilidad = document.getElementById('disponibilidad');
        const btnPrestamo = document.getElementById('btn-prestamo');

        if (libro[0].disponibilidad === 1) {
            disponibilidad.textContent = '✓ Disponible';
            disponibilidad.className = 'disponible';
            btnPrestamo.disabled = false;
        } else {
            disponibilidad.textContent = '✗ No disponible';
            disponibilidad.className = 'no-disponible';
            btnPrestamo.disabled = true;
            btnPrestamo.textContent = 'No disponible';
        }

        await comprobarPrestamo(idLibro);

    } catch (error) {
        console.error('Error al cargar el libro:', error);
    }
}

// Solicitar préstamo
document.getElementById('btn-prestamo').addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Debes iniciar sesión para solicitar un préstamo');
        window.location.href = '/frontend/pages/login.html';
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/prestamos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ id_libro: idLibro })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert('Préstamo solicitado correctamente. Tienes 20 días para leerlo.');
            location.reload();
        } else {
            alert(datos.mensaje);
        }

    } catch (error) {
        console.error('Error al solicitar préstamo:', error);
    }
});

// Añadir o quitar favoritos
document.getElementById('btn-favorito').addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Debes iniciar sesión para añadir favoritos');
        window.location.href = '/frontend/pages/login.html';
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/favoritos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ id_libro: idLibro })
        });

        const datos = await respuesta.json();
        alert(datos.mensaje);

    } catch (error) {
        console.error('Error al añadir favorito:', error);
    }
});

// Comprobar si el usuario tiene un préstamo activo para poder leer el libro

async function comprobarPrestamo(idLibro) {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
        const respuesta = await fetch(`http://localhost:3000/api/prestamos/comprobar/%{idLibro}`, {
            headers: {'authorization': token}
        });

        const datos = await respuesta.json();
        const btnPrestamo = document.getElementById('btn-prestamo');
        const btnLeer = document.getElementById('btn-leer');

        if (datos.tienePrestamo) {
            btnPrestamo.style.display = 'none';
            btnLeer.style.display = 'block';
        } else {
            btnPrestamo.style.display = 'block';
            btnLeer.style.display = 'none';
        }
    } catch (error) {
        console.error('Error al comprobar préstamo:', error);
    }
    
}

// Leer el libro
document.getElementById('btn-leer').addEventListener('click'), () => {
    window.open(rutaArchivo, '_blank');
}

cargarLibro();
