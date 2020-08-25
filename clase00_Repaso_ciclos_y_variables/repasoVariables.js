const persona = {
    name: "Mike",
    lastName:"Wazowski",
    age: 37,
};

let sites = ["Google", "Youtube"];

// console.log(persona, sites);
// persona = "Ale";
// console.log(persona);

persona.sites = sites;
// console.log(persona);

// Procesando cursos
// Generar un array con 6 elementos
// Cada elemento debe ser un objeto literal con las propiedades
// Nombre del curso
// Descripción del curso
// Cantidad de alumnos
// Array de días de la semana que se cursa
// ¿Se te ocurre cómo obtener el tercer curso ?
// ¿Se te ocurre cómo obtener el nombre del cuarto curso ?
// ¿Se te ocurre cómo agregarle un día de cursada al curso número 2 ?
//     Agregale a cada curso un array de alumnos
// Cada alumno debe ser un objeto literal con nombre y apellido
// ¿Cómo puedo obtener el nombre del primer alumno del curso 3 ?

let cursos = [
    {
        nombre:"curso 1" ,
        descripcion: "descripción curso 1",
        alumnos: ["ale", "agus", "gonza"],
        dias:["lun", "vie"]
    },
    {
        nombre: "curso 2",
        descripcion: "descripción curso 2",
        alumnos: ["ale", "agus", "gonza"],
        dias: ["lun", "vie"]
    },
    {
        nombre: "curso 3",
        descripcion: "descripción curso 3",
        alumnos: ["ale", "agus", "gonza"],
        dias: ["lun", "vie"]
    },
    {
        nombre: "curso 4",
        descripcion: "descripción curso 4",
        alumnos: ["ale", "agus", "gonza"],
        dias: ["lun", "vie"]
    }

]
// ¿Se te ocurre cómo obtener el tercer curso ?
console.log(cursos[2]);

// ¿Se te ocurre cómo obtener el nombre del cuarto curso ?
console.log(cursos[3].nombre);

// ¿Se te ocurre cómo agregarle un día de cursada al curso número 2 ?
cursos[1].dias.push("mar");
console.log(cursos[1]);