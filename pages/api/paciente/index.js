import dbConnect from "../../../utils/dbConnect";
dbConnect();
const PacienteMdModel=require("../../../models/Paciente");
const UserModel=require("../../../models/User");
const EnfermedadModel=require("../../../models/Enfermedad");
const DoctorModel=require("../../../models/Doctor");
export default async function handler(req,res){
    try{
        const response=await PacienteMdModel.find().populate("codAsegurado","codAsegurado nombres apellidos dni").populate("codEnfermedad").populate("doctor","dni nombres apellidos codeDoctor");
        res.status(200).send(response);
    }catch(err){
        console.log("error en request ",err);
    }
}