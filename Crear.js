document.addEventListener('DOMContentLoaded', function() {
      const nombreReceta = document.getElementById('nombreReceta');
      const categoria = document.getElementById('categoria');
      const imagen = document.getElementById('imagen');
      const dificultad = document.getElementById('dificultad');
      const tiempo = document.getElementById('tiempo');
      const preparacion = document.getElementById('preparacion');
      const btnPublicar = document.getElementById('btnPublicar');
      const btnAgregarIngrediente = document.getElementById('btnAgregarIngrediente');
      const tablaIngredientes = document.getElementById('tablaIngredientes').getElementsByTagName('tbody')[0];
      const resultadoGeneral = document.getElementById('resultadoGeneral');

      btnAgregarIngrediente.addEventListener('click', function() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><input type="text" class="ingrediente-input ingrediente-nombre" placeholder="Nombre ingrediente"></td>
          <td><input type="text" class="ingrediente-input ingrediente-cantidad" placeholder="Cantidad"></td>
        `;
        
        const rows = tablaIngredientes.getElementsByTagName('tr');
        tablaIngredientes.insertBefore(newRow, rows[rows.length - 1]);
        
        newRow.querySelector('.btn-eliminar').addEventListener('click', function() {
          tablaIngredientes.removeChild(newRow);
        });
      });

      btnPublicar.addEventListener('click', validarFormulario);

      function validarFormulario() {
        let isValid = true;
        
        resetErrores();
        resultadoGeneral.className = 'resultados';
        resultadoGeneral.style.display = 'none';

        if (nombreReceta.value.trim().length < 4) {
          mostrarError('nombreError', 'El nombre debe tener al menos 4 caracteres');
          nombreReceta.classList.add('error-input');
          isValid = false;
        }

        if (categoria.value === "") {
          mostrarError('categoriaError', 'Selecciona una categoría');
          categoria.classList.add('error-input');
          isValid = false;
        }

        if (imagen.value === "") {
          mostrarError('imagenError', 'Selecciona una opción de imagen');
          imagen.classList.add('error-input');
          isValid = false;
        }

        if (dificultad.value === "") {
          mostrarError('dificultadError', 'Selecciona un nivel de dificultad');
          dificultad.classList.add('error-input');
          isValid = false;
        }

        if (tiempo.value === "") {
          mostrarError('tiempoError', 'Selecciona un tiempo estimado');
          tiempo.classList.add('error-input');
          isValid = false;
        }

        const ingredientesValidos = validarIngredientes();
        if (!ingredientesValidos) {
          isValid = false;
        }

        if (preparacion.value.trim().length < 20) {
          mostrarError('preparacionError', 'La preparación debe tener al menos 20 caracteres');
          preparacion.classList.add('error-input');
          isValid = false;
        }

        if (!isValid) {
          resultadoGeneral.textContent = "No se pudo subir la receta. Completa todos los campos correctamente.";
          resultadoGeneral.className = 'resultados error';
          resultadoGeneral.style.display = 'block';
          return false;
        } else {
          resultadoGeneral.textContent = "¡Receta publicada con éxito!";
          resultadoGeneral.className = 'resultados exito';
          resultadoGeneral.style.display = 'block';

          setTimeout(() => {
            document.getElementById('formReceta').submit();
          }, 2000);
          return true;
        }
      }

      function validarIngredientes() {
        const ingredientesNombre = document.querySelectorAll('.ingrediente-nombre');
        const ingredientesCantidad = document.querySelectorAll('.ingrediente-cantidad');
        let tieneIngredientesValidos = false;
        let todosValidos = true;

        ingredientesNombre.forEach((input, index) => {
          if (input.value.trim() === '' || ingredientesCantidad[index].value.trim() === '') {
            input.classList.add('error-input');
            ingredientesCantidad[index].classList.add('error-input');
            todosValidos = false;
          } else {
            tieneIngredientesValidos = true;
          }
        });

        if (!tieneIngredientesValidos) {
          mostrarError('ingredientesError', 'Debes agregar al menos un ingrediente válido');
          return false;
        }

        if (!todosValidos) {
          mostrarError('ingredientesError', 'Completa todos los ingredientes agregados');
          return false;
        }

        return true;
      }

      function mostrarError(id, mensaje) {
        const elemento = document.getElementById(id);
        if (elemento) {
          elemento.textContent = mensaje;
          elemento.style.display = 'block';
        }
      }

      function resetErrores() {
        const errores = document.querySelectorAll('.error-message, .ingredientes-error, .preparacion-error');
        errores.forEach(error => {
          error.textContent = '';
          error.style.display = 'none';
        });

        const inputsError = document.querySelectorAll('.error-input');
        inputsError.forEach(input => {
          input.classList.remove('error-input');
        });
      }

      nombreReceta.addEventListener('input', function() {
        if (this.value.trim().length >= 4) {
          document.getElementById('nombreError').style.display = 'none';
          this.classList.remove('error-input');
        }
      });

      categoria.addEventListener('change', function() {
        if (this.value !== "") {
          document.getElementById('categoriaError').style.display = 'none';
          this.classList.remove('error-input');
        }
      });
    });