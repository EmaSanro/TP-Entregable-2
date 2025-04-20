/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputFile = document.getElementById('inputFile');
const btnDescartar = document.getElementById('discard');
const btnGuardar = document.getElementById('save');

let mouseDown = false;
let pencil = new Pen(0, 0, ctx, 'black');
let eraser = new Eraser(0, 0, ctx);
let imagen = null

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  EVENTOS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// CUANDO SE PRESIONE EL MOUSE, SE CREARA UN LAPIZ
canvas.addEventListener('mousedown', (e) => {
    if(pencil != null) {
        pencil.setXY(e.offsetX, e.offsetY);
        eraser.setXY(e.offsetX, e.offsetY);
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
    }
})

// UNA VEZ SUELTO EL CLICK SE DEJARA DE DIBUJAR Y SE DESTRUIRA EL LAPIZ
canvas.addEventListener('mouseup', () => {
    mouseDown = false;
})

btnDescartar.addEventListener('click', descartar); // CUANDO SE HAGA CLICK EN EL BOTON DESCARTAR, SE LIMPIARA TODO EL CANVAS

inputFile.addEventListener('change', (e) => {
    limpiarCanvas();
    imagen.cargarImagen(e.target.files[0]);
});









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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function descartar() {
    limpiarCanvas();
    inputFile.value = '';
}