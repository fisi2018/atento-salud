import dbConnect from "../../../utils/dbConnect";
dbConnect();
const EnfermedadModel=require("../../../models/Enfermedad");
export default async function Handler(req,res){
    try{
        const response=await EnfermedadModel.find();
        res.status(200).send(response);
    }catch(err){
        console.log("error en request ",err);
        res.status(400).send({
            message:"Ha ocurrido un error",
            error:err
        })
    }
}