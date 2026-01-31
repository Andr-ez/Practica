var Usuario = /** @class */ (function () {
    function Usuario(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    Usuario.prototype.saludar = function () {
        console.log("Hola, soy ".concat(this.nombre));
    };
    Usuario.prototype.getEdad = function () {
        return this.edad;
    };
    return Usuario;
}());
var u1 = new Usuario("Andrés", 25);
u1.saludar();
console.log("Edad:", u1.getEdad());
