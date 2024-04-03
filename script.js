    function verificarCampos() {
    const textareas = document.querySelectorAll('textarea');
    let camposVacios = false;

    textareas.forEach(textarea => {
        const texto = textarea.value.trim();
        if (!texto) {
            camposVacios = true;
        }
    });

    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            camposVacios = true;
        }
    });

    const advertencia = document.getElementById('advertencia');
    if (camposVacios) {
        advertencia.classList.remove('hidden');
    } else {
        advertencia.classList.add('hidden');
        window.print(); // Imprimir la página
    }
}
// Obtener todos los elementos editables
const editables = document.querySelectorAll('.editor');

// Agregar evento focus para cambiar el color del texto cuando el usuario está escribiendo
editables.forEach(editable => {
    editable.addEventListener('focus', () => {
        editable.style.color = '#111'; // Cambiar el color del texto cuando se enfoca
    });

    // Agregar evento blur para restaurar el color del placeholder si el contenido está vacío
    editable.addEventListener('blur', () => {
        if (editable.textContent.trim() === '') {
            editable.style.color = 'gray'; // Restaurar el color del placeholder si el contenido está vacío
        }
    });

    // Agregar evento input para detectar cambios en el contenido y mantener el color del texto
    editable.addEventListener('input', () => {
        if (editable.textContent.trim() !== '') {
            editable.style.color = '#111'; // Mantener el color del texto si hay contenido
        }
    });
});
// Para .editor
const editorDiv = document.querySelector('.editor');
editorDiv.addEventListener("input", e => {
    editorDiv.style.height = '50px'; // Establecer una altura mínima
    editorDiv.style.height = (editorDiv.scrollHeight + 2) + 'px'; // Ajustar la altura según el contenido

    // Aplicar el max-height
    const maxHeight = 150; // Establecer la altura máxima deseada
    if (editorDiv.scrollHeight > maxHeight) {
        editorDiv.style.overflowY = 'scroll'; // Hacer que el contenido sea desplazable verticalmente si excede la altura máxima
        editorDiv.style.height = maxHeight + 'px'; // Establecer la altura máxima
    } else {
        editorDiv.style.overflowY = 'hidden'; // Ocultar la barra de desplazamiento si el contenido no excede la altura máxima
    }
});

// Para textareas de "Fecha"
const textareas = document.querySelectorAll('textarea[placeholder="Fecha"]');

textareas.forEach(textarea => {
    textarea.addEventListener("input", e => {
        textarea.style.height = '50px';
        textarea.style.height = (textarea.scrollHeight + 2) + 'px';
    });
});

// Para .editor-mini
const editorMiniDiv = document.querySelector('.editor-mini');
editorMiniDiv.addEventListener("input", e => {
    editorMiniDiv.style.height = '50px'; // Establecer una altura mínima
    editorMiniDiv.style.height = (editorMiniDiv.scrollHeight + 2) + 'px'; // Ajustar la altura según el contenido

    // Aplicar el max-height
    const maxHeight = 120; // Establecer la altura máxima deseada
    if (editorMiniDiv.scrollHeight > maxHeight) {
        editorMiniDiv.style.overflowY = 'scroll'; // Hacer que el contenido sea desplazable verticalmente si excede la altura máxima
        editorMiniDiv.style.height = maxHeight + 'px'; // Establecer la altura máxima
    } else {
        editorMiniDiv.style.overflowY = 'hidden'; // Ocultar la barra de desplazamiento si el contenido no excede la altura máxima
    }
});
        
function agregarFechaContenido(boton) {
    const contenedor = boton.parentElement;
    const nuevoContenido = contenedor.cloneNode(true);
    
    // Vaciar el contenido clonado
    const editorClonado = nuevoContenido.querySelector('.editor');
    editorClonado.innerHTML = ''; // Vaciar el contenido

    // Agregar el placeholder al editor clonado
    const placeholder = document.createElement('span');
    placeholder.classList.add('placeholder');
    placeholder.textContent = 'Escribe aquí...';
    editorClonado.appendChild(placeholder);

    // Insertar el bloque clonado en el DOM
    contenedor.parentNode.insertBefore(nuevoContenido, contenedor.nextSibling);

    // Inicializar CKEditor en el bloque clonado
    CKEDITOR.inline(editorClonado);

    // Mostrar el botón de eliminar
    const botonEliminar = nuevoContenido.querySelector('.boton-eliminar');
    botonEliminar.classList.remove('invisible');
}

function eliminarFechaContenido(boton) {
    const contenedor = boton.parentElement;
    contenedor.remove();

    // Oculta el botón de eliminar solo si no hay más elementos en el contenedor
    if (contenedor.parentNode.children.length === 1) {
        const botonEliminar = contenedor.querySelector('.boton-eliminar');
        botonEliminar.classList.add('invisible');
    }
}

        function mostrarFoto(input) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const foto = document.getElementById('imagen-foto');
                foto.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
        document.addEventListener('DOMContentLoaded', function() {
            var editors = document.querySelectorAll('.editor');

            editors.forEach(function(editor) {
                var placeholder = editor.querySelector('.placeholder');

                editor.addEventListener('focus', function() {
                    if (editor.textContent === placeholder.textContent) {
                        editor.textContent = '';
                        editor.classList.remove('empty');
                    }
                });

                editor.addEventListener('blur', function() {
                    if (editor.textContent === '') {
                        editor.textContent = placeholder.textContent;
                        editor.classList.add('empty');
                    }
                });

                // Inicialmente, si el editor está vacío, mostramos el placeholder
                if (editor.textContent === '') {
                    editor.textContent = placeholder.textContent;
                    editor.classList.add('empty');
                }
            });
        });

        // Inicializa CKEditor para cada div con clase "editor"
        CKEDITOR.replace('extracto .editor');
        CKEDITOR.replace('trayectoria-laboral .editor');
        CKEDITOR.replace('formacion-educativa .editor');
        CKEDITOR.replace('otros-conocimientos .editor');
        CKEDITOR.replace('referencias .editor');
        CKEDITOR.replace('remuneracion-pretendida .editor');