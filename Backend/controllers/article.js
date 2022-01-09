"use strict";
const validator = require("validator");
const { validate } = require("../models/article");
const Article = require("../models/article");

const { param } = require("../routes/article");

const controller = {
  // Ruta de prueba
  datosCurso: (req, res) => {
    console.log("Hola mundo");
    return res.status(200).send({
      curso: "PLC del master TWCAM",
      alumno: "Pablo González",
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la acción test de mi controlador de articulos",
    });
  },

  save: (req, res) => {
    // Recoger parametros por POST
    const params = req.body;
    console.log(params);

    // Validar datos con libreria validator
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    if (validate_title && validate_content) {
      // Crear objeto a guardar
      var article = new Article();

      // Asignar valores
      article.title = params.title;
      article.content = params.content;
      article.image = null;

      // Guardar articulo
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            status: "error",
            message: "Articulo no de ha guardado",
          });
        }
        // Devolver respuesta
        return res.status(200).send({
          status: "success",
          article: articleStored,
        });
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "Datos no son validos",
      });
    }
  },
};

module.exports = controller;
