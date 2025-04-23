/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputFile = document.getElementById('inputFile');
const btnDescartar = document.getElementById('discard');
const btnGuardar = document.getElementById('save');
const btnPencil = document.getElementById('lapiz');
const btnMarker = document.getElementById('fibra');
const btnGoma = document.getElementById('goma');
const sizeGoma = document.getElementById('range');
const colors = document.querySelectorAll('.colors');
const colorWheel = document.getElementById('color-wheel');
const filtros = document.querySelectorAll('.filtros');

let mouseDown = false;
let pencil = null;
let eraser = null;
let marker = null;
let imagen = null;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  EVENTOS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

btnDescartar.addEventListener('click', descartar); // CUANDO SE HAGA CLICK EN EL BOTON DESCARTAR, SE LIMPIARA TODO EL CANVAS
btnGuardar.addEventListener('click', guardar);

btnPencil.addEventListener('click', crearLapiz); //AL CLICKEAR EN EL BOTON DEL LAPIZ, SE CREA EL OBJETO PARA EMPEZAR A DIBUJAR
btnGoma.addEventListener('click', crearGoma); // AL CLICKEAR EN LA GOMA SE CREA EL OBJETO PARA BORRAR

btnMarker.addEventListener('click', crearFibron);

// CUANDO SE PRESIONE EL MOUSE, SE CREARA UN LAPIZ
canvas.addEventListener('mousedown', (e) => {
    if(pencil != null) {
        pencil.setXY(e.offsetX, e.offsetY);
    } else if(eraser != null) {
        eraser.setXY(e.offsetX, e.offsetY);
    } else if(marker != null) {
        marker.setXY(e.offsetX, e.offsetY);
    }
    mouseDown = true;
})

// MIENTRAS SE ESTE PRESIONADO EL CLICK DEL MOUSE, SE DIBUJARA UNA LINEA
canvas.addEventListener('mousemove', (e) => {
    if(mouseDown && pencil != null) {
        pencil.moveTo(e.offsetX, e.offsetY);
        pencil.draw();
    } else if(mouseDown && eraser != null) {
        eraser.moveTo(e.offsetX, e.offsetY);
        eraser.delete();
    } else if(mouseDown && marker != null) {
        marker.moveTo(e.offsetX, e.offsetY);
        marker.draw();
    }
})

// UNA VEZ SUELTO EL CLICK SE DEJARA DE DIBUJAR Y SE DESTRUIRA EL LAPIZ
canvas.addEventListener('mouseup', () => {
    mouseDown = false;
})

canvas.addEventListener('mouseleave', () => {
    mouseDown = false;
})


inputFile.addEventListener('change', (e) => {
    limpiarCanvas();
    imagen.cargarImagen(e.target.files[0]);
});

sizeGoma.addEventListener('change', () => {
    if(eraser == null) {
        crearGoma();
    }
    eraser.setSize(sizeGoma.value);
})

for (const color of colors) {
    color.addEventListener('click', () => {
        if(pencil != null) {
            pencil.setColor(color.getAttribute('value'));
        } else if (marker != null) {
            marker.setColor(color.getAttribute('value'));
        }
    });
}

colorWheel.addEventListener('change', () => {
    if(pencil != null) {
        pencil.setColor(colorWheel.value);
    } else if(marker != null) {
        marker.setColor(colorWheel.value);
    }
})

for (const filtro of filtros) {
    filtro.addEventListener('click', () => {
        imagen.setImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
        switch(filtro.value) {
            case 'escalaGrises': {
                let escalaGrises = new EscalaGrises(ctx, imagen.getImageData(), canvas.width, canvas.height);
                escalaGrises.aplicarFiltro();
            };break;
            case 'negativo': {
                let negativo = new Negativo(ctx, imagen.getImageData(), canvas.width, canvas.height);
                negativo.aplicarFiltro();
            };break;
            case 'brillo': {
                let brillo = new Brillo(ctx, imagen.getImageData(), canvas.width, canvas.height);
                brillo.aplicarFiltro();
            };break;
        }
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FUNCIONES PRINCIPALES
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function main() {
    dibujarCanvas();
    imagen = new Imagen(ctx, canvas.width, canvas.height);
}

function dibujarCanvas() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    ctx.closePath();
}

function limpiarCanvas() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    dibujarCanvas();
}

function crearLapiz() {
    if(pencil == null) {
        eraser = null;
        marker = null;
        btnGoma.classList.remove('toolActive');
        btnMarker.classList.remove('toolActive');
        btnPencil.classList.add('toolActive');
        canvas.classList.add('cursorLapiz');
        canvas.classList.remove('cursorGoma');
        canvas.classList.remove('cursorFibron');
        pencil = new Pen(0, 0, ctx, 'black');
    } else {
        pencil = null;
        btnPencil.classList.remove('toolActive');
        canvas.classList.remove('cursorLapiz');
    }
}

function crearGoma() {
    if(eraser == null) {
        pencil = null;
        marker = null;
        btnPencil.classList.remove('toolActive');
        btnMarker.classList.remove('toolActive');
        btnGoma.classList.add('toolActive');
        canvas.classList.remove('cursorLapiz');
        canvas.classList.remove('cursorFibron');
        canvas.classList.add('cursorGoma');
        eraser = new Eraser(0, 0, sizeGoma.value, ctx);
    }else {
        eraser = null;
        btnGoma.classList.remove('toolActive');
        canvas.classList.remove('cursorGoma');
    }
}

function crearFibron() {
    if(marker == null) {
        eraser = null;
        pencil = null;
        btnGoma.classList.remove('toolActive');
        btnPencil.classList.remove('toolActive');
        btnMarker.classList.add('toolActive');
        canvas.classList.remove('cursorGoma');
        canvas.classList.remove('cursorLapiz');
        canvas.classList.add('cursorFibron');
        marker = new Marker(0, 0, ctx, 'black');
    } else {
        marker = null;
        btnMarker.classList.remove('toolActive');
        canvas.classList.remove('cursorFibron');
    }
}

function guardar() {
    const imageData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = imageData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function descartar() {
    limpiarCanvas();
    inputFile.value = '';
}