// Contacto.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const ciudad = document.getElementById('ciudad');
    const mensaje = document.getElementById('mensaje');
    
    // Crear elemento para mensajes generales
    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = 'resultado-validacion';
    resultadoDiv.style.textAlign = 'center';
    resultadoDiv.style.margin = '20px 0';
    resultadoDiv.style.padding = '15px';
    resultadoDiv.style.borderRadius = '5px';
    resultadoDiv.style.display = 'none';
    form.parentNode.insertBefore(resultadoDiv, form.nextSibling);
    
    // Añadir elementos de error para cada campo
    function crearMensajeError(campo, mensaje) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.textContent = mensaje;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875em';
        errorDiv.style.marginTop = '-10px';
        errorDiv.style.marginBottom = '15px';
        errorDiv.style.display = 'none';
        campo.parentNode.appendChild(errorDiv);
        return errorDiv;
    }
    
    const nombreError = crearMensajeError(nombre, 'El nombre debe tener al menos 3 caracteres');
    const emailError = crearMensajeError(email, 'Ingresa un correo electrónico válido');
    const telefonoError = crearMensajeError(telefono, 'El teléfono debe tener 10 dígitos (opcional)');
    const ciudadError = crearMensajeError(ciudad, 'Selecciona una ciudad válida (opcional)');
    const mensajeError = crearMensajeError(mensaje, 'El mensaje debe tener al menos 20 caracteres');
    
    // Validación en tiempo real
    nombre.addEventListener('input', function() {
        if (this.value.trim().length >= 3) {
            this.classList.remove('is-invalid');
            nombreError.style.display = 'none';
        }
    });
    
    email.addEventListener('input', function() {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            this.classList.remove('is-invalid');
            emailError.style.display = 'none';
        }
    });
    
    telefono.addEventListener('input', function() {
        // Solo validar si hay contenido (campo opcional)
        if (!this.value || /^\d{10}$/.test(this.value)) {
            this.classList.remove('is-invalid');
            telefonoError.style.display = 'none';
        }
    });
    
    ciudad.addEventListener('input', function() {
        const ciudadesValidas = ['Zacatecas', 'Aguascalientes', 'Ciudad de México', 'Monterrey', 'Veracruz'];
        // Solo validar si hay contenido (campo opcional)
        if (!this.value || ciudadesValidas.includes(this.value)) {
            this.classList.remove('is-invalid');
            ciudadError.style.display = 'none';
        }
    });
    
    mensaje.addEventListener('input', function() {
        if (this.value.trim().length >= 20) {
            this.classList.remove('is-invalid');
            mensajeError.style.display = 'none';
        }
    });
    
    // Validación al enviar el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Limpiar errores anteriores
        resultadoDiv.style.display = 'none';
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.error-mensaje').forEach(el => el.style.display = 'none');
        
        // Validar nombre (requerido)
        if (nombre.value.trim().length < 3) {
            nombre.classList.add('is-invalid');
            nombreError.style.display = 'block';
            isValid = false;
        }
        
        // Validar email (requerido)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('is-invalid');
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validar teléfono (opcional - solo si tiene contenido)
        if (telefono.value && !/^\d{10}$/.test(telefono.value)) {
            telefono.classList.add('is-invalid');
            telefonoError.style.display = 'block';
            isValid = false;
        }
        
        // Validar ciudad (opcional - solo si tiene contenido)
        const ciudadesValidas = ['Zacatecas', 'Aguascalientes', 'Ciudad de México', 'Monterrey', 'Veracruz'];
        if (ciudad.value && !ciudadesValidas.includes(ciudad.value)) {
            ciudad.classList.add('is-invalid');
            ciudadError.style.display = 'block';
            isValid = false;
        }
        
        // Validar mensaje (requerido)
        if (mensaje.value.trim().length < 20) {
            mensaje.classList.add('is-invalid');
            mensajeError.style.display = 'block';
            isValid = false;
        }
        
        // Mostrar resultado
        if (!isValid) {
            resultadoDiv.textContent = 'No se pudo enviar el formulario. Por favor, corrige los errores.';
            resultadoDiv.style.backgroundColor = '#ffebee';
            resultadoDiv.style.color = '#dc3545';
            resultadoDiv.style.display = 'block';
            
            // Desplazarse al primer error
            const primerError = document.querySelector('.is-invalid');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            resultadoDiv.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
            resultadoDiv.style.backgroundColor = '#e8f5e9';
            resultadoDiv.style.color = '#2e7d32';
            resultadoDiv.style.display = 'block';
            
            // Opcional: Resetear el formulario después de 3 segundos
            setTimeout(() => {
                form.reset();
                resultadoDiv.style.display = 'none';
            }, 5000);
            
            // Aquí podrías enviar el formulario realmente
            // form.submit();
        }
    });
    
    // Añadir estilos para inputs inválidos
    const style = document.createElement('style');
    style.textContent = `
        .is-invalid {
            border-color: #dc3545 !important;
        }
        .error-mensaje {
            color: #dc3545;
            font-size: 0.875em;
            margin-top: -10px;
            margin-bottom: 15px;
            display: none;
        }
    `;
    document.head.appendChild(style);
});