function saludar() {
     return 'Hola';
    // console.log('Hola');
};

// let saludar = () => 'Hola'; //declaración de función.
// saludar();
// console.log( saludar() + " Ale" );


// function multiplicar(valor1, valor2) {
//     return valor1 * valor2;
// };

let multiplicar = (valor1, valor2) => valor1 * valor2;

// console.log(multiplicar(90,2));

let calcularAniosPerrunos = edad => "Tu perro tiene " + (edad * 7) + " años perrunos";

console.log(calcularAniosPerrunos(2));



let celsiusAFahrenheit = temperatura => temperatura + '°C son ' + (temperatura *6) + '°F';


console.log(celsiusAFahrenheit(20));