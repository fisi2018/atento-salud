import dbConnect from "../../../utils/dbConnect";
dbConnect();
const EnfermedadModel=require("../../../models/Enfermedad");
export default async function handler(req,res){
    try{
        const {codeEnfermedad,nombreEnfermedad}=req.body;
        const enfermedad=new EnfermedadModel({codeEnfermedad,nombreEnfermedad});
        enfermedad.save();
        res.send(
            {
                message:"Enfermedad agregada"
            }
        )
    }catch(err){
        console.log("error ",err);
    }
}