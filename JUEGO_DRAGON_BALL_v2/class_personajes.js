class Personaje {
    static vectorPersonajes = [];
    constructor(objetoPersonaje) {
        this.nombre = objetoPersonaje.nombre;
        this.vida = 400;
        this.ki = 80;
        this.x = objetoPersonaje.x;
        this.y = objetoPersonaje.y;
        this.intervaloKi = null;
        this.estadoGuardia = 0;
        this.danioEspecial = objetoPersonaje.danioEspecial;
    }
    getNombre() { return this.nombre; }
    getVida() { return this.vida; }
    getKi() { return this.ki; }
    getX() { return this.x; }
    getY() { return this.y; }
    getestadoGuardia() { return this.estadoGuardia; }

    getDanioEspecial() { return this.danioEspecial; }

    getvectorPersonajes() { return Personaje.vectorPersonajes; }
    setvectorPersonajes(vectorPersonajes) { Personaje.vectorPersonajes = vectorPersonajes; }

    setNombre(nuevoNombre) { this.nombre = nuevoNombre; }
    setVida(nuevaVida) { this.vida = nuevaVida; }
    setKi(nuevoKi) { this.ki = nuevoKi; }
    setX(nuevoX) { this.x = nuevoX; }
    setY(nuevoY) { this.y = nuevoY; }
    setestadoGuardia(nuevoestadoGuardia) { this.estadoGuardia = nuevoestadoGuardia; }

    moverPersonaje(movimiento, estadoboton) {
        if (movimiento == "izquierda" && this.intervaloKi === null) {
            if (estadoboton == 1) {
                if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                    this.cargarPersonaje(15, 1, true);
                    this.setX(this.getX() - 10);
                } else {
                    this.cargarPersonaje(14, 1);
                    this.setX(this.getX() - 10);
                }
            }
            if (estadoboton == 0) {
                if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                    this.cargarPersonaje(12, 1, true);//1 para hacer el borrado de la imagen anterior
                } else {
                    this.cargarPersonaje(12, 1);//1 para hacer el borrado de la imagen anterior
                }
            }
        } else if (movimiento == "derecha" && this.intervaloKi === null) {
            if (estadoboton == 1) {
                if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                    this.cargarPersonaje(14, 2, true);
                    this.setX(this.getX() + 10);
                } else {
                    this.cargarPersonaje(15, 2);
                    this.setX(this.getX() + 10);
                }
            }
            if (estadoboton == 0) {
                if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                    this.cargarPersonaje(12, 2, true);
                } else {
                    this.cargarPersonaje(12, 2);
                }
            }
        }
    }
    cargarPersonaje(accion, pose, voltear = false) {
        //3 para mover la imagen-4 para borrar la imagen
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");

        if (pose == 1) {
            ctx.clearRect(this.getX() + 40, this.getY(), 10, 60);
        }
        if (pose == 2) {
            ctx.clearRect(this.getX() - 10, this.getY(), 10, 60);
        }
        if (pose == 4) {
            
            ctx.clearRect(this.getX() - 20, this.getY() - 30, 82, 90);
        }

        var img = new Image();
        img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + accion + ".png";

        if (pose == 3) {
            var cx = this.getX() - 20;
            var cy = this.getY() - 30;
        } else {
            var cx = this.getX();
            var cy = this.getY();
        }
        
        img.onload = function () {
            ctx.save(); // Guardar el estado actual del contexto
            if (voltear) {
                // Voltear horizontalmente (espejo)
                ctx.scale(-1, 1); // Invertir en el eje X
                // Ajustar la posición para que la imagen se dibuje correctamente después de voltear
                ctx.drawImage(img, -cx - img.width, cy); // Ajusta -cx - ancho de la imagen
                
            } else {
                // Dibujar normalmente
                ctx.drawImage(img, cx, cy);
            }
            ctx.restore(); // Restaurar el estado original del contexto
        };
    }
    /*barraVida() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        // Limpiar la zona donde se dibuja la barra de vida
        ctx.clearRect(80, 50, 400, 20); // Limpiar el área de la barra de vida anterior
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(80, 50, this.getVida(), 20); // Dibuja la barra de vida actualizada
        ctx.strokeRect(80, 50, 400, 20); // Borde de la barra
        console.log("Vida: " + this.getVida());
    }
    barraki() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        // Limpiar la zona donde se dibuja la barra de ki
        ctx.clearRect(80, 80, 400, 10); // Limpiamos el área de la barra de ki anterior
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        //if (this.getKi() < 400) {
        ctx.fillRect(80, 80, this.getKi(), 10);
        //}
        console.log("Ki: " + this.getKi());
        ctx.strokeRect(80, 80, 80, 10); //BORDE
        ctx.strokeRect(80, 80, 160, 10); //BORDE
        ctx.strokeRect(80, 80, 240, 10); //BORDE
        ctx.strokeRect(80, 80, 320, 10); //BORDE
        ctx.strokeRect(80, 80, 400, 10);
        ctx.strokeRect(80, 80, 400, 10); //BORDE
    }*/
    cargarKi(estadoboton) {
        if (estadoboton == 1 && this.intervaloKi === null) { // Solo empieza si no está ya en un intervalo
            let contador = 0;
            this.intervaloKi = setInterval(() => {
                contador = (contador + 1) % 3; // Cicla entre 0, 1 y 2

                if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                    this.cargarPersonaje(56 + contador, 3, true);
                } else {
                    this.cargarPersonaje(56 + contador, 3);
                }
                if (this.getKi() < 400) {
                    this.setKi(this.getKi() + 10);
                }
                this.barraki(); // Actualiza la barra de ki
            }, 100); // Velocidad de la animación (200ms entre cada imagen)
        } else if (estadoboton == 0 && this.intervaloKi !== null) {
            clearInterval(this.intervaloKi); // Detener la animación
            this.intervaloKi = null; // Restablecer la variable
            if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                this.cargarPersonaje(12, 4, true);
            } else {
                this.cargarPersonaje(12, 4);
            }
        }
    }
    cubrirse(estado, jugador = 1) {
        if (estado == 1 && this.intervaloKi === null) {

            if (this.getX() > this.getvectorPersonajes()[jugador].getX()) {
                this.cargarPersonaje(37, 0, true);
                this.cargarPersonaje(38, 0, true);
                this.setestadoGuardia(1);
            } else {
                this.cargarPersonaje(37);
                this.cargarPersonaje(38);
                this.setestadoGuardia(1);
            }

        } else if (estado == 0 && this.intervaloKi === null) {

            if (this.getX() > this.getvectorPersonajes()[jugador].getX()) {
                this.cargarPersonaje(12, 0, true);
                this.setestadoGuardia(0);
            } else {
                this.cargarPersonaje(12);
                this.setestadoGuardia(0);
            }
        }
    }
    
    verificarColision(cx, cy) {
        console.log(cx, cy);
        if (this.getvectorPersonajes()[1].x == cx + 60 && this.getvectorPersonajes()[1].y + 15 == cy) {
            console.log("colision");
            return true;
        }
        return false;
    }
    
    /*cargarPoder(tipoPoder) {
        //graficar poder ESPECIAl
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + tipoPoder + ".png";
        if (tipoPoder == 68) {
            var cx = this.getX() + 40;
            var cy = this.getY() + 15;
        }
        var self = this; // Guardar referencia a 'this' en una variable
        img.onload = function () {
            var intervalo = setInterval(() => {
                // Limpiar el área donde estaba la imagen anteriormente
                ctx.clearRect(cx, cy, img.width, img.height);
                cx = cx + 10;
                ctx.drawImage(img, cx, cy);
                if (self.verificarColision(cx, cy)) {
                    clearInterval(intervalo);
                    if (self.getvectorPersonajes()[1].getestadoGuardia() == 0) {
                        self.getvectorPersonajes()[1].setVida(self.getvectorPersonajes()[1].getVida() - self.getDanioEspecial());
                        self.getvectorPersonajes()[1].barraVidaEnemigo();
                    }
                    setTimeout(() => {
                        ctx.clearRect(cx, cy, img.width, img.height);
                    }, 100);
                } else if (cx > canvas.width) {
                    setTimeout(() => {
                        clearInterval(intervalo);
                    }, 100);
                }
            }, 20);
        };
    }*/

    asignarPersonajes(personaje) {
        Personaje.vectorPersonajes.push(personaje);
    }
}



