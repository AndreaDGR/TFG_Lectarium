async function cargarComponentes() {
    //Header

    const header = await fetch('/frontend/componentes/header.html');
    const headerHTML = await header.text();
    document.getElementById('header').innerHTML = headerHTML;

    const token = localStorage.getItem('token');
    const btnLogin = document.getElementById('btn-login');
    const btnRegistro = document.getElementById('btn-registro');
    const btnPerfil = document.getElementById('btn-perfil');

    if (token) {
        btnLogin.style.display = 'none';
        btnRegistro.style.display = 'none';
        btnPerfil.style.setProperty('display', 'inline-block', 'important');
    }

    //Menú hamburguesa
    const btnHamburguesa = document.getElementById('btn-hamburguesa');
    const navegacion = document.querySelector('.navegacion');

    if (btnHamburguesa) {
        btnHamburguesa.addEventListener('click', () => {
            navegacion.classList.toggle('activo');
        });
    }

    const btnLoginMovil = document.getElementById('btn-login-movil');
    const btnRegistroMovil = document.getElementById('btn-registro-movil');
    const btnPerfilMovil = document.getElementById('btn-perfil-movil');

    if (token) {
        if (btnLoginMovil) btnLoginMovil.style.display = 'none';
        if (btnRegistroMovil) btnRegistroMovil.style.display = 'none';
        if (btnPerfilMovil) btnPerfilMovil.style.setProperty('display', 'block', 'important');
    }

    //Footer
    const footer = await fetch('/frontend/componentes/footer.html');
    const footerHTML = await footer.text();
    document.getElementById('footer').innerHTML = footerHTML;
}

cargarComponentes();