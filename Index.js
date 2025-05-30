document.addEventListener('DOMContentLoaded', function() {
    const nombre = document.querySelector('#username');
    const contraseña = document.querySelector('#password');
    const entrar = document.querySelector('#entrar');
    const error = document.querySelector('#error');

    entrar.addEventListener('click', valida_entrada);

    function valida_entrada() {
        error.textContent = '';
        error.style.display = 'none';
        
        // Validar campos vacíos
        if (nombre.value.trim() === "" || contraseña.value.trim() === "") {
            mostrarError("Por favor, ingrese ambos campos.");
            return;
        }
        
        // Obtener usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Buscar usuario (por nombre de usuario o email)
        const usuarioValido = usuarios.find(user => 
            (user.username === nombre.value.trim() || user.email === nombre.value.trim()) && 
            user.password === contraseña.value.trim()
        );
        
        // Credenciales de respaldo (puedes eliminarlas en producción)
        const credencialesRespaldo = (
            nombre.value.trim() === "22050029" && 
            contraseña.value.trim() === "12345"
        );

        if (usuarioValido || credencialesRespaldo) {
            // Almacenar sesión
            if (usuarioValido) {
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioValido));
            } else {
                // Para el usuario de respaldo
                localStorage.setItem('usuarioActual', JSON.stringify({
                    username: "22050029",
                    email: "admin@example.com",
                    password: "12345"
                }));
            }
            
            // Redirigir
            window.location.href = "inicio.html";
        } else {
            mostrarError("Usuario o contraseña incorrectos.");
            contraseña.value = "";
            contraseña.focus();
        }
    }

    function mostrarError(mensaje) {
        error.textContent = mensaje;
        error.style.display = 'block';
        error.style.color = '#dc3545'; 
    }

    nombre.addEventListener('input', function() {
        if (this.value.trim() !== "") {
            error.style.display = 'none';
        }
    });

    contraseña.addEventListener('input', function() {
        if (this.value.trim() !== "") {
            error.style.display = 'none';
        }
    });
});