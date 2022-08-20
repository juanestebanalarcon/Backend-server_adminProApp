const { Router } = require("express");
const { getUsuarios } = require("../controllers/usuarios");
const router = Router();

router.get("/",getUsuarios);
router.post("/crear-usuario");

module.exports=router;