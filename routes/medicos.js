const { Router } = require("express");
const router = Router();
const {check} = require("express-validators");
const { getMedicos, actualizarMedico, crearMedico, eliminarMedico } = require("../controllers/medicos");

const { validarCampos } = require("../middlewares/validar-campos");

router.get("/",[
],getMedicos);
router.put("/:id",[

],actualizarMedico);
router.post("/crear-medico",crearMedico);
router.delete("/:id",eliminarMedico);

module.exports=router;