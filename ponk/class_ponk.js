class Base {
    constructor(objetobase) {
        this.x = objetobase.x;
        this.y = objetobase.y;
        this.color = objetobase.color;
    }
    getX() { return this.x; }
    getY() { return this.y; }
    getColor() { return this.color; }

    setX(nuevaX) { this.x = nuevaX; }
    setY(nuevaY) { this.y = nuevaY; }


}
class Barra extends Base {
    constructor(objetoBarra) {
        super(objetoBarra);
        this.base = objetoBarra.base;
        this.altura = objetoBarra.altura;
        this.velocidad = objetoBarra.velocidad;
    }
    getBase() { return this.base; }
    getAltura() { return this.altura; }
    getVelocidad() { return this.velocidad; }

    setBase(nuevaBase) { this.base = nuevaBase; }
    setAltura(nuevaAltura) { this.altura = nuevaAltura; }
    setVelocidad(nuevaVelocidad) { this.velocidad = nuevaVelocidad; }

    renderizarBarra(direccion) {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        if (direccion == "abajo") {
            ctx.clearRect(this.getX(), this.getY() - this.getVelocidad(), this.getBase(), this.getAltura());
        } else if (direccion == "arriba") {
            ctx.clearRect(this.getX(), this.getY() + this.getVelocidad(), this.getBase(), this.getAltura());
        }
        ctx.beginPath();
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.getX(), this.getY(), this.getBase(), this.getAltura());
        //ctx.strokeRect(this.getX(), this.getY(), this.getBase(), this.getAltura());
    }
    moverBarraJugador1(direccion) {
            if (direccion == "abajo") {
                this.setY(this.getY() + this.getVelocidad())
                this.renderizarBarra("abajo");
            } else {
                this.setY(this.getY() - this.getVelocidad())
                this.renderizarBarra("arriba");
            }
    }
}
class Pelota extends Base {
    constructor(objetoPelota) {
        super(objetoPelota);
        this.radio = objetoPelota.radio;
        this.velocidadX = objetoPelota.velocidadX;
        this.velocidadY = objetoPelota.velocidadY;
    }
    getRadio() { return this.radio; }
    getVekicidadX() { return this.velocidadX; }
    getVelocidadY() { return this.velocidadY; }

    setRadio(nuevoRadio) { this.radio = nuevoRadio; }
    setVelocidadX(nuevaVelX) { this.velocidadX = nuevaVelX; }
    getVelocidadY(nuevaVelY) { this.velocidadY = nuevaVelY; }

    renderizarPelota() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = this.getColor();
        ctx.arc(this.getX(), this.getY(), this.getRadio (),0,Math.PI *2);
        ctx.fill();
       // ctx.strokeRect(this.getX(), this.getY(), this.getBase(), this.getAltura());
    }
}