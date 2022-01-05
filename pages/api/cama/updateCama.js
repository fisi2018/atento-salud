import dbConnect from "../../../utils/dbConnect";
dbConnect();
const CamaFinalModel=require("../../../models/Cama");
export default async function handler(req,res){
    try{
        const {id,codeCama,estadoCama,nombrePaciente}=req.body;
        console.log(id,codeCama,estadoCama,nombrePaciente);
        let newValue=0;
        if(nombrePaciente===""){
            const response=await CamaFinalModel.findByIdAndUpdate(id,{codeCama,estadoCama,nombrePaciente:null});
        }else{
            const response=await CamaFinalModel.findByIdAndUpdate(id,{codeCama,estadoCama,nombrePaciente});
        }
        res.status(200).send({
            message:"Cama actualizada correctamente"
        })
    }catch(err){
        console.log("error update ",err);
    }
}