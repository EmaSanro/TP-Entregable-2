class FiltroSimple {
    constructor(ctx, imageData, width, height) {
        this.ctx = ctx;
        this.imageData = imageData;
        this.width = width;
        this.height = height;
    }

    aplicarFiltro() {
        let data = this.imageData.data;
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y< this.height; y++) {
                let i = (x + (y * canvas.width)) * 4;
                let r = data[i];
                let g = data[i+1];
                let b = data[i+2];
                let a = data[i+3];
                this.setPixel(i, data, r, g, b, a);
            }
        }
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    setPixel(i, data, r, g, b, a){

    }
}