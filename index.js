const express = require("express");
const {db_connection} = require("./DB/dbConfig");
require("dotenv").config();
const cors = require("cors");

const app = express();
//Configurar cors
app.use(cors());
app.use(express.json());
//database
db_connection();
//especificar rutas hijas/padre
app.use("api/usuarios",require("./routes/usuarios"));
app.use("api/hospitales",require("./routes/hospitales"));
app.use("api/login",require("./routes/auth"));
app.use("api/medicos",require("./routes/medicos"));
app.use("api/todo",require("./routes/busquedas"));



app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en el puerto 9000");
})