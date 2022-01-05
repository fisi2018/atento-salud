import dbConnect from "../../../utils/dbConnect";
dbConnect();
const UserModel=require("../../../models/User");
const PacienteMdModel=require("../../../models/Paciente");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const paciente=await PacienteMdModel.findOne({codAsegurado:id});
        console.log("paciente ",paciente);
        if(paciente){
            return res.status(200).send({
                message:"Este usuario es un paciente actualmente, no es posible removerlo ahora",
                error:true
            })
        }
        const user=await UserModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"Usuario removido exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}