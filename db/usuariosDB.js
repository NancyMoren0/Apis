import User from "../models/usuariosModelo.js";
import { encriptarPassword, validarPassword} from "../middlewares/funcionesPassword.js";
import { mensaje } from "../libs/mensajes.js";
import { crearToken } from "../libs/jwt.js";
//import { crearToken } from "../libs/jwt.js";

export const register = async ({username, email, password})=>{
try{
    //console.log("hola "+username);
    //console.log("hola "+email);
    //console.log("hola "+password);
    const usuarioDuplicado= await User.findOne({username});
    //console.log(usuarioDuplicado);
    
    const emailDuplicado= await User.findOne({email});
    //console.log(emailDuplicado);
    
    if(usuarioDuplicado || emailDuplicado){
        return mensaje(400,"EL usuario ya existe");
    }
    //console.log("----------------");
    
    const {salt, hash} = encriptarPassword(password);
    //console.log(salt);
    //console.log(hash);
    const dataUser = new User({username, email, password:hash,salt});
    //console.log(data);
    
    const respuestaMongo = await dataUser.save(); //guardano en la base 
    //console.log(respuestaMongo);
    
    const token = await crearToken ({id:respuestaMongo._id});
    console.log(token);
    
    //const dataUser = new User({username, email, password:hash, salt});
    //await data.save();
    //console.log("Usuario registrado");
    return mensaje(200,"Usuario registrado","",token);
    
} catch(error) {
    return mensaje(400,"Error al registrar el usuario",error);

}
}


export const login =async({username,password})=>{
    try{
      const usuarioEncontrado= await User.findOne({username});
      //console.log(usuarioEncontrado.username);
      
      if(!usuarioEncontrado){
        return mensaje (400,"Datos incorrectos usu");
      }
      console.log(usuarioEncontrado.salt);
      
const passwordValido=validarPassword(password,usuarioEncontrado.salt,usuarioEncontrado.password);   //entrega un true o false 
if (!passwordValido) {
    return mensaje(400,"Datos incorrectos pass");
}
const token=await crearToken({id:usuarioEncontrado._id});
return mensaje (200,`Bienvenido ${usuarioEncontrado.username}`,"",token);

    }catch(error){
            return mensaje(400,"Datos incorrectos",error);
          }
    
}

// in this part,Exam for the 03,February

export const obtenerUsuarios = async () => {
    try {
        const usuarios = await User.find({}, {password: 0, salt: 0}); // Excluimos password y salt por seguridad
        if (usuarios.length === 0) {
            return mensaje(404, "No hay usuarios registrados");
        }
        return {
            status: 200,
            mensajeUsuario: "Usuarios encontrados",
            datos: usuarios
        };
    } catch (error) {
        return mensaje(400, "Error al obtener usuarios", error);
    }
}

export const buscarUsuarioPorId = async (id) => {
    try {
        const usuarioEncontrado = await User.findById(id);
        if(!usuarioEncontrado) {
            return mensaje(400, "Usuario no encontrado");
        }
        return {
            status: 200,
            mensajeUsuario: "Usuario encontrado",
            datos: usuarioEncontrado
        };
    } catch(error) {
        return mensaje(400, "Error al buscar el usuario", error);
    }
}

export const eliminarUsuario = async (id) => {
    try {
        const usuarioBorrado = await User.findByIdAndDelete(id);
        if(!usuarioBorrado) {
            return mensaje(400, "Usuario no encontrado");
        }
        return mensaje(200, "Usuario borrado correctamente");
    } catch(error) {
        return mensaje(400, "Error al eliminar el usuario", error);
    }
    
}


export const actualizarUsuario = async (id, { username, email, password }) => {
    try {
        // Si hay contraseña, la encriptamos
        let datosActualizar = { username, email };
        if (password) {
            const { salt, hash } = encriptarPassword(password);
            datosActualizar.password = hash;
            datosActualizar.salt = salt;
        }

        const usuarioActualizado = await User.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true }
        );

        if (!usuarioActualizado) {
            return mensaje(400, "Usuario no encontrado");
        }

        return mensaje(200, "Usuario actualizado correctamente");
    } catch (error) {
        return mensaje(400, "Error al actualizar el usuario", error);
    }
}
    