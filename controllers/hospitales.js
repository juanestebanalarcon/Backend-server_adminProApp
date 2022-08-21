const { response } = require("express");
const Hospital = require("../models/hospital");


const getHospitales=(req,res=response)=>{
    try{
        const hospitales_ = await Hospital.find().populate("usuario","nombre email");
        if(hospitales_){
            res.status(200).json({ok:true,hospitales_});
        }else{
            res.status(404).json({ok:false,msg:"Not found"});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({ok:false,msg:"Error interno en el servidor."});
    }

}
const crearHospitales=(req,res=response)=>{
    const uid = req.uid;
    const hospital = new Hospital({usuario:uid,...req.body});

    try{
        hospitalDB = await hospital.save();
        res.status(200).json({ok:true,hospital:hospitalDB})
    }catch(e) {
        console.log(e);
        res.status(500).json({ok:false,msg:"Error interno en el servidor."});
    }
}
const actualizarHospitales = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );


        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const eliminarHospitales=(req,res=response)=>{
    
    const id  = req.params.id;
    
    try {
        
        const hospital = await Hospital.findById( id );
    
        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }
    
        await Hospital.findByIdAndDelete( id );
    
    
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    eliminarHospitales
}