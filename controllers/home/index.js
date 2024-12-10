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


async function searchUser(req,res){
    const searchString = req.query.searchString
    const userId = req.session.userId
    try{
        const user = await User.findById(userId)
        const name = await  user.getFullName()

        const employeeList  = await User.find({$or:[
            {userName:{$regex:searchString,$options: 'i' }},
            {email:{$regex:searchString,$options: 'i' }},
            {firstName:{$regex:searchString,$options: 'i' }},
            {lastName:{$regex:searchString,$options: 'i' }}
        ]})
        res.status(200).render('home/admin',{title:'Admin Page',alertMessage:'',alertType:'',redirectUrl:'',userName:name,employeeList:employeeList})
    }catch(error){
        console.error("Error",error.message)
        res.status(500).render('home/admin',{title:'Admin Page',alertMessage:`${error.message}`,alertType:'danger',redirectUrl:'',userName:'',employeeList:[]})
        
    }

}

export {
    userPage,
    adminPage,
    searchUser
}