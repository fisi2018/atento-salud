import dbConnect from "../../../utils/dbConnect";
dbConnect();
const PacienteMdModel=require("../../../models/Paciente");
export default async function handler(req,res){
    try{
        const {codAsegurado,fecha,hora,mes,year,codEnfermedad,doctor}=req.body;
        console.log("antes de crear ");
        const paciente=new PacienteMdModel({codAsegurado,fecha,hora,mes,year,codEnfermedad,doctor});
        console.log("dsps de crear ");
        paciente.save();
        res.send(
            {
                message:"Paciente agregado"
            }
        )
    }catch(err){
        console.log("error ",err);
    }
}