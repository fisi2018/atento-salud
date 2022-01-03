import dbConnect from "../../../utils/dbConnect";
dbConnect();
const EnfermedadModel=require("../../../models/Enfermedad");
export default async function handler(req,res){
    try{
        const response=await EnfermedadModel.find();
        res.status(200).send(response);
    }catch(err){
        console.log("error en request ",err);
    }
}