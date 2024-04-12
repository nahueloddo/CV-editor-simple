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

    // Guardar contenido de elementos clonados
    const elementosClonados = document.querySelectorAll('[data-id]');
    elementosClonados.forEach(elemento => {
        const id = elemento.getAttribute('data-id');
        const contenidoClonado = elemento.innerHTML;
        contenido[`contenidoClonado-${id}`] = contenidoClonado;
    });

    // Guardar contenido de textareas de fecha clonados
    const textareasClonadas = document.querySelectorAll('textarea[id^="fecha-textarea-"]');
    textareasClonadas.forEach(textarea => {
        const idUnico = textarea.id.split('-')[2]; // Extraer el identificador único del ID del textarea
        contenido[`fecha-${idUnico}`] = textarea.value; // Guardar el contenido del textarea con su identificador único
    });

    const contenidoJSON = JSON.stringify(contenido);
    localStorage.setItem('progreso', contenidoJSON);

    mostrarAlertaContenidoGuardado();
}

// Función para cargar el progreso más reciente
function cargarProgreso() {
    const contenidoJSON = localStorage.getItem('progreso');

    if (contenidoJSON) {
        const contenido = JSON.parse(contenidoJSON);

        // Cargar contenido de elementos clonados
        Object.keys(contenido).forEach(clave => {
            if (clave.startsWith('contenidoClonado-')) {
                const id = clave.split('-')[1];
                const elemento = document.querySelector(`[data-id="${id}"]`);
                if (elemento) {
                    elemento.innerHTML = contenido[clave];
                }
            }
        });

        // Cargar la fecha de cada textarea clonado
        const textareasClonadas = document.querySelectorAll('textarea[id^="fecha-textarea-"]');
        textareasClonadas.forEach(textarea => {
            const idUnico = textarea.id.split('-')[2]; // Extraer el identificador único del ID del textarea
            const fechaGuardada = contenido[`fecha-${idUnico}`]; // Suponiendo que el contenido guardado tiene una clave específica para cada fecha
            if (fechaGuardada) {
                textarea.value = fechaGuardada;
            }
        });        

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


    // Ocultar la alerta después de un tiempo
    setTimeout(function () {
        alerta.classList.add('hidden');
    }, 3000); // Ocultar después de 3 segundos (3000 milisegundos)
}

// Función para mostrar la alerta de progreso cargado correctamente
function mostrarAlertaProgresoCargado() {
    const alerta = document.getElementById('progresoCargado');
    alerta.classList.remove('hidden');

    // Ocultar la alerta después de un tiempo
    setTimeout(function () {
        alerta.classList.add('hidden');
    }, 3000); // Ocultar después de 3 segundos (3000 milisegundos)
}

// Función para mostrar la alerta de progreso no encontrado
function mostrarAlertaProgresoNoEncontrado() {
    const alerta = document.getElementById('progresoNoEncontrado');
    alerta.classList.remove('hidden');

    // Ocultar la alerta después de un tiempo
    setTimeout(function () {
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
const editorDivs = document.querySelectorAll('div[contenteditable="true"]');
editorDivs.forEach(editorDiv => {
    editorDiv.addEventListener("input", e => {
        // Establecer una altura mínima
        editorDiv.style.minHeight = '50px';
        // Ajustar la altura según el contenido
        editorDiv.style.height = 'auto'; // Permitir que el div se expanda
        editorDiv.style.height = (editorDiv.scrollHeight + 2) + 'px';

        // Aplicar el max-height solo si es necesario para evitar el desbordamiento
        const maxHeight = 150; // Establecer la altura máxima deseada
        if (editorDiv.scrollHeight > maxHeight) {
            editorDiv.style.overflowY = 'scroll'; // Hacer que el contenido sea desplazable verticalmente si excede la altura máxima
            editorDiv.style.maxHeight = maxHeight + 'px'; // Establecer la altura máxima
        } else {
            editorDiv.style.overflowY = 'hidden'; // Ocultar la barra de desplazamiento si el contenido no excede la altura máxima
            editorDiv.style.maxHeight = 'none'; // Permitir que el div se expanda más allá de la altura máxima si es necesario
        }
    });
});

// Para textareas de "Fecha"
const textareas = document.querySelectorAll('textarea[placeholder="Fecha (Ej: Marzo, 2020 - Agosto, 2023)"]');

textareas.forEach(textarea => {
    textarea.addEventListener("input", e => {
        textarea.style.height = 'auto'; // Permitir que el textarea se expanda
        textarea.style.height = (textarea.scrollHeight + 2) + 'px';
    });
});

// Para .editor-mini
const editorMiniDivs = document.querySelectorAll('.editor-mini');
editorMiniDivs.forEach(editorMiniDiv => {
    editorMiniDiv.addEventListener("input", e => {
        // Establecer una altura mínima
        editorMiniDiv.style.minHeight = '50px';
        // Ajustar la altura según el contenido
        editorMiniDiv.style.height = 'auto'; // Permitir que el div se expanda
        editorMiniDiv.style.height = (editorMiniDiv.scrollHeight + 2) + 'px';

        // Aplicar el max-height solo si es necesario para evitar el desbordamiento
        const maxHeight = 120; // Establecer la altura máxima deseada
        if (editorMiniDiv.scrollHeight > maxHeight) {
            editorMiniDiv.style.overflowY = 'scroll'; // Hacer que el contenido sea desplazable verticalmente si excede la altura máxima
            editorMiniDiv.style.maxHeight = maxHeight + 'px'; // Establecer la altura máxima
        } else {
            editorMiniDiv.style.overflowY = 'hidden'; // Ocultar la barra de desplazamiento si el contenido no excede la altura máxima
            editorMiniDiv.style.maxHeight = 'none'; // Permitir que el div se expanda más allá de la altura máxima si es necesario
        }
    });
});

function agregarFechaContenido(boton) {
    const contenedor = boton.parentElement;
    const nuevoContenido = contenedor.cloneNode(true);

    // Asignar un identificador único a cada elemento clonado
    const identificadorUnico = Date.now(); // O cualquier otro método para generar un identificador único
    nuevoContenido.setAttribute('data-id', identificadorUnico);

    // Vaciar los textarea clonados y asignarles un identificador único
    const textareasClonados = nuevoContenido.querySelectorAll('textarea');
    textareasClonados.forEach(textarea => {
        textarea.value = ''; // Vaciar contenido
        // Asignar un identificador único al textarea clonado
        const idUnicoTextarea = `fecha-textarea-${identificadorUnico}`;
        textarea.id = idUnicoTextarea;
    });

    // Vaciar los div con clase 'editor' clonados y agregar placeholder
    const editoresClonados = nuevoContenido.querySelectorAll('.editor');
    editoresClonados.forEach(editor => {
        editor.innerHTML = ''; // Vaciar contenido

        // Agregar el placeholder al editor clonado
        const placeholder = document.createElement('span');
        placeholder.classList.add('placeholder');
        placeholder.textContent = 'Escribe aquí...';
        editor.appendChild(placeholder);
    });

    // Insertar el bloque clonado en el DOM
    contenedor.parentNode.insertBefore(nuevoContenido, contenedor.nextSibling);

    // Inicializar CKEditor en los bloques clonados
    const editoresClonadosArray = Array.from(editoresClonados);
    editoresClonadosArray.forEach(editor => {
        CKEDITOR.inline(editor);
    });

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