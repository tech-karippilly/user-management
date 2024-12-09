import { User } from "../../models/index.js"
import { userNameValidation } from "../../utils/validations.js"


function loginPage(req,res){
    res.status(200).render('auth/loginPage',{alertMessage:'',alertType:'',redirectUrl:''})
}

async function loginUser(req,res){
    const { userName, password } = req.body

    const isUsernameValid = userNameValidation(userName)
    if (isUsernameValid){
        try {
            const user = await User.findOne({ userName: userName })
    
            if (!user) {
                return res.status(404).render('auth/loginPage', { alertType: 'danger', alertMessage: 'User Not Found', redirectUrl: '' })
            }
    
            const isMatch = await user.validatePassword(password)
            if (!isMatch) {
                return res.status(401).render('auth/loginPage', { alertType: 'danger', alertMessage: 'Invalid Credentials', redirectUrl })
            }
    
            req.session.userId = user._id;
    
            return res.status(200).render('auth/loginPage',{alertType:'success',alertMessage:'Login Successfully',redirectUrl:getRedirectUrl(user.role)})
        } catch (error) {
            console.log(error.message)
            return res.status(500).render('auth/loginPage', { alertType: 'danger', alertMessage: 'Error in connection', redirectUrl: '' })
        }
    }else{
        res.status(400).render('auth/loginPage',{alertMessage:'In Valid User Name',alertType:'danger',redirectUrl:''})
    }

}

function signUpPage(req,res){
    res.status(200).render('auth/signupPage',{alertMessage:'',alertType:'',redirectUrl:''})
}



function forogotPage(req,res){
    res.status(200).render('auth/forgotPage',{alertMessage:'',alertType:'',redirectUrl:''})
}

export{
    loginPage,
    loginUser,
    signUpPage,
    forogotPage
}