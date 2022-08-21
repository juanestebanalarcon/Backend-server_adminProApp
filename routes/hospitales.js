const { Router } = require("express");
const router = Router();
const {check} = require("express-validators");
const { getHospitales, actualizarHospitales, crearHospitales, eliminarHospitales } = require("../controllers/hospitales");
const { validarCampos } = require("../middlewares/validar-campos");

router.get("/",[
],getHospitales);
router.put("/:id",[

],actualizarHospitales);
router.post("/crear-hospital",crearHospitales);
router.delete("/:id",eliminarHospitales);

module.exports=router;