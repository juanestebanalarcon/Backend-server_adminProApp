const {response}=require('express');
const Usuario = require('../models/usuario');
const bcrypt=require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const CrearUsuario = async(req,res=response) => {
    const {name,email,password}=req.body;
    try {
        //Verificar email:
        const usuario=await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({ok:false,msg:"El usuario ya existe con ese email."});
        }

        //Crear usuario con el modelo
        let dbUser=new Usuario(req.body);

        //Hash a la contraseña
        const salt=bcrypt.genSaltSync();
        dbUser.password=bcrypt.hashSync(password,salt);
        //Generar JWT
        const token= await generarJWT(dbUser.id,name);
        //Crear usuario de base de datos
        await dbUser.save();
        //Generar respuesta
        return res.status(201).json({ok:true,uid:dbUser.id,name,email,token});

    } catch (error) {       
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error interno del servidor.'
        });
    }
    

}

const loginUsuario= async(req,res=response) => {
    const {email,password}=req.body;
    try {
     const userDB=await Usuario.findOne({email});
     if(!userDB){
         res.status(400).json({ok:false,msg:'El correo no existe.'})
     }
     //Confirmar si el password hace match
     const validPassword=bcrypt.compareSync(password,userDB.password);
     if(!validPassword){
        res.status(400).json({ok:false,msg:'El password no es válido.'})
     }
     //Generar JWT
     const token= await generarJWT(userDB.id,userDB.name,userDB.email);
     //Respuesta del servicio
     return res.json({ok:true,uid:userDB.id,name:userDB.name,email,token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false,msg:'Error interno del servidor'})
    }
}

const revalidarToken= async(req,res) => {
    const {uid}=req;
    //Leer db
    const dbUser=await Usuario.findById(uid);
    //Re-generar el Token:
    const token= await generarJWT(uid,dbUser.name);
    return res.json({
        ok:true,
        uid,
        name:dbUser.name,
        email:dbUser.email,
        token
    });
}
const getUsuarios=(req,res=response)=>{
    const usuarios = usuario.find();
    return res.status(200).json({
        ok:true,
        usuarios
    })
}

module.exports={
    CrearUsuario,
    loginUsuario,
    revalidarToken,
    getUsuarios
}