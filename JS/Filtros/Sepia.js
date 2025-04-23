class Sepia extends FiltroSimple {
    constructor(ctx, imageData, width, height) {
        super(ctx, imageData, width, height);
    }

    setPixel(i, data, r, g, b, a) {
        let newR = 0.393 * r + 0.769 * g + 0.189 * b;
        let newG = 0.349 * r + 0.686 * g + 0.168 * b;
        let newB = 0.272 * r + 0.534 * g + 0.131 * b;

        data[i] = Math.min(255, newR);
        data[i+1] = Math.min(255, newG);
        data[i+2] = Math.min(255, newB);
        data[i+3] = a;
    }
}