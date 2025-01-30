import { Router } from "express";
import {login,register,obtenerUsuarios,buscarUsuarioPorId,eliminarUsuario,actualizarUsuario } from "../db/usuariosDB.js"
const router = Router();


router.get("/usuarios", async(req, res) => {
    const respuesta = await obtenerUsuarios();
    res.status(respuesta.status).json({
        mensaje: respuesta.mensajeUsuario,
        usuarios: respuesta.datos
    });
});

router.get("/buscarUsuarioPorId/:id", async(req, res)=>{
    const respuesta = await buscarUsuarioPorId(req.params.id);
    res.status(respuesta.status).json({
        mensaje: respuesta.mensajeUsuario,
        usuario: respuesta.datos
    });
});

router.delete("/eliminarUsuario/:id", async(req, res)=>{
    const respuesta = await eliminarUsuario(req.params.id);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});


router.put("/actualizarUsuario/:id", async(req, res)=>{
    const respuesta = await actualizarUsuario(req.params.id, req.body);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});


router.post("/login", async(req,res)=>{
    const respuesta=await login(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/salir", async(req, res)=>{
    res.json("Estas en salir");
});

router.get("/usuariosLogueados", async(req, res)=>{
    res.json("Usuarios convencionales y administradores logueados");
});

router.get("/administradores", async(req, res)=>{
    res.json("Solo administradores logueados");
});

router.get("/cualquierUsuario",async(req,res)=>{
    res.json("Todos pueden entrar sin loguearse");
});

router.post("/registro", async(req, res)=>{   //en respuesta llega todo 
    const respuesta = await register(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});



export default router;