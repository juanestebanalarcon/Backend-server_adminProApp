const { Router } = require("express");
const router = Router();
const {check} = require("express-validators");
const { getMedicos, actualizarMedico, crearMedico, eliminarMedico } = require("../controllers/medicos");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.get("/",[
],getMedicos);
router.put("/:id",[

],actualizarMedico);
router.post("/crear-medico",[
    validarJWT,
    check("nombre","Nombre de médico es obligatorio").not().isEmpty(),
    check("hospital","Id de hospital es obligatorio").isMongoId(),
    validarCampos
],crearMedico);
router.delete("/:id",eliminarMedico);

module.exports=router;