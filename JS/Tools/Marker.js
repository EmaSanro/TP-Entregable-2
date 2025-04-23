class Marker extends Pen {
    constructor(posX, posY, ctx, color) {
        super(posX, posY, ctx, color);
        this.antX = posX;
        this.antY = posY;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = 15;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}