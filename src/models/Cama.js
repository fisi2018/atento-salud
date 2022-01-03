const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;
const camaSchema= new mongoose.Schema({
    codeCama:{
        type:String,
        required:true,
        trim:true
    },
    estadoCama:{
        type:Boolean,
        required:true,
        default:false
    },
    nombrePaciente:{
        type:ObjectId,
        ref:"PacienteMdModel"
    }
},{
    timestamps:true,
    versionKey:false
});
module.exports=mongoose.models.CamaFinalModel || mongoose.model("CamaFinalModel",camaSchema);