import dbConnect from "../../../utils/dbConnect";
dbConnect();
const CamaFinalModel=require("../../../models/Cama");
export default async function handler(req,res){
    try{
        const {codeCama,estadoCama,nombrePaciente}=req.body;
        let form={};
        if(!nombrePaciente){
            form={
                codeCama,
                estadoCama
            }
        }else{
            form={
                codeCama,
                estadoCama,
                nombrePaciente
            }
        }
        const cama=new CamaFinalModel(form);
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