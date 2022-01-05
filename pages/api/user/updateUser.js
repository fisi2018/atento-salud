import dbConnect from "../../../utils/dbConnect";
dbConnect();
const UserModel=require("../../../models/User");
export default async function handler(req,res){
    try{
        const {id,dni,role,phone,email,nombres,apellidos,password,codAsegurado,address}=req.body;
        const response=await UserModel.findByIdAndUpdate(id,{dni,role,phone,email,nombres,apellidos,password,codAsegurado,address});
        res.status(200).send({
            message:"Usuario actualizado correctamente"
        })
    }catch(err){
        console.log("error update ",err);
    }
}