import { User } from "../models/index.js";
import { getRouteApi } from "../utils/helperfunction.js";


async function isLoggedIn(req,res,next){
    if(req.session.userId){
        try{
            const user = await User.findById(req.session.userId)
            res.redirect(getRouteApi(user.role));
        }catch(error){
            res.redirect('/api/auth/login');
        }
       
    }else{
        next()
    }
   
}

function isLoggedInHome(req,res,next){
    if(req.session.userId){
       next()
    }else{
        res.redirect('/api/auth/login');
    }
}

export {isLoggedIn,isLoggedInHome} 