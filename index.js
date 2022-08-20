const express = require("express");
const {db_connection} = require("./DB/dbConfig");
require("dotenv").config();
const cors = require("cors");

const app = express();
//Configurar cors
app.use(cors());
//database
db_connection();
//especificar rutas hijas/padre
app.use("api/usuarios",require("./routes/usuarios"));



app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en el puerto 9000");
})