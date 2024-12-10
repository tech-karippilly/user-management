import { User } from "../../models/index.js";
import { emailValidation, nameValidation, userNameValidation } from "../../utils/validations.js";


function createUserPage(req, res) {
    res.status(200).render('user/userPage', { alertMessage: '', alertType: '', redirectUrl: '' })
}

async function createUser(req, res) {
    const { firstName, lastName, userName, password, confirmPassword, userEmail } = req.body

    const validate = {
        isfirstName: nameValidation(firstName),
        isuserName: userNameValidation(userName),
        isuserEmail: emailValidation(userEmail)
    }
    const allValid = Object.values(validate).every(value => value);

    if (allValid) {
        if (password === confirmPassword) {
            const existingUser = await User.findOne({ $or: [{ email: userEmail }, { userName: userName }] })
            if (existingUser) {
                return res.status(409).render('user/userPage', { alertMessage: 'User already exists.', alertType: 'danger', redirectUrl: '' })
            }
            const newUser = new User({ firstName: firstName, lastName: lastName, userName: userName, email: userEmail, password, role: 'user' });
            await newUser.save();
            res.status(201).render('user/userPage', { alertMessage: `User created successfully`, alertType: 'success', redirectUrl: '/api/admin' })
        } else {
            res.status(400).render('user/userPage', { alertMessage: `Passoword Mismatch`, alertType: 'danger', redirectUrl: '' })
        }
    }
    else {
        res.status(400).render('user/userPage', { alertMessage: `validation error ,Please checkvalues`, alertType: 'warning', redirectUrl: '' })
    }
}

async function updateUser(req,res){
    const userId = req.params.id
    try{
        const user =  await User.findById(userId)
        res.status(200).render('user/editPage',{alertMessage:'',alertType:'',userDetails:user,redirectUrl:''})
    }catch(error){
        res.status(500).render('user/editPage',{alertMessage:'Error message',alertType:'Danger',userDetails:user,redirectUrl:'/api/admin'})
    }
}

export{
    createUserPage,
    createUser,  
    updateUser
}