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

// CORS (para la conexión con el Frontend)

// Añadir prefijos a rutas / Cargar rutas
app.use("/api", articleRoutes);

// Exportar modulo (fichero actual)
module.exports = app;
