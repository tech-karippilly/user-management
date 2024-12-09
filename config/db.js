import mongoose from "mongoose";


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected ....')
    }catch(error){
        console.error(error.message)
    }
    

}

export default connectDB