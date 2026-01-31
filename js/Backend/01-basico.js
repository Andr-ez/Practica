const usuarios = [
  { nombre: "Andrés", edad: 25 },
  { nombre: "Laura", edad: 17 },
  { nombre: "Carlos", edad: 32 }
];

usuarios.forEach(u => {
  if (u.edad >= 18) {
    console.log(u.nombre + " es mayor de edad");
  } else {
    console.log(u.nombre + " es menor de edad");
  }
});
