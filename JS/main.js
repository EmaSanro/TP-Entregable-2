/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let mouseDown = false;
let pencil = new Pen(0, 0, ctx, 'black');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  EVENTOS DEL MOUSE
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// CUANDO SE PRESIONE EL MOUSE, SE CREARA UN LAPIZ
canvas.addEventListener('mousedown', (e) => {
    pencil.setXY(e.offsetX, e.offsetY);
    mouseDown = true;
})

// MIENTRAS SE ESTE PRESIONADO EL CLICK DEL MOUSE, SE DIBUJARA UNA LINEA
canvas.addEventListener('mousemove', (e) => {
    if(mouseDown && pencil != null) {
        pencil.moveTo(e.offsetX, e.offsetY);
        pencil.draw();
    }
})

// UNA VEZ SUELTO EL CLICK SE DEJARA DE DIBUJAR Y SE DESTRUIRA EL LAPIZ
canvas.addEventListener('mouseup', () => {
    mouseDown = false;
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
