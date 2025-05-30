const correo = document.querySelector('#email');
const boton = document.querySelector('#enviar');
const error = document.querySelector('#error');
boton.addEventListener('click', Vcorreo);

function Vcorreo() {
    error.textContent = '';
    error.style.display = 'none';

    var c = correo.value;
    var filtro = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (c === "") {
        error.textContent = "Por favor coloque un correo";
        error.style.display = 'block';
        correo.focus();
        return 0;
    }

    if (!filtro.test(c)) {
        error.textContent = "Correo invalido";
        error.style.margin = '1.5rem 10rem ';
        error.style.display = 'block';
        correo.focus();
        return 0;
    }

    error.textContent = ("Se ha enviado un enlace de recuperación a su correo");
    error.style.margin = '1.5rem 2.5rem';
    error.style.color = 'green';
    error.style.display = 'block';
}
