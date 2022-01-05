import dbConnect from "../../../utils/dbConnect";
dbConnect();
const PacienteMdModel=require("../../../models/Paciente");
const CamaFinalModel=require("../../../models/Cama");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const cama=await CamaFinalModel.findOne({nombrePaciente:id});
        if(cama) return res.status(200).send({
            message:`El paciente se encuentra registrado en la cama: ${cama.codeCama}, primero debe cambiar el estado de la cama`,
            error:true
        })
        const paciente=await PacienteMdModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"Paciente removido exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}