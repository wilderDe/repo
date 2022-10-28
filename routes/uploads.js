const { Router } = require("express");
const { actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads");



const router = Router();
router.put('/:coleccion/:id', actualizarImagenCloudinary);
//router.put('/:coleccion/:id', actualizarImagen);
router.get('/:coleccion/:id', mostrarImagen);


module.exports = router;