document.getElementById("contacto-formulario").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;

    alert(`¡Gracias, ${nombre}! Hemos recibido tu mensaje y nos pondremos en contacto contigo al siguiente correo electrónico: ${email}.`);

    document.getElementById("contacto-formulario").reset();
});