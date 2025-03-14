let preguntas = [
    {
        "pregunta": "¿Qué es la fotosíntesis?",
        "opciones": ["Un proceso de respiración", "Un proceso que convierte luz en energía", "Digestión en plantas", "Descomposición"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué molécula captura la luz?",
        "opciones": ["Glucosa", "Clorofila", "Oxígeno", "Agua"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿En qué organelo ocurre?",
        "opciones": ["Mitocondria", "Núcleo", "Cloroplasto", "Ribosoma"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué gas se libera?",
        "opciones": ["Dióxido de carbono", "Nitrógeno", "Oxígeno", "Hidrógeno"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué energía usa?",
        "opciones": ["Calor", "Luz solar", "Viento", "Electricidad"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué se produce para energía?",
        "opciones": ["Oxígeno", "Agua", "Glucosa", "Dióxido de carbono"],
        "respuesta_correcta": 2
    },
    {
        "pregunta": "¿Qué necesitan las plantas?",
        "opciones": ["Oxígeno y glucosa", "Agua y CO2", "Nitrógeno y oxígeno", "Glucosa y luz"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Dónde se captura la luz?",
        "opciones": ["Estroma", "Tilacoides", "Matriz", "Intermembrana"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Qué fase produce oxígeno?",
        "opciones": ["Ciclo de Calvin", "Fase luminosa", "Quimiosíntesis", "Fase oscura"],
        "respuesta_correcta": 1
    },
    {
        "pregunta": "¿Por qué es vital?",
        "opciones": ["Produce CO2", "Genera oxígeno y alimento", "Crea nitrógeno", "Elimina agua"],
        "respuesta_correcta": 1
    }
];

let posicion = 0;
let respuestas = new Array(preguntas.length);

function cargarpregunta(pos) {
    document.getElementById("titulo").innerText = `${pos + 1}/${preguntas.length} - ${preguntas[pos].pregunta}`;
    document.getElementById("opc1").innerText = preguntas[pos].opciones[0];
    document.getElementById("opc2").innerText = preguntas[pos].opciones[1];
    document.getElementById("opc3").innerText = preguntas[pos].opciones[2];
    document.getElementById("opc4").innerText = preguntas[pos].opciones[3];

    const opciones = document.getElementsByName('opciones');
    for (let opcion of opciones) {
        opcion.checked = false;
    }
    if (respuestas[pos] !== undefined) {
        opciones[respuestas[pos]].checked = true;
    }

    document.getElementById('batras').style.display = pos === 0 ? 'none' : 'block';
    document.getElementById('bavanzar').style.display = pos === preguntas.length - 1 ? 'none' : 'block';
    document.getElementById('bfinalizar').style.display = pos === preguntas.length - 1 ? 'block' : 'none';
}

function comenzar() {
    document.getElementById('welcome-card').classList.add('d-none');
    document.getElementById('quiz-card').classList.remove('d-none');
    cargarpregunta(posicion);
}

function avanzar() {
    if (posicion < preguntas.length - 1) {
        SeleccionadaOpcion();
        posicion += 1;
        cargarpregunta(posicion);
    }
}

function atras() {
    if (posicion > 0) {
        SeleccionadaOpcion();
        posicion -= 1;
        cargarpregunta(posicion);
    }
}

function SeleccionadaOpcion() {
    const opciones = document.getElementsByName('opciones');
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            respuestas[posicion] = parseInt(opciones[i].value);
            break;
        }
    }
}

function finalizar() {
    SeleccionadaOpcion();
    document.getElementById('quiz-card').classList.add('d-none');
    document.getElementById('resultados-card').classList.remove('d-none');
    
    let resultadosHTML = '';
    let correctas = 0;

    preguntas.forEach((pregunta, index) => {
        const respuestaUsuario = respuestas[index];
        const esCorrecta = respuestaUsuario === pregunta.respuesta_correcta;
        if (esCorrecta) correctas++;
        const clase = esCorrecta ? 'correcta' : 'incorrecta';
        
        resultadosHTML += `
            <div class="resultado-casilla ${clase}">
                ${index + 1}. ${pregunta.pregunta} - 
                ${respuestaUsuario !== undefined ? (esCorrecta ? 'Correcta' : 'Incorrecta') : 'No respondida'}
            </div>
        `;
    });

    const nota = (correctas / preguntas.length) * 100;
    resultadosHTML += `
        <div class="nota">
            Nota final: ${correctas}/${preguntas.length} (${nota.toFixed(2)}%)
        </div>
    `;
    
    document.getElementById('resultados-body').innerHTML = resultadosHTML;
}

function reiniciar() {
    posicion = 0;
    respuestas = new Array(preguntas.length);
    document.getElementById('resultados-card').classList.add('d-none');
    document.getElementById('welcome-card').classList.remove('d-none');
}

// Inicialización (pantalla de bienvenida visible por defecto)