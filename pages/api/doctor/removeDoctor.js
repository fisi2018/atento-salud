import dbConnect from "../../../utils/dbConnect";
dbConnect();
const DoctorModel=require("../../../models/Doctor");
const PacienteMdModel=require("../../../models/Paciente");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const paciente=await PacienteMdModel.findOne({doctor:id});
        if(paciente) return res.status(200).send({
            message:"Existe un paciente registrado con este médico, no es posible realizar esta acción",
            error:true
        })
        const doctor=await DoctorModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"Doctor removido exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}