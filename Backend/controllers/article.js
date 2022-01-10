"use strict";
const validator = require("validator");
const { validate, exists } = require("../models/article");
const Article = require("../models/article");

const { param } = require("../routes/article");

const fs = require("fs");
const path = require("path");

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
  getArticles: (req, res) => {
    var query = Article.find({});
    var last = req.params.last;
    if (last || last != undefined) {
      query.limit(5);
    }
    //Find para sacar los datos de la base de datos
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los articulos",
        });
      }
      if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "Articles not found!",
        });
      }
      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },
  getArticle: (req, res) => {
    // Recoger el id de la url
    var articleId = req.params.id;

    // Comprobar que existe
    if (!articleId || articleId == null || articleId == undefined) {
      return res.status(404).send({
        status: "error",
        message: "Article not found!",
      });
    }

    // Buscar el articulo
    Article.findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(404).send({
          status: "error",
          message: "No existe el articulo",
        });
      }
      // Devolver el json
      return res.status(200).send({
        status: "success",
        article,
      });
    });
  },
  update: (req, res) => {
    // Recoger el id del articulo por la URL
    var articleId = req.params.id;

    // Recoger los datos que llegan por PUT
    var params = req.body;

    //Validar los datos
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(403).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    if (validate_title && validate_content) {
      //Si estan validos, Find and Update
      Article.findOneAndUpdate(
        { _id: articleId },
        params,
        { new: true },
        (err, articleUpdated) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error al actualizar",
            });
          }
          if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "No existe el articulo",
            });
          }
          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
    } else {
      return res.status(403).send({
        status: "error",
        message: "Validacion no es correcta",
      });
    }
  },
  delete: (req, res) => {
    // Recoger el id de la URL
    var articleId = req.params.id;

    // Find & Delete
    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar",
        });
      }
      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha borrado el articulo, posiblemente no exista",
        });
      }
      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },
  upload: (req, res) => {
    // Configurar el modulo connect multiparty: router/article.js(hecho)

    // Recoger el fichero de la peticion
    var file_name = "Imagen no subida...";

    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }

    // Conseguir el nombre y la extension del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split("/");

    // Nombre del archivo
    var file_name = file_split[2];

    // Extension del fichero
    var extension_split = file_name.split(".");
    var file_extension = extension_split[1];

    // Comprobar la extension, solo imagenes, si no es válida, borrar el fichero
    if (
      file_extension != "png" &&
      file_extension != "jpg" &&
      file_extension != "gif"
    ) {
      // Borramos el archivo
      fs.unlink(file_path, (err) => {
        return res.status(500).send({
          status: "error",
          message: "La extension de la imágen no es válida",
        });
      });
    } else {
      // obtenemos el id del articulo que viene por URL
      var articleId = req.params.id;

      // Si todo es valido, buscar el articulo, asignarle el nombre de la impagen y actualizarlo
      Article.findOneAndUpdate(
        { _id: articleId },
        { image: file_name },
        { new: true },
        (err, articleUpdated) => {
          if (err || !articleUpdated) {
            return res.status(500).send({
              status: "error",
              message: "Error al guardar la imágen de articulo",
            });
          }
          return res.status(200).send({
            status: "success",
            article: articleUpdated,
          });
        }
      );
    }
  }, // end upload
  getImage: (req, res) => {
    // Obtenemos la imagen que nos llega por la URL
    var file = req.params.image;

    // Obtenemos el path
    var file_path = "./upload/articles/" + file;

    // Si existe, devolver la imágen
    fs.exists(file_path, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(file_path));
      } else {
        return res.status(404).send({
          status: "error",
          message: "Imágen no existe",
        });
      }
    });
  },
  search: (req, res) => {
    // Sacar el string a buscar
    var searchString = req.params.search;

    // Find or
    Article.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: "Error en la petición !!!",
          });
        }

        if (!articles || articles.length <= 0) {
          return res.status(404).send({
            status: "error",
            message: "No hay articulos que coincidan con tu busqueda !!!",
          });
        }

        return res.status(200).send({
          status: "success",
          articles,
        });
      });
  },
}; // end controller

module.exports = controller;
