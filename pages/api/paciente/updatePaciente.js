import dbConnect from "../../../utils/dbConnect";
dbConnect();
const PacienteMdModel=require("../../../models/Paciente");
export default async function handler(req,res){
    try{
        const {id,codAsegurado,fecha,hora,mes,year,codEnfermedad,doctor}=req.body;
        const response=await PacienteMdModel.findByIdAndUpdate(id,{codAsegurado,fecha,hora,mes,year,codEnfermedad,doctor});
        res.status(200).send({
            message:"Paciente actualizado correctamente"
        })
    }catch(err){
        console.log("error update ",err);
    }
}