class Enemigo extends Personaje {
    constructor(objetoPersonaje) {
        super(objetoPersonaje);
        this.intervaloKii = null;
    }

    barraVidaEnemigo() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        // Limpiar la zona donde se dibuja la barra de vida
        ctx.clearRect(560, 50, 400, 20); // Limpiar el área de la barra de vida anterior
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(560, 50, this.getvectorPersonajes()[1].getVida(), 20); // Dibuja la barra de vida actualizada
        ctx.strokeRect(560, 50, 400, 20); // Borde de la barra
        console.log("Vida: " + this.getVida());
    }
    barrakiEnemigo() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        // Limpiar la zona donde se dibuja la barra de ki
        ctx.clearRect(560, 80, 400, 10); // Limpiamos el área de la barra de ki anterior
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        //if (this.getKi() < 400) {
        ctx.fillRect(960- this.getKi(), 80, this.getKi(), 10);
        //}
        console.log("KiEnemigo: " + this.getKi());
        ctx.strokeRect(560, 80, 80, 10); //BORDE
        ctx.strokeRect(560, 80, 160, 10); //BORDE
        ctx.strokeRect(560, 80, 240, 10); //BORDE
        ctx.strokeRect(560, 80, 320, 10); //BORDE
        ctx.strokeRect(560, 80, 400, 10);
        ctx.strokeRect(560, 80, 400, 10); //BORDE
        //400 480 560 640 720 800 880 960
    }
    cargarKiEnemigo(estadoboton) {
        if (estadoboton == 1 && this.intervaloKii === null) { // Solo empieza si no está ya en un intervalo
            let contador = 0;
            this.intervaloKii = setInterval(() => {
                contador = (contador + 1) % 3; // Cicla entre 0, 1 y 2

                if (this.getX() > this.getvectorPersonajes()[0].getX()) {
                    this.cargarPersonaje(56 + contador, 3, true);
                } else {
                    this.cargarPersonaje(56 + contador, 3);
                }
                if (this.getKi() < 400) {
                    this.setKi(this.getKi() + 10);
                }
                this.barrakiEnemigo(); // Actualiza la barra de ki
            }, 100); // Velocidad de la animación (200ms entre cada imagen)
        } else if (estadoboton == 0 && this.intervaloKii !== null) {
            clearInterval(this.intervaloKii); // Detener la animación
            this.intervaloKii = null; // Restablecer la variable
            if (this.getX() > this.getvectorPersonajes()[0].getX()) {
                this.cargarPersonaje(12, 4, true);
            } else {
                this.cargarPersonaje(12, 4);
            }
        }
    }
    especial() {
        if (this.getKi() >= 80) {
            if (this.intervaloKii === null) {
                var contador = 0;
                this.intervaloKii = setInterval(() => {
                    contador = contador + 1;
                    if (this.getX() > this.getvectorPersonajes()[0].getX()) {
                        this.cargarPersonaje(70 + contador, 99, true);
                    } else {
                        this.cargarPersonaje(70 + contador, 99);
                    }
                    console.log(contador)
                    if (contador == 3) {
                        if(this.getX() > this.getvectorPersonajes()[0].getX()){
                            this.cargarPoder(68,true);
                        }else{
                            this.cargarPoder(68);
                        }
                        clearInterval(this.intervaloKii); // Detener la animación
                        this.setKi(this.getKi() - 80);
                        this.barrakiEnemigo();
                        setTimeout(() => {
                            this.intervaloKii = null; // Restablecer la variable
                            if (this.getX() > this.getvectorPersonajes()[0].getX()) {
                                this.cargarPersonaje(12, 4, true);
                            } else {
                                this.cargarPersonaje(12, 4);
                            }
                        }, 220);
                    }
                }, 200); // Velocidad de la animación (200ms entre cada imagen)
            }
        }
    }
    cargarPoder(tipoPoder,voltear = false) {
        //graficar poder ESPECIAl
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + tipoPoder + ".png";
        var self = this; // Guardar referencia a 'this' en una variable
        img.onload = function () {
        if (tipoPoder == 68 && self.getX() > self.getvectorPersonajes()[0].getX()) {
            var cx = self.getX()-img.width;
            var cy = self.getY() + 15;
        }else{
            var cx = self.getX() + 40;
            var cy = self.getY() + 15;
        }
        
        
            ctx.save(); // Guardar el estado actual del contexto
            var intervalo = setInterval(() => {
                // Limpiar el área donde estaba la imagen anteriormente
                
                if(self.getX() > self.getvectorPersonajes()[0].getX()){
                    ctx.clearRect(cx+10, cy, img.width, img.height);
                    cx = cx - 10;
                }else{
                    ctx.clearRect(cx, cy, img.width, img.height);
                    cx = cx + 10;
                }
                
                if (voltear) {
                    // Voltear horizontalmente (espejo)
                    ctx.scale(-1, 1); // Invertir en el eje X
                    // Ajustar la posición para que la imagen se dibuje correctamente después de voltear
                    ctx.drawImage(img, -cx - img.width, cy); // Ajusta -cx - ancho de la imagen
                } else {
                    // Dibujar normalmente
                    ctx.drawImage(img, cx, cy);
                }

                if(self.verificarColision(cx + 50, cy)){
                    self.estaLanzandoAtaque = true; // Activamos el estado de ataque
                }

                if (self.verificarColision(cx, cy)) {
                    clearInterval(intervalo);
                    if (self.getvectorPersonajes()[0].getestadoGuardia() == 0) {
                        self.getvectorPersonajes()[0].setVida(self.getvectorPersonajes()[0].getVida() - self.getDanioEspecial());
                        self.getvectorPersonajes()[0].barraVida();
                    }
                    self.estaLanzandoAtaque = false; // Terminamos el ataque
                    setTimeout(() => {
                        ctx.clearRect(cx, cy, img.width, img.height);
                    }, 100);
                } else if (cx > canvas.width) {
                    setTimeout(() => {
                        clearInterval(intervalo);
                    }, 100);
                }
            }, 20);
            ctx.restore(); // Restaurar el estado original del contexto
        };
    }
    verificarColision(cx, cy) {
        console.log(cx, cy);
        if (this.getvectorPersonajes()[0].x == cx + 60 && this.getvectorPersonajes()[0].y + 15 == cy) {
            console.log("colision");
            return true;
        }
        return false;
    }


    reaccionarAtaque() {
        if (this.detectarAtaqueJugador()) {
            this.getvectorPersonajes()[1].cubrirse(1,0); // El enemigo se cubre
            setTimeout(() => {
                this.getvectorPersonajes()[1].cubrirse(0,0); // Deja de cubrirse después de un tiempo
            }, 1000); // Mantener la guardia por 1.5 segundos (ajústalo según sea necesario)
        }
    }
    detectarAtaqueJugador() {
        // Detectar si el jugador está lanzando un ataque especial (puedes usar un indicador en el jugador)
        let jugador = this.getvectorPersonajes()[0]; // Suponiendo que el jugador está en la posición 0 del vector
        return jugador.estaLanzandoAtaque; // 'estaLanzandoAtaque' debería ser una variable o método en el jugador
    }
}
class Jugador extends Personaje {
    constructor(objetoPersonaje) {
        super(objetoPersonaje);
        this.estaLanzandoAtaque = false; // Inicialmente el jugador no está lanzando ataque
    }
    barraVida() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        // Limpiar la zona donde se dibuja la barra de vida
        ctx.clearRect(80, 50, 400, 20); // Limpiar el área de la barra de vida anterior
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(80, 50, this.getVida(), 20); // Dibuja la barra de vida actualizada
        ctx.strokeRect(80, 50, 400, 20); // Borde de la barra
        console.log("Vida: " + this.getVida());
    }
    barraki() {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        // Limpiar la zona donde se dibuja la barra de ki
        ctx.clearRect(80, 80, 400, 10); // Limpiamos el área de la barra de ki anterior
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.fillRect(80, 80, this.getKi(), 10);
        console.log("Ki: " + this.getKi());
        ctx.strokeRect(80, 80, 80, 10); //BORDE
        ctx.strokeRect(80, 80, 160, 10); //BORDE
        ctx.strokeRect(80, 80, 240, 10); //BORDE
        ctx.strokeRect(80, 80, 320, 10); //BORDE
        ctx.strokeRect(80, 80, 400, 10);
        ctx.strokeRect(80, 80, 400, 10); //BORDE
    }
    especial() {
        if (this.getKi() >= 80) {
            if (this.intervaloKi === null) {
                //this.estaLanzandoAtaque = true; // Activamos el estado de ataque
                var contador = 0;
                this.intervaloKi = setInterval(() => {
                    contador = contador + 1;
                    if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                        this.cargarPersonaje(70 + contador, 99, true);
                    } else {
                        this.cargarPersonaje(70 + contador, 99);
                    }
                    if (contador == 6) {
                        this.cargarPoder(68);
                        clearInterval(this.intervaloKi); 
                        this.setKi(this.getKi() - 80);
                        this.barraki();
                        setTimeout(() => {
                            this.intervaloKi = null;
                            //this.estaLanzandoAtaque = false; // Terminamos el ataque
                            if (this.getX() > this.getvectorPersonajes()[1].getX()) {
                                this.cargarPersonaje(12, 4, true);
                            } else {
                                this.cargarPersonaje(12, 4);
                            }
                        }, 220);
                    }
                }, 200); 
            }
        }
    }
    cargarPoder(tipoPoder) {
        //graficar poder ESPECIAl
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + tipoPoder + ".png";
        if (tipoPoder == 68) {
            var cx = this.getX() + 40;
            var cy = this.getY() + 15;
        }
        var self = this; // Guardar referencia a 'this' en una variable
        img.onload = function () {
            var intervalo = setInterval(() => {
                // Limpiar el área donde estaba la imagen anteriormente
                ctx.clearRect(cx, cy, img.width, img.height);
                cx = cx + 10;
                ctx.drawImage(img, cx, cy);

                if(self.verificarColision(cx + 50, cy)){
                    self.estaLanzandoAtaque = true; // Activamos el estado de ataque
                }

                if (self.verificarColision(cx, cy)) {
                    clearInterval(intervalo);
                    if (self.getvectorPersonajes()[1].getestadoGuardia() == 0) {
                        self.getvectorPersonajes()[1].setVida(self.getvectorPersonajes()[1].getVida() - self.getDanioEspecial());
                        self.getvectorPersonajes()[1].barraVidaEnemigo();
                    }
                    self.estaLanzandoAtaque = false; // Terminamos el ataque
                    setTimeout(() => {
                        ctx.clearRect(cx, cy, img.width, img.height);
                    }, 100);
                } else if (cx > canvas.width) {
                    setTimeout(() => {
                        clearInterval(intervalo);
                    }, 100);
                }
            }, 20);
        };
    }
}
