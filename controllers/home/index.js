import { User } from "../../models/index.js"


async function userPage(req,res){
   
    try{
        const user = await User.findById(req.session.userId)

        const fullName = await user.getFullName()
        res.status(200).render('home/user',{name:fullName})
    }catch(error){
        res.status(500).redirect('/api/auth/login')
    }
    
}

async function adminPage(req,res){
   try{

    const user = await User.findById(req.session.userId)

    const userList = await User.find({role:{$ne:'admin'}})

    res.status(200).render('home/admin',{title:'Admin Page',employeeList:userList})

   }catch(error){
    res.status(500).redirect('/api/auth/login')
   }
   
}

export {
    userPage,
    adminPage
}