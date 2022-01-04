import dbConnect from "../../../utils/dbConnect";
dbConnect();
const UserModel=require("../../../models/User");
export default async function handler(req,res){
    try{
        const response=await UserModel.find();
        res.status(200).send(response);
    }catch(err){
        console.log("error en request ",err);
    }
}