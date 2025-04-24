class Sobel extends FiltroComplejo {
    constructor(ctx, imageData, width, height) {
        super(ctx, imageData, width, height);
        this.kernelX = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        this.kernelY = [
            [-1, -2, -1],
            [ 0,  0,  0],
            [ 1,  2,  1]
        ];
        this.kernelSize = 3;
        this.gray = this.convertToGrayscale();
    }

    convertToGrayscale() {
        const gray = [];
        for (let i = 0; i < this.imageData.data.length; i += 4) {
          const r = this.imageData.data[i];
          const g = this.imageData.data[i + 1];
          const b = this.imageData.data[i + 2];
          const prom = (r+g+b) / 3;
          gray[i / 4] = prom;
        }
        
        return gray;
    }

    setPixel(indice, imageData, x, y) {
        let newX = 0;
        let newY = 0;

        for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
                const valor = this.gray[(y + ky) * this.width + (x + kx)];
                newX += valor * this.kernelX[ky + 1][kx + 1];
                newY += valor * this.kernelY[ky + 1][kx + 1];
            }
        }

        const magnitud = Math.sqrt(newX ** 2 + newY ** 2);
        const minimo = Math.min(255, magnitud);

        imageData.data[indice] = imageData.data[indice + 1] = imageData.data[indice + 2] = minimo;
        imageData.data[indice + 3] = 255;
    }
}