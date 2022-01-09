"use strict";

const express = require("express");

const ArticleController = require("../controllers/article");

const router = express.Router();

// Rutas de prueba
router.get("/test", ArticleController.test);
router.post("/datosCurso", ArticleController.datosCurso);

// Rutas para articulos
router.post("/save", ArticleController.save);

module.exports = router;
