class Rectangulo{
    constructor(objetoRectangulo){
        this.x = objetoRectangulo.x;
        this.y = objetoRectangulo.y;
        this.base = objetoRectangulo.base;
        this.altura = objetoRectangulo.altura;
        this.color = objetoRectangulo.color;
    }

    getX(){return this.x;}
    getY(){return this.y;}
    getBase(){return this.base;}
    getAltura(){return this.altura;}
    getColor(){return this.color;}
    
    renderizarRectangulo(){
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.fillStyle = this.getColor();
        ctx.rect(this.getX(),this.getY(),this.getBase(),this.getAltura());
        ctx.fill();
        ctx.stroke();
    }
}