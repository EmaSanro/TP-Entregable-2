class Brillo extends FiltroSimple {
    constructor(ctx, imageData, width, height) {
        super(ctx, imageData, width, height);
    }

    setPixel(i, data, r, g, b, a) {
        let brillo = 30; // Valor de brillo a aplicar
        r = Math.min(255, r + brillo);
        g = Math.min(255, g + brillo);
        b = Math.min(255, b + brillo);
        
        data[i] = r;
        data[i+1] = g;
        data[i+2] = b;
        data[i+3] = a;
    }
}