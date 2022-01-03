import dbConnect from "../../../utils/dbConnect";
dbConnect();
const EnfermedadModel=require("../../../models/Enfermedad");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const enfermedad=await EnfermedadModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"Enfermedad removida exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}