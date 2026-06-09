# Apuntes CSS

Para poder dar estilo a tags en html, es necesario identificalors en un archivo .cs y posteiormente darle atributos. 

Para esto se utiliza class y id. Tanto los dos permiten dar estilo a los tags pero por ejemplo un tag que tenga un id, solo se podra modificar ese tag nada mas. 

En cambio con class, se pueden tener multiples tags con un mismo class y aun asi cambiaran, por lo tanto un id es unico pero class pueden ser varios

Por ejemplo teniendo 

<h1 class= "first"> </h1>
<h2 class="first"> </h2>

CSS:

.first {
    size: 18 px
}

En este caso h1 y h2 cambiaran a ese size

<h1 id="first"> </h1>
<h2 id="Second"> </h2>

#first {
    size: 18 px
}

Aqui solo cambiaria el h1 y no h2


Atributos basicos de CSS

# Colores y apariencia
color: color de texto
background-color: color del fondo
opacity: transparencia

# Texto
font-size: tamaño de letra
font-family: tipo de fuente
font-weigth: Grosor, bold
text-align: Alineacion del texto
text-decoration: Quitar subrayado

# Tamaño
width: Ancho
height: altura
max-width: maximo de anchura

# Espaciado
margin: espacio exterior
padding: espacio interior
gap: espacio entre elementos si estan en un mismo container

# Bordes
border: borde completo
border-radius: Redondear esquinas



# Flexbox y posicion
display: Como se comporta un elemento
    flex: Como inlinea pero pone en fila y facilita alinearlos
    inline: se quedan en la misma linea los elementos
    block: Cada elemento ocupa toda una linea, entonces cada elemento que tenga esto se ponen por debajo
    grid: Hace cuadriculas de elementos

justify-content: Alineacion horizontal
align-items: Alineacion vertical
    flex-star: respeta los tamaños de los elementos, por ejemplo cuando se utiliza display flex, acomoda horontalmente y alinea con tamaño tambien,
               haciendo que a veces cambie de tamaño un elemento que no se queire que cambie por el flex, por lo tanto se utiliza flex-start para que respete
               la alineacion horizontal de flex pero respetando tamaños

position: Controla como se puede mover un objeto
    relative: Elemento se mueve respecto a su posicion original
    
    absolute: Aqui se puede mover libremente, es absoluto, es como poner en cualquier parte de la pagina
    
    fixed: se queda pegado incluso si se hace scroll

Estos son usados junto a position, depende del atributo dado, se puede mover diferentemente.
top
bottom
left
right

# Demas
box-shadow: Sombras
transition: Animaciones suaves
oveerflow-x o y: Pueda decirle al browser que no muestre cosas horizntales o verticales demas


