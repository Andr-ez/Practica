const usuarios = [
  { nombre: "Andrés", edad: 25, salario: 2000 },
  { nombre: "Laura", edad: 17, salario: 1500 },
  { nombre: "Carlos", edad: 32, salario: 3000 }
];

//MAP
const nombres = usuarios.map(u => u.nombre);
console.log("Nombres:", nombres);

//FILTER
const mayores = usuarios.filter(u => u.edad >= 18);
console.log("Mayores:", mayores);

//REDUCE
const totalSalarios = usuarios.reduce((acc, u) => acc + u.salario, 0);
console.log("Total salarios:", totalSalarios);

// ASYNC
function obtenerMensaje() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Proceso terminado"), 1500);
  });
}

async function main() {
  console.log("Iniciando...");
  const msg = await obtenerMensaje();
  console.log(msg);
}

main();