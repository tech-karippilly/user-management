

function loginPage(req,res){
    res.status(200).render('auth/loginPage',{alertMessage:'',alertType:'',redirectUrl:''})
}
function signUpPage(req,res){
    res.status(200).render('auth/signupPage',{alertMessage:'',alertType:'',redirectUrl:''})
}
function forogotPage(req,res){
    res.status(200).render('auth/forgotPage',{alertMessage:'',alertType:'',redirectUrl:''})
}

export{
    loginPage,
    signUpPage,
    forogotPage
}