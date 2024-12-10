import mongoose from "mongoose";
import bycrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    tokens:{
        authToken:{
            type:String
        },
        refreshToken:{
            type:String
        },
        issuedAt: {
            type: Date,
            default: Date.now
        }
    },
    role:{
        type:String,
        required:true,
        
    }
})


userSchema.pre('save',async function (next) {
    if (this.isModified('password')){
        this.password = await bycrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.getFullName =function (){
    return this.firstName + " "+ this.lastName
}

userSchema.methods.validatePassword = async function (password) {
    return bycrypt.compare(password,this.password)
}

export default userSchema;