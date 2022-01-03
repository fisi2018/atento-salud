import dbConnect from "../../../utils/dbConnect";
dbConnect();
const UserModel=require("../../../models/User");
export default async function handler(req,res){
    try{
        const {id}=req.body;
        const user=await UserModel.findByIdAndRemove(id);
        res.status(200).send({
            message:"Usuario removido exitosamente"
        })
    }catch(err){
        console.log("error request ",err);
    }
}