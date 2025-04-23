class Eraser {
    constructor(posX, posY, size, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.ctx = ctx;
    }

    setXY(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setSize(size) {
        this.size = size;    
    }

    moveTo(x, y) {
        this.posX = x;
        this.posY = y;
    }

    delete() {
        this.ctx.clearRect(this.posX, this.posY, this.size, this.size);
        this.ctx.beginPath();
    }

}