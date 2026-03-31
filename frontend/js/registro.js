document.querySelector('.login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const respuesta = await fetch('http://localhost:3000/api/auth/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, contraseña })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert('Cuenta creada correctamente. Inicia sesión.');
            window.location.href = '/frontend/pages/login.html';
        } else {
            alert(datos.mensaje);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
});