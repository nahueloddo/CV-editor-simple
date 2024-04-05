// Función para verificar campos antes de imprimir y guardar
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
        setTimeout(function () {
            advertencia.classList.add('hidden');
        }, 3000);        
    } else {
        advertencia.classList.add('hidden');
        window.print(); // Imprimir la página
    }
}

// Función para ocultar alertas y botones antes de guardar el PDF
function ocultarAlertasYBotones() {
    ocultarAlertaContenidoGuardado();
    ocultarAlertaProgresoCargado();
    ocultarAlertaProgresoNoEncontrado();
    ocultarBotonesProgreso();
}

// Función para mostrar alertas y botones después de guardar el PDF
function mostrarAlertasYBotones() {
    mostrarBotonesProgreso();
}

// Función para guardar el progreso
function guardarProgreso() {
    const contenido = {
        imagenFoto: document.getElementById('imagen-foto').value,
        fechaNacimiento: document.getElementById('fecha-nacimiento').value,
        ubicacion: document.getElementById('ubicacion').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        extracto: document.getElementById('extracto').innerHTML,
        fecha1: document.getElementById('fecha-1').value,
        contenido1: document.getElementById('contenido-1').innerHTML,
        fecha2: document.getElementById('fecha-2').value,
        contenido2: document.getElementById('contenido-2').innerHTML,
        otrosConocimientos: document.getElementById('otros-conocimientos').innerHTML,
        referencias: document.getElementById('referencias').innerHTML,
        remuneracionPretendida: document.getElementById('remuneracion-pretendida').innerHTML
    };

    const contenidoJSON = JSON.stringify(contenido);
    localStorage.setItem('progreso', contenidoJSON);

    mostrarAlertaContenidoGuardado();
}

// Función para cargar el progreso más reciente
function cargarProgreso() {
    const contenidoJSON = localStorage.getItem('progreso');

    if (contenidoJSON) {
        const contenido = JSON.parse(contenidoJSON);

        document.getElementById('imagen-foto').value = contenido.imagenFoto;
        document.getElementById('fecha-nacimiento').value = contenido.fechaNacimiento;
        document.getElementById('ubicacion').value = contenido.ubicacion;
        document.getElementById('email').value = contenido.email;
        document.getElementById('telefono').value = contenido.telefono;
        document.getElementById('extracto').innerHTML = contenido.extracto;
        document.getElementById('fecha-1').value = contenido.fecha1;
        document.getElementById('contenido-1').innerHTML = contenido.contenido1;
        document.getElementById('fecha-2').value = contenido.fecha2;
        document.getElementById('contenido-2').innerHTML = contenido.contenido2;
        document.getElementById('otros-conocimientos').innerHTML = contenido.otrosConocimientos;
        document.getElementById('referencias').innerHTML = contenido.referencias;
        document.getElementById('remuneracion-pretendida').innerHTML = contenido.remuneracionPretendida;

        mostrarAlertaProgresoCargado();
    } else {
        mostrarAlertaProgresoNoEncontrado();
    }
}

// Función para mostrar la alerta de contenido guardado exitosamente
function mostrarAlertaContenidoGuardado() {
    const alerta = document.getElementById('contenidoGuardado');
    alerta.classList.remove('hidden');
}

// Función para ocultar la alerta de contenido guardado exitosamente
function ocultarAlertaContenidoGuardado() {
    const alerta = document.getElementById('contenidoGuardado');
    alerta.classList.add('hidden');
    // Ocultar la alerta después de un tiempo
    setTimeout(function() {
        alerta.classList.add('hidden');
    }, 3000); // Ocultar después de 3 segundos (3000 milisegundos)
}


// Función para mostrar la alerta de progreso cargado correctamente
function mostrarAlertaProgresoCargado() {
    const alerta = document.getElementById('progresoCargado');
    alerta.classList.remove('hidden');
}

// Función para ocultar la alerta de progreso cargado correctamente
function ocultarAlertaProgresoCargado() {
    const alerta = document.getElementById('progresoCargado');
    alerta.classList.add('hidden');
    // Ocultar la alerta después de un tiempo
    setTimeout(function() {
        alerta.classList.add('hidden');
    }, 3000); // Ocultar después de 3 segundos (3000 milisegundos)
}

// Función para mostrar la alerta de progreso no encontrado
function mostrarAlertaProgresoNoEncontrado() {
    const alerta = document.getElementById('progresoNoEncontrado');
    alerta.classList.remove('hidden');
}

// Función para ocultar la alerta de progreso no encontrado
function ocultarAlertaProgresoNoEncontrado() {
    const alerta = document.getElementById('progresoNoEncontrado');
    alerta.classList.add('hidden');
    // Ocultar la alerta después de un tiempo
    setTimeout(function() {
        alerta.classList.add('hidden');
    }, 3000); // Ocultar después de 3 segundos (3000 milisegundos)
}

// Función para mostrar botones de progreso
function mostrarBotonesProgreso() {
    const botones = document.querySelectorAll('.guardarProgreso, .cargarProgreso');
    botones.forEach(boton => {
        boton.classList.remove('hidden');
    });
}

// Función para ocultar botones de progreso
function ocultarBotonesProgreso() {
    const botones = document.querySelectorAll('.guardarProgreso, .cargarProgreso');
    botones.forEach(boton => {
        boton.classList.add('hidden');
    });
}

function eliminarContenido() {
    // Obtener todos los elementos editables
    const editables = document.querySelectorAll('.editor');

    // Obtener todos los elementos textarea
    const textareas = document.querySelectorAll('textarea');

    // Iterar sobre cada elemento editable
    editables.forEach(editable => {
        // Reemplazar el contenido con el marcador de posición
        const placeholder = document.createElement('span');
        placeholder.classList.add('placeholder');
        placeholder.textContent = 'Escribe aquí...';
        editable.innerHTML = ''; // Limpiar contenido existente
        editable.appendChild(placeholder); // Agregar marcador de posición
    });

    // Iterar sobre cada textarea y borrar su contenido
    textareas.forEach(textarea => {
        textarea.value = ''; // Borrar contenido
    });

    // Mostrar alerta de contenido eliminado
    const contenidoEliminado = document.getElementById('contenidoEliminado');
    contenidoEliminado.classList.remove('hidden');

    // Ocultar la alerta después de un tiempo
    setTimeout(function () {
        contenidoEliminado.classList.add('hidden');
    }, 3000); // Ocultar después de 3 segundos (3000 milisegundos)
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
    reader.onload = function (e) {
        const foto = document.getElementById('imagen-foto');
        foto.src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
}

document.addEventListener('DOMContentLoaded', function () {
    var editors = document.querySelectorAll('.editor');

    editors.forEach(function (editor) {
        var placeholder = editor.querySelector('.placeholder');

        editor.addEventListener('focus', function () {
            if (editor.textContent === placeholder.textContent) {
                editor.textContent = '';
                editor.classList.remove('empty');
            }
        });

        editor.addEventListener('blur', function () {
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