async function cargarComponentes() {
    //Header

    const header = await fetch('/frontend/componentes/header.html');
    const headerHTML = await header.text();
    document.getElementById('header').innerHTML = headerHTML;

    //Footer
    const footer = await fetch('/frontend/componentes/footer.html');
    const footerHTML = await footer.text();
    document.getElementById('footer').innerHTML = footerHTML;
}

cargarComponentes();