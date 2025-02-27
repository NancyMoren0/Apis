import crypto from "crypto";

export function encriptarPassword(password){
    const salt = crypto.randomBytes(32).toString("hex"); //encriptar constraseña. 32 bites hexadecimal
    const hash = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    //console.log("salt "+salt);
    //console.log("hash "+hash);
    return{
        salt, 
        hash
    }
}

export function validarPassword(password, salt, hash){
    const hashEvaluar = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return hashEvaluar == hash
}

export function usuarioAutorizado(){

}

export function adminAutorizado(){

}

