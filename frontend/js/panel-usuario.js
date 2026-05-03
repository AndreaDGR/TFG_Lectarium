const token = localStorage.getItem('token');
if (!token) window.location.href = '/pages/login.html';

//Navegación del sidebar

document.querySelectorAll('.menu-item[data-seccion]').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(i =>
            i.classList.remove('activo')
        );
        
        document.querySelectorAll('.seccion').forEach(s =>
            s.classList.add('oculto'));
        
        item.classList.add('activo');
        document.getElementById(`seccion-${item.dataset.seccion}`).classList.remove('oculto');
    });
});

//Cerrar sesión

document.getElementById('btn-cerrar-sesion').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/index.html';

});

//Cargar préstamos

async function cargarPrestamos() {
    try {
        const respuesta = await fetch(`${API_URL}/api/prestamos/historial`, {
            headers: {'authorization': token}
        });
        const prestamos = await respuesta.json();
        const lista = document.getElementById('lista-prestamos');
        if(prestamos.length === 0) {
            lista.innerHTML = '<p class="sin-datos">No tienes préstamos activos</p>';
            return;
        }
        lista.innerHTML = '';
        prestamos.forEach(p => {
            const fechaFin = new Date(p.fecha_fin).toLocaleDateString('es-ES');
            lista.innerHTML += `
                <div class="tarjeta-prestamo">
                    <div class="prestamo-info">
                        <h3>${p.titulo}</h3>
                        <p>${p.autor} · ${p.genero}</p>
                    </div>
                    <div class="prestamo-fecha">
                        <p>Vence el ${fechaFin}</p>
                        <p class="estado-${p.estado}">
                            ${p.estado.charAt(0).toUpperCase() + p.estado.slice(1)}
                        </p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error al cargar préstamos:', error);
    }
}

//Cargar favoritos

async function cargarFavoritos() {
    try {
        const respuesta = await fetch(`${API_URL}/api/favoritos`, {
            headers: {'authorization':  token}
        });

        const favoritos = await respuesta.json();
        const lista = document.getElementById('lista-favoritos');
        if (favoritos.length === 0) {
            lista.innerHTML = '<p class="sin-datos">No tienes favoritos</p>';
            return;
        }

        lista.innerHTML = '';
        favoritos.forEach(f => {
            lista.innerHTML += `
            <div class="tarjeta-libro" onclick="window.location.href='/pages/ficha-libro.html?id=${f.id_libro}'">
                <div class="tarjeta-portada">
                    <img class="img-portada" src="${f.portada_url}"
                    onerror="this.src='/assets/img/portada-default.webp'"/>
                </div>
                <div class="tarjeta-info">
                    <h3 class="tarjeta-titulo">${f.titulo}</h3>
                    <p class="tarjeta-autor">${f.autor}</p>
                </div>
            </div>
            `;
        });
    } catch (error) {
        console.error('Error al cargar favoritos:', error);
    }
}


cargarPrestamos();
cargarFavoritos();
