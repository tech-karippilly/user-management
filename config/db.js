import mongoose from "mongoose";

console.log(process.env.MONGO_URL)
async function connectDB(){
    try{

        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected ....')
    }catch(error){
        console.error(error.message)
    }
    

}

export default connectDB