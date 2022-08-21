const {Schema,model} = require("mongoose");

const MedicoSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    hospital: {
        //así se hace relación
        type: Schema.Types.ObjectId,
        ref:"Hospital"
    },
    usuario: {
        //así se hace relación
        type: Schema.Types.ObjectId,
        ref:"usuario"
    }
    
},{collection:"medicos"});
UsuarioSchema.method("toJSON", function(){
 const {__v,...object} = this.toObject();
 return object;
})

module.exports= model("Medico",MedicoSchema);