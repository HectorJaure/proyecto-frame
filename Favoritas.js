// Variables para guardar la tarjeta a eliminar
let tarjetaAEliminar = null;
let confirmacionModal = null;

// Inicializar el modal cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));

    // Configurar el botón de confirmar eliminación
    document.getElementById('confirmarEliminar').addEventListener('click', function () {
        if (tarjetaAEliminar) {
            // Eliminar la tarjeta
            const tarjeta = tarjetaAEliminar.closest('.caja');
            const contenedor = document.getElementById('contenedor-categorias');

            // Animación de desvanecimiento antes de eliminar
            tarjeta.style.transition = 'opacity 0.3s';
            tarjeta.style.opacity = '0';

            setTimeout(() => {
                // Si la tarjeta está dentro de un enlace, eliminamos el enlace
                if (tarjeta.parentElement.tagName === 'A') {
                    tarjeta.parentElement.remove();
                } else {
                    tarjeta.remove();
                }
            }, 300);

            // Cerrar el modal
            confirmacionModal.hide();
        }
    });
});

// Función para mostrar el modal de confirmación
function mostrarModalConfirmacion(boton) {
    tarjetaAEliminar = boton;
    confirmacionModal.show();
}