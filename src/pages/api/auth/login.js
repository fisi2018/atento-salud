import dbConnect from "../../../utils/dbConnect";
dbConnect();
const UserModel=require("../../../models/User");
export default async function handler(req,res){
    try{
        const {email,password}=req.body;
        const response=await UserModel.findOne({
            email,
            password
        });
        if(response)return res.send({message:"Usuario logeado exitosamente",user:response});
        res.send({
            message:"Email o contraseña incorrecta",
            error:true
        })
    }catch(err){
        console.log("error ",err);
    }
}