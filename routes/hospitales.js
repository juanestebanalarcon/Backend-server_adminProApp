const { Router } = require("express");
const router = Router();
const {check} = require("express-validators");
const { getHospitales, actualizarHospitales, crearHospitales, eliminarHospitales } = require("../controllers/hospitales");
const { validarCampos,validarJWT } = require("../middlewares/validar-campos");

router.get("/",[
],getHospitales);
router.put("/:id",[

],actualizarHospitales);
router.post("/crear-hospital",[
    validarJWT,
    check("nombre","Obligatorio").not().isEmpty(),
    validarCampos
],crearHospitales);
router.delete("/:id",eliminarHospitales);
router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarHospitales
);

module.exports=router;