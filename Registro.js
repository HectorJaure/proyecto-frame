document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const username = document.getElementById('username');
    const correo = document.getElementById('correo');
    const password = document.getElementById('password');
    const confPassword = document.getElementById('Confpassword');
    const btnRegistro = document.getElementById('Registro');
    const errorGeneral = document.getElementById('errorGeneral');

    username.addEventListener('input', validarUsername);
    correo.addEventListener('input', validarCorreo);
    password.addEventListener('input', validarPassword);
    confPassword.addEventListener('input', validarConfPassword);

    function validarUsername() {
        if (this.value.trim().length < 4) {
            usernameError.textContent = 'El nombre de usuario debe tener al menos 4 caracteres';
            usernameError.style.display = 'block';
            usernameError.style.margin = 'auto auto -1.5rem';
            this.classList.add('is-invalid');
            return false;
        } else {
            usernameError.style.display = 'none';
            this.classList.remove('is-invalid');
            return true;
        }
    }

    function validarCorreo() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(this.value)) {
            correoError.textContent = 'Ingresa un correo electrónico válido';
            correoError.style.display = 'block';
            correoError.style.margin = 'auto auto -1.5rem';
            this.classList.add('is-invalid');
            return false;
        } else {
            correoError.style.display = 'none';
            this.classList.remove('is-invalid');
            return true;
        }
    }

    function validarPassword() {
        if (this.value.length < 8) {
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
            passwordError.style.display = 'block';
            passwordError.style.margin = 'auto auto -1.5rem';
            this.classList.add('is-invalid');
            return false;
        } else {
            passwordError.style.display = 'none';
            this.classList.remove('is-invalid');
            return true;
        }
    }

    function validarConfPassword() {
        if (this.value === '') {
            confPasswordError.textContent = 'Colocar la contraseña de confirmación';
            confPasswordError.style.display = 'block';
            confPasswordError.style.margin = 'auto auto -1.5rem';
            this.classList.add('is-invalid');
            return false;
        }

        if (this.value !== password.value) {
            confPasswordError.textContent = 'Las contraseñas no coinciden';
            confPasswordError.style.display = 'block';
            this.classList.add('is-invalid');
            return false;
        }

        confPasswordError.style.display = 'none';
        this.classList.remove('is-invalid');
        return true;
    }
    function almacenarUsuario(usuario) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    btnRegistro.addEventListener('click', function (e) {
        e.preventDefault();

        const validoUsername = validarUsername.call(username);
        const validoCorreo = validarCorreo.call(correo);
        const validoPassword = validarPassword.call(password);
        const validoConfPassword = validarConfPassword.call(confPassword);

        if (validoUsername && validoCorreo && validoPassword && validoConfPassword) {
            const usuario = {
                username: username.value.trim(),
                email: correo.value.trim(),
                password: password.value
            };

            almacenarUsuario(usuario);

            errorGeneral.textContent = '¡Registro exitoso! Redirigiendo...';
            errorGeneral.style.color = '#28a745';
            errorGeneral.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            const primerError = document.querySelector('.is-invalid');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .is-invalid {
            border-color: #dc3545 !important;
        }
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 5px;
            display: none;
        }
    `;
    document.head.appendChild(style);
});