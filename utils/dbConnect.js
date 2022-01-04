import mongoose from "mongoose";
const connection={};
async function dbConnect(){
    if(connection.isConnected){
        return;
    }
    try{

        const db=await mongoose.connect(process.env.MONGO_URL,{});
        connection.isConnected=db.connections[0].readyState;
        console.log(connection.isConnected);
    }catch(err){
        console.log("error db ",err);
    }
}
export default dbConnect;