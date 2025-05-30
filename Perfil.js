document.addEventListener('DOMContentLoaded', function() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!usuarioActual) {
        window.location.replace = "index.html";
        return;
    }

    document.querySelectorAll('.fila .dato')[0].textContent = usuarioActual.username;
    document.querySelectorAll('.fila .dato')[1].textContent = usuarioActual.email;

    document.getElementById('logout').addEventListener('click', function(e) {
        localStorage.removeItem('usuarioActual');
        window.location.replace = "index.html";
    });

});

let recetaAEliminar = null;
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));

function confirmarEliminar(id) {
    recetaAEliminar = id;
    confirmModal.show();
}

function eliminarReceta() {
    if (recetaAEliminar) {
        const receta = document.getElementById(`receta-${recetaAEliminar}`);
        if (receta) {
            receta.remove();
        }
    }
    confirmModal.hide();
}

document.getElementById('confirmDelete').addEventListener('click', eliminarReceta);


