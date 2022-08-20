//se declara el módulo requerido
const mongoose = require("mongoose");

//Se hace la función de conexión
const db_connection = async () => {
    try {
     await  mongoose.connect(process.env.DB_CONNECTION_STRING,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
          //  useCreateIndex:true
        });
        console.log("DB Online");
    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar DB");
    }
}

module.exports={
    db_connection
}  