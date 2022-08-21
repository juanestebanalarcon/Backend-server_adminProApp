const { response } = require("express");
const Medico = require("../models/medico");



const getMedicos=(req,res=response)=>{
    try{
        const medicos_ = await Medico.find().populate("usuario","nombre img").populate("hospital","nombre img");;
        if(medicos_){
            res.status(200).json({ok:true,medicos_});
        }else{
            res.status(404).json({ok:false,msg:"Not found"});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({ok:false,msg:"Error interno en el servidor."});
    }

}
const crearMedico=(req,res=response)=>{
    const uid = req.uid;
    const medico = new Medico({usuario:uid,...req.body});

    try{
        medicoDB = await medico.save();
        res.status(200).json({ok:true,hospital:medicoDB});
    }catch(e) {
        console.log(e);
        res.status(500).json({ok:false,msg:"Error interno en el servidor."});
    }
}
const actualizarMedico = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );


        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarMedico = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}