const { Router } = require("express");
const { getUsuarios, crearUsuarios, actualizarUsuario, BorrarUsuario } = require("../controllers/usuarios");
const router = Router();
const {check} = require("express-validators");
const { validarCampos } = require("../middlewares/validar-campos");

router.get("/",[
    check("nombre","Nombre es obligatorio").not().isEmpty(),
    check("password","Password es obligatorio").not().isEmpty(),
    check("email","Email es obligatorio").isEmail(),
    validarCampos,
],crearUsuarios);
router.put("/:id",[
    check("nombre","Nombre es obligatorio").not().isEmpty(),
    check("role","Password es obligatorio").not().isEmpty(),
    check("email","Email es obligatorio").isEmail(),
    validarCampos,
],actualizarUsuario);
router.post("/crear-usuario",getUsuarios);
//Endpoint: Login usuario:
router.post( '/log-in',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La es contraseña es obligatoria').isLength({min:8}),
    validarCampos
],loginUsuario);
//Endpoint: validar Token:
router.get('/re-validate-token',validarJWT,revalidarToken);
router.delete("/:id",BorrarUsuario);

module.exports=router;