# Apuntes HTML

<html lang="en-US"> Inicias el archivo html para dar estructura
<head> Es como inicializas o configuras inicialmente el html
<!doctype html> Simplemente un encabezado que va en los html que permite al browser dar un renderizado correcto
<meta> Una etiqueta que sirve para aportar informacion sobre el documento.
    
    En estos se asocia lo siguiente mas relevante
    lang = lenguaje del contenido
    name = nombre a la que se asocia la informacion
    content = los datos que se quieren asociar a name
    charset = "UTF-8" basicamente le dice al browser como interprete los datos, en este caso UTF-8 se refiere utilizas los simbolos y letras de UTF-8

<h1> to <h6> Just headers o titles in the web
<input> Just an input for the user to send information

    As same as meta, has differente attributes that can change the style or structure of the input as:

    id=Just an identifier that we can use on JS
    type=Identify the type of data that the user is sending. Is fundamental using the correct type for JS, in other words, if you are entering numbers, you need to change type to numbers as: type="number"
    required minlength= Just a minimun level of characters can be storage in the input
    placeholder= the description of the input
    size= As the name suggests, the size of the input

<table> Allows to create tables on html

    border= Defines if the table will have a border and if it has it, you can specify how much width would have te table
    id= As others tags, you can use an ID to use that table on JS

    <thead> Group the rows of the headers. Tells to the browser "this is the header of the table" so you can infer that th goes inside of thead

    <th> = Just the headers of the table. As other tags you can use ids

    <tbody> Otherwise, this groups the data rows. Here is where JS is going to introduce all the dynamic data


<img src = "example"/> This allows you to bring images to the html

# Linkeo de JSS y CSS en HTML

Para hacer el linkeo, en el head del html es necesario poner de dos tags en el head del archivo

<script> Para JS
<link> Para CSS

Ejemplos:

<script src = "codigo.js"> </script>
<link rel="stylesheet" href = "style.css"/> 

