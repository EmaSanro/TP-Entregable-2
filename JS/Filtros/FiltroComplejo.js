class FiltroComplejo {
    constructor(ctx, imageData, width, height) {
        this.ctx = ctx;
        this.imageData = imageData;
        this.width = width;
        this.height = height;
    }

    aplicarFiltro() {
        let indice;
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                indice = (x + (y * this.width)) * 4;
                this.setPixel(indice, this.imageData, x, y);
            }
        }
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    setPixel(indice, imageData, x, y) {}
}