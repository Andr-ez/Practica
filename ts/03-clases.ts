class Usuario {
  public nombre: string;
  private edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar(): void {
    console.log(`Hola, soy ${this.nombre}`);
  }

  getEdad(): number {
    return this.edad;
  }
}

const u1 = new Usuario("Andrés", 25);
u1.saludar();
console.log("Edad:", u1.getEdad());
