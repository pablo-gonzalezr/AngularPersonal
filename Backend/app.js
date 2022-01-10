"use strict";

// Cargar modulos de node para crear el servidor
const express = require("express");
const bodyParser = require("body-parser");

// Ejecutar express (http)
const app = express();

// Cargar ficheros rutas
const articleRoutes = require("./routes/article");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS para el acceso cruzado entre accesos (Llamar a la Api desde el Front)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Añadir prefijos a rutas / Cargar rutas
app.use("/api", articleRoutes);

// Exportar modulo (fichero actual)
module.exports = app;
