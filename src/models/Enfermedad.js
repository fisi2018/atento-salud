const mongoose=require("mongoose");
const enfermedadSchema=new mongoose.Schema({
    codeEnfermedad:{
        type:String,
        trim:true,
        required:true
    },
    nombreEnfermedad:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
});
module.exports=mongoose.models.EnfermedadModel || mongoose.model("EnfermedadModel",enfermedadSchema);