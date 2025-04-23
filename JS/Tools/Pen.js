class Pen {
    constructor(posX, posY, ctx, color) {
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.color = color;
    }

    moveTo(x,y) {
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = x;
        this.posY = y;
    }

    setColor(color) {
        this.color = color;
    }

    setXY(x, y) {
        this.posX = x;
        this.posY = y;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = 'miter';
        this.ctx.lineCap = 'butt';
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}