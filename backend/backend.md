# Apuntes Backend - NodeJS - Express

Para inicializar y hacer un hola mundo es este codigo inicial: 

////////////////////////////////////////////

const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

////////////////////////////////////////////

De acuerdo al codigo lo que hace el createServer y especificar el protrocolo por ejemplo HTTP. permite crear un servidor HTTP y lo regresa.

Cuando el servidor es seteado en el puerto y y hostname especificado, cuando el servidor este listo la funcion listen permite hacer saber que el servidor esta corriendo

Hay dos objetos esenciales para que se pueda manejar las llamadas mediante HTTP

1. Uno es el que permite dar detalles de las solicitudes, en el ejemplo de arriba no es usado pero se puede acceder a estas especificaciones de solicitudes

2. El seungo es usando para regresar datos del que envio la solicitud
En tal caso con:

res.statusCode = 200;

Esto permite una comunicacion exitosa

Ademas se utiliza:

res.setHeader('Content-type', 'text/plain');

Esto simplemente especifica el tipo de contenido. Ya por ultimo se cierra a respuesta con .end(), donde se puede aniadir contenido por ejemplo:

res.end('Hello World\n');

# package.json

El archivo .json se utiliza en proyectos, permite definir como esta configurado y describe como interactuan con tu apliacion y como se ejecuta.

# campos comunes

1. "name": "my-project"

Define el nombre del paquete, al publicarlo, sera el nombre con el que aparacera en el paquete. No debe tener mas de 214 caracteres, solo minusculas y debe ser amigable con URLs

2. "version": "1.5.0",

El campo de version es importante, indica cual es la version actual del software que describe el package.json

3. "author": "nomre correo link",
   "contributors": [{
        "name": "",
        "email": "",
        "url": ""
   }],

Son campos personas, que pueden ser una cadena en el formato  "Name <email> <url>", o un objeto con campos name, email, url. El correo electrónico y la URL son opcionales.

4. "main": "src/index.js",

El campo principal es una propiedad funcional del archivo package.json. Este define el punto de entrada a tu proyecto y, por lo general, el archivo que se utiliza para iniciarlo.

5. "scripts": {
    "start": "node index.js",
    "dev": "nodemon"
}

Es otro elemento funcional de metadatos. Recibe un objeto cuyas claves son los scripts que se pudene ejecutar npm run <scriptName>. Normalmente se trata de comandos de terminal.

6. "repository": {
    "type": "git",
    "url": "http://...."
}

7. "dependencies": {
    "express": "^4.16.4",
    "compression": "~1.7.4"
}

Este es uno de los campos mas importantes, probablemente la razon principal por la cual se necestia un package.json, aqui se enumeran todas las dependencias que se usan en el proyecto.

8. "devDependencies": {
  "nodemon": "^1.18.11"
}

Similar al dependencies solamente que son paquetes que solo se necesitan durante el desarrollo y no en produccion.

Para genere un archivo package.json, se utiliza *npm init* ara asegurar que se genere un archivo valido

# Fundamentos HTTP

El protocolo HTTP es cliente-servidor, por lo tanto hay un usuario,agente, pagina web que solicita datos, una peticion y el servidor se hace cargo de esta peticion y ya dependiendo si esta autorizada, "sirve" estos recursos solicitados

# Metodos HTTP

1. GET

El metodo get solicita una representacion de un recurso especifico. Las peticiones que usan el meotod GET solo deben recuperar datos

2. HEAD

Este metodo pide una respuesta identica a la de una peticion GET, pero sin el cuerpo de la respuesta

3. POST

El metodo POST se utiliza para enviar una entidad a un recurso en especifico, causando a menudo cambio en el estado o efectos secundarios en el servidor

4. PUT

El modo PUT reemplaza todas las representacion actuales del recurso de destino con la carga util de la peticion

5. DELETE

El metodo DELETE borra un recurso en especifico

6. CONNECT

El metodo CONNECT establece un tunel hacia el servidor identificando por el recurso

7. PATCH

El metodo PATCH es utilziado para aplicar modificaciones parciales aun recurso

# Codigos de estado HTTP

Se agrupan en cinco clases

1. Respuestas informativas (100-199)
2. Respuestas satisfactorias (200-299)

    200: OK
    La solicitud ha tenido exito

    201: Created
    La solicitud ha tenido exito y a creado un nuevo recurso.

    204: No Content
    La peticion se ha acompletado con extio pero su respeusta no tiene ningun contenido

3. Redirecciones (300-399)

4. Errores de los clientes (400-499)

    400: Bad Request
    El cliente mando datos invalidos/incompletos. Lo devuelves cuando falla tu validacion

    404: Not found
    El recurso no existe. Cuando piden/editan/borran una herramienta con un ID que no existe

5. Errores de los servidores (500-599)

    500: Internal Server Error
    Algo se reompio en el backend, por ejemplo una excepcion no manejada o erro de base de datos.

# Express y API REST (backend)

# Routing
Se refiere a como responden los extremos de una apliacacion a las peticiones de cliente.

Se define utilizando metodos del objeto Express app que corresponden a metodos HTTP

por ejemplo

app.get() para manejar solicitues GET
app.post() para manejar solicitudes POST

Estos metodos de enrutamiento especifican una funcion callback, llamada cuando la aplicacion recibe una peticion a la ruta especificada (endpoint). En otras palabras la aplicacion escucha para peticiones que coinciden con los metodos especificados.

Ejemplos de GET y POST

//////

// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});

//////

# Rutas de cadena

Las rutas de cadena coinciden exactamente con las peticiones justamente es donde se conecta el front mediante fetch a un URL y puesto junto un endpoint que el backend o en este caso las rutas de cadena reciben para hacer conexion. por ejemplo: 

app.get('/', (req, res) => {
  res.send('root');
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.get('/random.text', (req, res) => {
  res.send('random.text');
});

# CORS

CORS permite dar seguridad ente sesiones de peticiones entre cliente y servidor. Normalmente paginas maliciosas o sin seguridad puede hacer peticiones a escondidas a otros sitios usando una sesion. Como justamente el backend y frontend son origines distintos, por la misma razon el bloqueo del navegador.

CORS es la forma en que el navegador dice "tranquilo, si permito peticiones en este otro origen"


# API y Express (Backend)

Backend ocurrira toda la logica de datos, por lo tanto el frontens solamente seria por asi decirlo una "vista tonta" del contenido pero es en el backend donde los datos realmente tienen sentido.

Para empezar un servidor o backend es necesario importar las librerias express y cors

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

Posteriormente se utilizan de los siguientes metodos HTTP para hacer peticiones ya sea de cliente servidor o servidor a cliente

app.get //Servidor nanda datos a cliente
app.post //Cliente manda datos a servidor
app.put //Cliente quiere cambiar datos a servidor
app.delete //Cliente quiere eliminar un dato

La sintaxis para un endpoint utilizando ademas un metodo mencionado es:

app.get(endpoint, (req, res) => {
  contenido
});

Algo a tener e cuenta es que req es para recibir datos de clientes y res para mandar datos a cliente. Para esto existe varias convenciones o canales de como se manda info.

Por ejemplo req(recibe datos):

req.param.id; viene de la url, se envian pequenios datos
req.body; envia un JSON, puede ser un objeto o algo por el estilo
req.query; Envia texto.

Por ejemplo res(manda datos):

res.json(contenido); //Envia objetos
res.status(estado); envia estado o codigo de estado de la comunicacion
res.send(); envia texto


Para lanzar el backend es necesario 

app.listen(port => console.log(`listening on port ${port}`))





