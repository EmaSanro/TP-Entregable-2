class Blur extends FiltroComplejo {
    constructor(ctx, imageData, width, height) {
        super(ctx, imageData, width, height);
        this.kernel = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ];
        this.kernelSize = 3;
    }

    setPixel(indice, imageData, x, y) {
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        let cant = 0;
        let offsetX;
        let offsetY;
        let index;

        for (let i = 0; i < this.kernelSize; i++) {
            for (let j = 0; j < this.kernelSize; j++) {
                offsetX = x + i - Math.floor(this.kernelSize / 2);
                offsetY = y + j - Math.floor(this.kernelSize / 2);
                if (offsetX < 0 || offsetY < 0 || offsetX > this.width-1|| offsetY > this.height-1) { continue; }
                index = (offsetX + (offsetY * canvas.width)) * 4;
                sumR += imageData.data[index] * this.kernel[i][j];
                sumG += imageData.data[index + 1] * this.kernel[i][j];
                sumB += imageData.data[index + 2] * this.kernel[i][j];
                cant++;
            }
        }
        imageData.data[indice] = sumR / cant;
        imageData.data[indice + 1] = sumG / cant;
        imageData.data[indice + 2] = sumB / cant;
    }
}