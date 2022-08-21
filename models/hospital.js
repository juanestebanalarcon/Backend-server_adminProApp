const {Schema,model} = require("mongoose");

const HospitalSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    usuario: {
        //así se hace relación
        type: Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    }
},{collection:"hospitales"});
UsuarioSchema.method("toJSON", function(){
 const {__v,...object} = this.toObject();
 return object;
})

module.exports= model("Hospital",HospitalSchema);