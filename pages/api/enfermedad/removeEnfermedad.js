import dbConnect from "../../../utils/dbConnect";
dbConnect();
const EnfermedadModel=require("../../../models/Enfermedad");
const PacienteMdModel=require("../../../models/Paciente");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const paciente=await PacienteMdModel.findOne({codEnfermedad:id});
        if(paciente)return res.status(200).send({
            message:"Existe un paciente registrado con esta enfermedad, no es posible realizar esta acción",
            error:true
        })
        const enfermedad=await EnfermedadModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"Enfermedad removida exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}