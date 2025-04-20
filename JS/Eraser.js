class Eraser {
    constructor(posX, posY, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
    }

    setXY(x, y) {
        this.posX = x;
        this.posY = y;
    }

    moveTo(x, y) {
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = x;
        this.posY = y;
    }

    delete() {
        this.ctx.clearRect(this.posX, this.posY, 10, 10);
        this.ctx.beginPath();
    }

}