class Imagen {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
        this.cargada = false;
        this.imageData = null;
    }

    cargarImagen(file) {
        // TERMINAR LA FUNCIONALIDAD DE CARGAR UNA IMAGEN Y DIBUJARLA
        let orgWidth = this.width;
        let orgHeight = this.height;

        let img = new Image();

        img.src = URL.createObjectURL(file);

        img.onload = function() {
            
            const aspectRatio = this.naturalWidth / this.naturalHeight;

            let resWidth = orgWidth;
            let resHeight = resWidth / aspectRatio; 
            if(resHeight > orgHeight) {
                resHeight = orgHeight;
                resWidth = resHeight * aspectRatio;
            }


            ctx.drawImage(this, 0, 0, resWidth, resHeight);
        }
    }
}