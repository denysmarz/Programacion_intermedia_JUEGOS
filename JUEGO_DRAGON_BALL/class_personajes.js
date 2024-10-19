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
    }

    getNombre() { return this.nombre; }
    getVida() { return this.vida; }
    getKi() { return this.ki; }
    getX() { return this.x; }
    getY() { return this.y; }
    getestadoGuardia() { return this.estadoGuardia; }

    getvectorPersonajes() { return Personaje.vectorPersonajes; }
    setvectorPersonajes(vectorPersonajes) { Personaje.vectorPersonajes = vectorPersonajes; }

    setNombre(nuevoNombre) { this.nombre = nuevoNombre; }
    setVida(nuevaVida) { this.vida = nuevaVida; }
    setKi(nuevoKi) { this.ki = nuevoKi; }
    setX(nuevoX) { this.x = nuevoX; }
    setY(nuevoY) { this.y = nuevoY; }
    setestadoGuardia(nuevoestadoGuardia) { this.estadoGuardia = nuevoestadoGuardia; }

    cargarki(estado) {
        if (estado == 1) {
            console.log("cargando ki");

            // Solo iniciamos el intervalo si no está ya en ejecución
            if (this.intervaloKi === null) {
                this.intervaloKi = setInterval(() => {
                    this.cargarPersonaje(56);
                    setTimeout(() => {
                        this.cargarPersonaje(57);
                    }, 100);
                    setTimeout(() => {
                        this.cargarPersonaje(58);
                    }, 150);
                    if (this.getKi() != 400) {
                        this.setKi(this.getKi() + 10);
                    }
                    this.barraki(this.getKi());
                }, 150); // Ajusté el tiempo del intervalo

            }

        } else {
            clearInterval(this.intervaloKi); // Detenemos el intervalo
            this.intervaloKi = null; // Reiniciamos la variable
            setTimeout(() => {
                this.cargarPersonaje(99);
                this.cargarPersonaje(12); // Cargar animación final
                console.log("ADIOS");
            }, 210);

        }
    }
    cubrirse(estado) {
        if (estado == 1) {
            console.log("CUBRIRSE");
            this.cargarPersonaje(37);
            setTimeout(() => {
                this.cargarPersonaje(38);
                this.setestadoGuardia(1);
            }, 80);
        } else {
            setTimeout(() => {
                this.cargarPersonaje(99);
                this.cargarPersonaje(12); // Cargar animación final
                this.setestadoGuardia(0);
                console.log("ADIOS");
            }, 220);

        }
    }
    cargarPersonaje(accion) {
        var canvas = document.getElementById("contenedor");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + accion + ".png";
        if (accion == 56 || accion == 57 || accion == 58 || accion == 99) {
            var cx = this.getX() - 18;
            var cy = this.getY() - 30;
        } else {
            var cx = this.getX();
            var cy = this.getY();
        }

        img.onload = function () {
            ctx.drawImage(img, cx, cy);
        };
    }

    mover(movimiento, estado) {
        if (movimiento == "izquierda") {
            this.borrarMovimiento();
            this.setX(this.getX() - 10);
            this.cargarPersonaje(14);
            setTimeout(() => {
                this.borrarMovimiento();    
            }, 100);
            if (estado == 0) {
                setTimeout(() => {
                    this.cargarPersonaje(12);    
                }, 100);
                //this.cargarPersonaje(12);
            }
            console.log("MOVIMIENTO IZQUIERDA");
        } else if (movimiento == "derecha") {
            this.borrarMovimiento();
            this.setX(this.getX() + 10);
            this.cargarPersonaje(15);
            setTimeout(() => {
                this.borrarMovimiento();    
            }, 100);
            if (estado == 0) {
                setTimeout(() => {
                    this.cargarPersonaje(12);    
                }, 100);
            }
            console.log("MOVIMIENTO DERECHA");
        }
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
    }
    lanzarBola() {
        if (this.getKi() > 0) {
            this.cargarPersonaje(60);
            //graficar poder basico
            var canvas = document.getElementById("contenedor");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + 63 + ".png";
            var cx = this.getX() + 40;
            var cy = this.getY() + 24;
            img.onload = function () {
                var intervalo = setInterval(() => {
                    // Limpiar el área donde estaba la imagen anteriormente
                    ctx.clearRect(cx, cy, img.width, img.height);
                    cx = cx + 10;
                    ctx.drawImage(img, cx, cy);
                    if (self.verificarColision(cx, cy)) {
                        clearInterval(intervalo);
                    }
                }, 20);
                //ctx.drawImage(img, cx, cy);
            };
            this.setKi(this.getKi() - 10);
            this.barraki();
j        }
    }
    especial(estado) {
        if (this.getKi() >= 80) {
            if (estado == 0) {
                console.log("ESTADO: " + estado);
                this.cargarPersonaje(79);

                setTimeout(() => {
                    this.cargarPersonaje(80);
                }, 200);
                setTimeout(() => {
                    this.cargarPersonaje(81);
                }, 400);
                setTimeout(() => {
                    this.cargarPersonaje(82);
                }, 600);
                setTimeout(() => {
                    this.cargarPersonaje(83);
                }, 800);
                setTimeout(() => {
                    this.cargarPersonaje(77);
                }, 1000);

                this.setKi(this.getKi() - 80);
                this.barraki();

                //graficar poder ESPECIAL
                setTimeout(() => {
                    var canvas = document.getElementById("contenedor");
                    var ctx = canvas.getContext("2d");
                    var img = new Image();
                    img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + 68 + ".png";
                    var cx = this.getX() + 40;
                    var cy = this.getY() + 15;
                    var self = this; // Guardar referencia a 'this' en una variable
                    img.onload = function () {
                        var intervalo = setInterval(() => {
                            // Limpiar el área donde estaba la imagen anteriormente
                            ctx.clearRect(cx, cy, img.width, img.height);
                            cx = cx + 10;
                            //ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar la imagen de nuevo
                            ctx.drawImage(img, cx, cy);
                            if (self.verificarColision(cx, cy)) {
                                clearInterval(intervalo);
                            }
                        }, 20);
                        //ctx.drawImage(img, cx, cy);
                    };

                    
                }, 1000);

            }
        }
    }
    danio(danio) {

        // Iniciamos un intervalo que reducirá la vida del personaje cada 2 segundos
        setInterval(() => {
            if (this.getVida() > 0 && this.getVida() > danio) {
                if (this.getestadoGuardia() == 0) {
                    this.setVida(this.getVida() - 50); // Reducimos la vida en 10 unidades
                } else {
                    this.setVida(this.getVida() - 10);
                }


            } else {
                this.setVida(0);
                console.log("El personaje ha muerto");
                clearInterval(); // Aquí podrías detener el intervalo o manejar el estado de "muerto"
            }
            this.barraVida(); // Actualizamos la barra de vida en el canvas
        }, 2000);
    }

    borrar(tiempo) {
        setTimeout(() => {
            var canvas = document.getElementById("contenedor");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + 99 + ".png";
            var cx = this.getX() + 40;
            var cy = this.getY() + 5;
            img.onload = function () {
                var intervalo = setInterval(() => {
                    ctx.clearRect(cx, cy - 10, img.width + 20, img.height + 20);
                    cx = cx + 10;
                    ctx.drawImage(img, cx, cy);
                    setTimeout(() => {
                        clearInterval(intervalo);
                    }, 1000);
                }, 20);
                //ctx.drawImage(img, cx, cy);
            };
        }, tiempo);
    }
    punio(brazo) {
        if (brazo == "izquierda") {
            this.cargarPersonaje(25);
            setTimeout(() => {
                this.cargarPersonaje(12);
            }, 300);
        } else {
            this.cargarPersonaje(26);
            setTimeout(() => {
                this.cargarPersonaje(12);
            }, 300);
        }

    }
    ultimate() {
        if (this.getKi() >= 160) {
            if (this.getY() == 400) {
                this.cargarPersonaje("03");
                setTimeout(() => {
                    this.cargarPersonaje("05");
                }, 100);
                setTimeout(() => {
                    this.cargarPersonaje("06");
                }, 200);
                setTimeout(() => {
                    this.cargarPersonaje("07");
                }, 300);
                setTimeout(() => {
                    this.cargarPersonaje("08");
                }, 400);
                setTimeout(() => {
                    this.cargarPersonaje(99);
                }, 500);
                setTimeout(() => {
                    this.setY(this.getY() - 150);
                    this.cargarPersonaje(91);
                }, 550);
                setTimeout(() => {
                    this.cargarPersonaje(92);
                }, 700);
                setTimeout(() => {
                    this.cargarPersonaje(93);
                }, 1500);
                setTimeout(() => {
                    this.cargarPersonaje(94);
                }, 1800);
                setTimeout(() => {
                    this.cargarPersonaje(95);
                }, 2000);
                setTimeout(() => {
                    this.cargarPersonaje(12);
                }, 2400);


                setTimeout(() => {
                    this.cargarPersonaje("03");
                }, 2500);
                setTimeout(() => {
                    this.cargarPersonaje("05");
                }, 2600);
                setTimeout(() => {
                    this.cargarPersonaje("06");
                }, 2700);
                setTimeout(() => {
                    this.cargarPersonaje("07");
                }, 2800);
                setTimeout(() => {
                    this.cargarPersonaje("08");
                }, 2900);
                setTimeout(() => {
                    this.cargarPersonaje(99);
                }, 3000);
                setTimeout(() => {
                    this.setY(this.getY() + 150);
                    this.cargarPersonaje(12);
                }, 3100);

            }

            setTimeout(() => {
                //this.cargarPersonaje(80);
            }, 200);
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
    asignarPersonajes(personaje) {
        Personaje.vectorPersonajes.push(personaje);
    }
    borrarMovimiento() {
        
            var canvas = document.getElementById("contenedor");
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = "MATERIALES/" + this.getNombre() + "/" + this.getNombre() + "_" + 99 + ".png";
            var cx = this.getX() ;
            var cy = this.getY() ;
            img.onload = function () {
                ctx.clearRect(cx, cy, img.width , img.height );
                ///cx = cx + 10;
                //ctx.drawImage(img, cx, cy);
                //ctx.drawImage(img, cx, cy);
            };
    
    }
}