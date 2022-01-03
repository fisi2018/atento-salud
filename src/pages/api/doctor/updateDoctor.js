import dbConnect from "../../../utils/dbConnect";
dbConnect();
const DoctorModel=require("../../../models/Doctor");
export default async function handler(req,res){
    try{
        const {id,codeDoctor,dni,especialidad,phone,email,nombres,apellidos,disponibilidad}=req.body;
        const response=await DoctorModel.findByIdAndUpdate(id,{codeDoctor,dni,especialidad,phone,email,nombres,apellidos,disponibilidad});
        res.status(200).send({
            message:"Doctor actualizado correctamente"
        })
    }catch(err){
        console.log("error update ",err);
    }
}