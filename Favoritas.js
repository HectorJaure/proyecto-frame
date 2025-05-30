let tarjetaAEliminar = null;
let confirmacionModal = null;

document.addEventListener('DOMContentLoaded', function () {
    confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));

    document.getElementById('confirmarEliminar').addEventListener('click', function () {
        if (tarjetaAEliminar) {
            
            const tarjeta = tarjetaAEliminar.closest('.caja');
            const contenedor = document.getElementById('contenedor-categorias');

            
            tarjeta.style.transition = 'opacity 0.3s';
            tarjeta.style.opacity = '0';

            setTimeout(() => {
               
                if (tarjeta.parentElement.tagName === 'A') {
                    tarjeta.parentElement.remove();
                } else {
                    tarjeta.remove();
                }
            }, 300);

           
            confirmacionModal.hide();
        }
    });
});

function mostrarModalConfirmacion(boton) {
    tarjetaAEliminar = boton;
    confirmacionModal.show();
}