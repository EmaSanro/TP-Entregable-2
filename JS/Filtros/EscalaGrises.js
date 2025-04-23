class EscalaGrises extends FiltroSimple{
    constructor(ctx, imageData, width, height) {
        super(ctx, imageData, width, height);
    }

    setPixel(i, data, r, g, b, a) {
        let prom = (r + g + b) / 3;
        data[i] = prom;
        data[i+1] = prom;
        data[i+2] = prom;
        data[i+3] = a;
    }
    
}