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

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('usuarioActual');
    window.location.href = "index.html";
});


