import dbConnect from "../../../utils/dbConnect";
dbConnect();
const UserModel=require("../../../models/User");
export default async function handler(req,res){
    try{
        const {dni,role,phone,email,nombres,apellidos,password,codAsegurado,address}=req.body;
        const user=new UserModel({dni,role,phone,email,nombres,apellidos,password,codAsegurado,address});
        user.save();
        res.send(
            {
                message:"Usuario agregado"
            }
        )
    }catch(err){
        console.log("error ",err);
    }
}