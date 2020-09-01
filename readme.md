## Notas al momento de clonar el repositorio.
En el repositorio van a encontrar todos los archivos que usemos en clase. Los proyectos se suben al repositorio `sin la carpeta /node_modules`.

Para que los proyectos vuelvan a tener la carpeta `/node_modules` deben:
1. Abrir una terminal.
2. Verificar que están con la terminal posicionados en la carpeta raíz del proyecto.
3. Ejecutar el comando `npm install`.

Para iniciar el proyecto en la terminal, posicionada en la carpeta raíz del proyecto ejecuten el comando:
`nodemon start` 

## ¿Cómo organizarnos con los archivos y el modelo MVC?  
Siempre comenzamos por identificar cuales serán las `rutas` de nuestro proyecto. Las `rutas` son las urls que recibirá el navegador en su barra de direcciones. Recuerden que las urls puede escribirse a mano y también se encuentras en el atributo `href=""` de las etiquetas `<a hrref=""> Este es un link </a>`.  

En `app.js` definimos las rutas principales.  

En los archivos `/routes/nombre_del_archivo.js` van las subrutas de navegación. Los conocemos como los archivos manejadores de rutas o `ruteadores`. Cada ruta invocará un método dentro de un controlador.  

Las lógicas del sistema estarán manejadas por los `controladores`. Cada uno de ellos tendrá sus métodos, gestionará datos y podrá definir cual es la vista que envía al navemétodos dentro de archivos controla.
Los archivos de vistas se ecuentran en la carpeta `/views`. Tienen extensión `.ejs` porque son gestionados por el motor de vistas EJS.
