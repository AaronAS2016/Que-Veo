//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var obtenerPeliculasControlador = require("./controladores/obtenerPeliculasControlador")
var obtenerInformacionPeliculaControlador = require("./controladores/obtenerInformacionPeliculaControlador")
var obtenerRecomendacionControlador = require("./controladores/obtenerRecomendacionControlador")

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/peliculas', obtenerPeliculasControlador.buscarPeliculas);
app.get('/generos', obtenerPeliculasControlador.buscarGeneros);
app.get('/peliculas/recomendacion', obtenerRecomendacionControlador.buscarRecomendacion);
app.get('/peliculas/:id', obtenerInformacionPeliculaControlador.buscarInformacion);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

