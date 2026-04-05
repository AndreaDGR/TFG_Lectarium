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

    //Footer
    const footer = await fetch('/frontend/componentes/footer.html');
    const footerHTML = await footer.text();
    document.getElementById('footer').innerHTML = footerHTML;
}

cargarComponentes();