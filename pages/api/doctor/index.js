import dbConnect from "../../../utils/dbConnect";
dbConnect();
const DoctorModel=require("../../../models/Doctor");
export default async function handler(req,res){
    try{
        const response=await DoctorModel.find();
        res.status(200).send(response);
    }catch(err){
        console.log("error en request ",err);
    }
}