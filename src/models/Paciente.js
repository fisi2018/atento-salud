const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;
const pacienteSchema=new mongoose.Schema({
    codAsegurado:{
        type:ObjectId,
        ref:"UserModel"
    },
    fecha:{
        type:String,
        trim:true,
        required:true
    },
    hora:{
        type:String,
        trim:true,
        required:true
    },
    mes:{
        type:String,
        trim:true,
        required:true
    },
    year:{
        type:String,
        trim:true,
        required:true
    },
    codEnfermedad:{
        type:ObjectId,
        ref:"EnfermedadModel"
    },
    doctor:{
        type:ObjectId,
        ref:"DoctorModel"
    }
},{
    timestamps:true,
    versionKey:false
});
module.exports= mongoose.models.PacienteMdModel || mongoose.model("PacienteMdModel",pacienteSchema);