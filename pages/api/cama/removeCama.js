import dbConnect from "../../../utils/dbConnect";
dbConnect();
const CamaFinalModel=require("../../../models/Cama");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const cama=await CamaFinalModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"cama removida exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}