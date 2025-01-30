import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
username:{
    type:String,
    require:true,
    trim:true,          //si grega un espacio lo borra
    unique:true         //´para que no se repitan
},
email:{
    type:String,
    require:true,
    trim:true,
    unique:true
},
password:{
    type:String,
    require:true
},
salt:{
    type:String,
    require:true
}
},
{
    timestamps:true //agrega la fecha de cgreacion de registro y de actualizacion 
});

export default mongoose.model('User', userSchema);