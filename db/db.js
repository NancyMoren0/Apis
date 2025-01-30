import mongoose from "mongoose";
import { mensaje } from "../libs/mensajes.js";

export async function conectaDB () {
    try {
        const conexion = await mongoose.connect("mongodb://localhost:27017/MongoDBApp");// trabajar offline
        //const conexion = await mongoose.connect("mongodb+srv://mariamsti23:root@classweb.too34.mongodb.net/?retryWrites=true&w=majority&appName=MongoDBApp");
       // console.log(conexion);
        
        console.log("Conexion correcta a monngoDB");
        return mensaje(200,"Conexion ok")
    } catch (error) {
        return mensaje(400,"Error al conectarse a la DB",error);

        
    }
    
}

//conectaDB();