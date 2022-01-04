import dbConnect from "../../../utils/dbConnect";
dbConnect();
const CamaFinalModel=require("../../../models/Cama");
const PacienteMdModel=require("../../../models/Paciente");
export default async function handler(req,res){
    try{
        const response=await CamaFinalModel.find().populate("nombrePaciente","codAsegurado fecha codEnfermedad doctor");
        res.status(200).send(response);
    }catch(err){
        console.log("error en request ",err);
    }
}