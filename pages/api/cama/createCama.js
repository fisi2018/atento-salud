import dbConnect from "../../../utils/dbConnect";
dbConnect();
const CamaFinalModel=require("../../../models/Cama");
export default async function handler(req,res){
    try{
        const {codeCama,estadoCama,nombrePaciente}=req.body;
        const cama=new CamaFinalModel({codeCama,estadoCama,nombrePaciente});
        cama.save();
        res.send(
            {
                message:"Cama creada"
            }
        )
    }catch(err){
        console.log("error ",err);
    }
}