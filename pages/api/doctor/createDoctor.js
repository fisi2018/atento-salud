import dbConnect from "../../../utils/dbConnect";
dbConnect();
const DoctorModel=require("../../../models/Doctor");
export default async function handler(req,res){
    try{
        const {codeDoctor,dni,especialidad,phone,email,nombres,apellidos,disponibilidad}=req.body;
        const arrayEspecialidad=especialidad.split(",");
        console.log("array ",especialidad,arrayEspecialidad);
        const doctor=new DoctorModel({codeDoctor,dni,especialidad:arrayEspecialidad,phone,email,nombres,apellidos,disponibilidad});
        doctor.save();
        res.send(
            {
                message:"Doctor agregado"
            }
        )
    }catch(err){
        console.log("error ",err);
    }
}