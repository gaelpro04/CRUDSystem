# Apuntes JS

# Clases
Para elaborar clases en JS, es mas permisivo que Java.

en un mismo codigo JS se puede hacer un objeto, se compone de:

class Objeto {

}

Casi igual que con Java solamente no se le pone la seguridad de la clase.

Solo es necesario el constructor sin el tipo de datos y al igual que Java, se puede utilizar this.

constructor(dato1, dato2, dato3, dato4) {
    this._dato1 = dato1;
    this._dato1 = dato1;
    this._dato1 = dato1;
    this._dato1 = dato1;
}

Es buena practica usar _variable en los atributos para que no haya concurrencia en metodos.

Otra cosa es que no es necesari oahcer setters y getters, JS lo maneja solo. Amenos de que se quiera agregar logica extra a una funcion, ahi si esta justificado agregar explicitamente un setter y getter

Por otro lado para hacer metodos de getters y setters es necesario un prefijo como lo es: "set" o "get" por ejemplo:

set dato1(newDato1) {
    this._dato1 = newDato1;
}

get dato1() {
    return this._dato1;
}

Para hacer metodos privados se utiliza "#"

#metodoPrivado(dato5) {
    //codigo 
}

# Obtener elementos del HTML (DOMcontentloader)

# document.getElementByID();


# document.querySelector();
Para obtener elementos se utiliza de querySelector.

Especificamente document.querySelector.
Eso permite agarrar un elemento del html para poder manipularlo u obtener elementos. Ejemplo

let numero = document.querySelector("#variabl1");

Esto basicamente agarra el ID variabl1, algo a desatacar si sea ID o clase, es necesario ponerle su identificador es decir id: #, clase: .nombreDeClase

# document.querySelectorAll()
Se utiliza para obtener un conjunto de datos, la diferencia clara entre el metodo anterior es que solo agarra uno por uno, en cambio este agarra un conjunto de datos, por ejemplo cuando hay varios tags con la misma clase.

# addEventListener()

Esta funcion permite crear eventos o manejar eventos para elementos del HTML o cuando ocurre una accion por parte del usuario. Basicamente esta funcion permite crear una funcion a partir de un evento realizado. Con otras palabras, responde la pregunta a que se hace cuadno pasa cierto evento. Sintaxis:

addEventListener(type, listener)
addEventListener(type, listener, options)
addEventListener(type, listener, useCapture)

Donde type es evento, listener la funcion que se ejecuta

# createElement y Delegation

En vez de usar innerHTML += es mejor usar createElement ya que al usar inner eliminas los listeners que tenia cada elemento, es como estar sobreescribiendo todos esos elementos. Por lo tanto se utiliza createElmenet() que permite no arruinar los listeners de demas elementos.

Por otro lado la tecnica delegation basicamente consiste en hacer en un listener en un elemento padre (contenedor de varios elementos) ue permita ser el escucha de sus hijos, de esta manera nunca se pierde los event listeners de los elementos dentro de del elemento padre

por ejemplo:

const button = event.target.closest("elemento");

const id = event.target.closest("elemento").dataset.id;


# setTimeOut

Funcion que permite correr cosas por asi decirlo en segundo plano sin que sea bloqueante para el front.

setTimeOut(() => {
    instruccion....
}, tiempo en milisegundos)

# localStorage

Permite guardar dato en la pagina de manera permanente bajo el almacenamiento del navegador. Es local por lo tanto en una sola laptop se guarda
el contenido. Por otro lado guarda el contenido en String, por lo tanto una vez cargando el contenido se debe parsear el contenido.

Para guardar contenido:

localStorage.setItem("clave", datos);

Para cargar contenido: 

localStorage.getItem("clave");


Por otro lado para parsear datos ya sea para carga o guardar datos se utiliza JSON, por ejemplo:


Para guardar datos en localStorage:
JSON.stringify(contenido);

Para cargar datos obtenidos desde localStorage:
JSON.parse(contenido);

Se utilizan en conjunto por lo tanto:

Carga:

let rawData = localStorage.getItem(clave);
rawData = rawData ? JSON.parse(rawData) : [];


Guardar:

localStorage.setItem("clave", JSON.stringify(contenido));




