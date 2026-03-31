// Obtener el id del libro de la URL
const params = new URLSearchParams(window.location.search);
const idLibro = params.get('id');

// Cargar los datos del libro
async function cargarLibro() {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/libros/${idLibro}`);
        const libro = await respuesta.json();

        document.getElementById('portada').src = libro[0].portada_url;
        document.getElementById('titulo').textContent = libro[0].titulo;
        document.getElementById('autor').textContent = libro[0].autor;
        document.getElementById('genero').textContent = `Género: ${libro[0].genero}`;
        document.getElementById('anio').textContent = `Año de publicación: ${libro[0].anio_publicacion}`;
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

cargarLibro();