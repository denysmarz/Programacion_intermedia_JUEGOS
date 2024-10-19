/*class Rectangulo {
    static vectorPosiciones = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    static contadorJugadas = 0;
    static vectorverificar = [];
    constructor(objetoRectangulo) {
        this.x = objetoRectangulo.x;
        this.y = objetoRectangulo.y;
        this.base = objetoRectangulo.base;
        this.altura = objetoRectangulo.altura;
        this.color = objetoRectangulo.color;
        this.id = objetoRectangulo.id;
    }

    getX() { return this.x; }
    getY() { return this.y; }
    getBase() { return this.base; }
    getAltura() { return this.altura; }
    getColor() { return this.color; }
    getId() { return this.id; }

    getVectorPosiciones() { return Rectangulo.vectorPosiciones; }
    getContadorJugadas() { return Rectangulo.contadorJugadas }
    getVetorVerificar() { return Rectangulo.vectorverificar; }
    setVectorVerificar(nuevoVector) { Rectangulo.vectorverificar = nuevoVector; }
    //getHistorialXY() { return Rectangulo.histirialXY;}

    setContadorJugadas(cantidad) { Rectangulo.contadorJugadas = cantidad; }

    renderizarRectangulo() {
        //this.cargarImagen();
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        //ctx.lineWidth = "3";
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.getX(), this.getY(), this.getBase(), this.getAltura());
        //ctx.rect(this.getX(),this.getY(),this.getBase(),this.getAltura());
        //ctx.fill();
        ctx.strokeRect(this.getX(), this.getY(), this.getBase(), this.getAltura());
    }
    cargarImagen() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        var img = new Image()
        img.src = "Materiales/imagen_" + this.getVectorPosiciones()[this.getId() - 1] + ".jpg"
        var cx = this.getX();
        var cy = this.getY();
        img.onload = function () {
            ctx.drawImage(img, cx, cy);
        }
    }
    detectarCelda(x, y) {
        if (x > this.getX() && x < this.getX() + this.getAltura()) {
            if (y > this.getY() && y < this.getY() + this.getAltura()) {
                this.cargarImagen();
                this.setContadorJugadas(this.getContadorJugadas() + 1);

                this.getVetorVerificar().push(this);

                if (this.getContadorJugadas() == 2) {
                    if (!(this.getVetorVerificar()[this.getVetorVerificar()[0].id-1] == 
                        this.getVetorVerificar()[this.getVetorVerificar()[1].id-1])) {
                            setTimeout(() => {
                                this.getVetorVerificar()[0].renderizarRectangulo();
                                this.getVetorVerificar()[1].renderizarRectangulo();  
                            }, 1000);   
                    }else{
                        console.log("IGUALES")
                    }
                    
                }
                setTimeout(() => {
                    this.setVectorVerificar([]);
                    this.setContadorJugadas(0);    
                }, 1200);
                
            }
        }
    }
    generarPosiciones() {
        for (let i = 1; i <= 8; i++) {
            do {
                var posicion = parseInt(Math.random() * (0 - 16) + 16);
            } while (this.getVectorPosiciones()[posicion] != "")
            this.getVectorPosiciones()[posicion] = i;
            do {
                var posicion_2 = parseInt(Math.random() * (0 - 16) + 16);
            } while (this.getVectorPosiciones()[posicion_2] != "")
            this.getVectorPosiciones()[posicion_2] = i;
        }
        console.log(this.getVectorPosiciones());

    }
}*/

class Rectangulo {
    static vectorPosiciones = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    static contadorJugadas = 0;
    static vectorverificar = [];
    static verificarfin = 0;

    constructor(objetoRectangulo) {
        this.x = objetoRectangulo.x;
        this.y = objetoRectangulo.y;
        this.base = objetoRectangulo.base;
        this.altura = objetoRectangulo.altura;
        this.color = objetoRectangulo.color;
        this.id = objetoRectangulo.id;
    }

    getX() { return this.x; }
    getY() { return this.y; }
    getBase() { return this.base; }
    getAltura() { return this.altura; }
    getColor() { return this.color; }
    getId() { return this.id; }

    getVectorPosiciones() { return Rectangulo.vectorPosiciones; }
    getContadorJugadas() { return Rectangulo.contadorJugadas; }
    getVectorVerificar() { return Rectangulo.vectorverificar; }

    setContadorJugadas(cantidad) { Rectangulo.contadorJugadas = cantidad; }
    setVectorVerificar(nuevoVector) { Rectangulo.vectorverificar = nuevoVector; }

    getverificarFin() { return Rectangulo.verificarfin; }
    setverificarFin(nuevo) { return Rectangulo.verificarfin = nuevo; }

    renderizarRectangulo() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.getX(), this.getY(), this.getBase(), this.getAltura());
        ctx.strokeRect(this.getX(), this.getY(), this.getBase(), this.getAltura());
    }

    cargarImagen() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = "Materiales/imagen_" + this.getVectorPosiciones()[this.getId() - 1] + ".jpg";
        var cx = this.getX();
        var cy = this.getY();
        img.onload = function () {
            ctx.drawImage(img, cx, cy);
        };
    }

    detectarCelda(x, y) {
        if (x > this.getX() && x < this.getX() + this.getBase() && y > this.getY() && y < this.getY() + this.getAltura()) {
            this.cargarImagen();
            this.setContadorJugadas(this.getContadorJugadas() + 1);
            document.getElementById("contadorClic").innerHTML = "Contador clic: " + this.getContadorJugadas();
            this.getVectorVerificar().push(this);

            if (this.getContadorJugadas() % 2 == 0) {
                const [rect1, rect2] = this.getVectorVerificar();

                // Verificar si los ids coinciden
                if (this.getVectorPosiciones()[rect1.getId() - 1] !== this.getVectorPosiciones()[rect2.getId() - 1]) {
                    setTimeout(() => {
                        rect1.renderizarRectangulo();
                        rect2.renderizarRectangulo();
                    }, 1000);
                } else {
                    console.log("IGUALES");
                    this.setverificarFin(this.getverificarFin() + 1);
                    setTimeout(() => {
                        console.log("PARES: " + this.getverificarFin());
                        if (this.getverificarFin() == 8) {
                            var confimacion = confirm("FIN DEL JUEGO. GANASTE!!\nDesea volver a jugar?");
                            if(confimacion == true){
                                location.reload();
                            }
                        }
                    }, 100);


                }

                // Limpiar el vectorVerificar y reiniciar el contador de jugadas
                setTimeout(() => {
                    this.setVectorVerificar([]);
                    //this.setContadorJugadas(0);
                }, 1000);
            }
        }
    }

    generarPosiciones() {
        for (let i = 1; i <= 8; i++) {
            let posicion, posicion_2;

            // Asignar la primera posición
            do {
                posicion = Math.floor(Math.random() * 16);
            } while (this.getVectorPosiciones()[posicion] !== "");
            this.getVectorPosiciones()[posicion] = i;

            // Asignar la segunda posición
            do {
                posicion_2 = Math.floor(Math.random() * 16);
            } while (this.getVectorPosiciones()[posicion_2] !== "");
            this.getVectorPosiciones()[posicion_2] = i;
        }

        console.log(this.getVectorPosiciones());
    }
}
