class Negativo extends FiltroSimple {
    constructor(ctx, imageData, width, height) {
        super(ctx, imageData, width, height);
    }

    setPixel(i, data, r, g, b, a) {
        data[i] = 255 - r;
        data[i + 1] = 255 - g;
        data[i + 2] = 255 - b;
        data[i + 3] = a;
    }
}