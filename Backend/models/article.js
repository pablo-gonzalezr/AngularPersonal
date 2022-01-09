"use strict";

const moongose = require("mongoose");
const Schema = moongose.Schema;

const ArticleSchema = Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  image: String,
});

module.exports = moongose.model("Article", ArticleSchema);

//articles --> guarda documentos de este tipo y estructura dentro de la colección
