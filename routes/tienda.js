const { Router } = require("express");
const { tiendaGet, tiendaPost, tiendaPut, tiendaBusquedaGet, tiendaGetCliente, totalesGet, InformeTecnico, tiendaDelete } = require("../controllers/tienda");


const router = Router();

//crud de un cliente
router.get('/', tiendaGet )
router.get('/cliente/:id', tiendaGetCliente)
router.post('/',tiendaPost)
router.put('/:id', tiendaPut)
router.delete('/:id',tiendaDelete)

//extras de la seccion cliente
router.get('/buscar/:termino', tiendaBusquedaGet,)
router.get('/total',totalesGet)
router.get('/tecnico/:nombre/:start/:end',InformeTecnico)


module.exports = router