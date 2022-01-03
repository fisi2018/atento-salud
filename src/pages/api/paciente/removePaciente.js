import dbConnect from "../../../utils/dbConnect";
dbConnect();
const PacienteMdModel=require("../../../models/Paciente");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const paciente=await PacienteMdModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"Paciente removido exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}