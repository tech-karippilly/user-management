import { User } from "../../models/index.js"
import { emailValidation, nameValidation, userNameValidation } from "../../utils/validations.js"


function loginPage(req, res) {
    res.status(200).render('auth/loginPage', { alertMessage: '', alertType: '', redirectUrl: '' })
}

async function loginUser(req, res) {
    const { userName, password } = req.body

    const isUsernameValid = userNameValidation(userName)
    if (isUsernameValid) {
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

            return res.status(200).render('auth/loginPage', { alertType: 'success', alertMessage: 'Login Successfully', redirectUrl: getRedirectUrl(user.role) })
        } catch (error) {
            console.log(error.message)
            return res.status(500).render('auth/loginPage', { alertType: 'danger', alertMessage: 'Error in connection', redirectUrl: '' })
        }
    } else {
        res.status(400).render('auth/loginPage', { alertMessage: 'In Valid User Name', alertType: 'danger', redirectUrl: '' })
    }

}

function signUpPage(req, res) {
    res.status(200).render('auth/signupPage', { alertMessage: '', alertType: '', redirectUrl: '' })
}

async function signUpUser(req, res) {
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
                return res.status(409).render('auth/signupPage', { alertMessage: 'User already exists.', alertType: 'danger', redirectUrl: '' })
            }
            const newUser = new User({ firstName: firstName, lastName: lastName, userName: userName, email: userEmail, password, role: 'user' });
            await newUser.save();
            res.status(201).render('auth/signupPage', { alertMessage: `User created successfully`, alertType: 'success', redirectUrl: '/api/auth/login' })
        } else {
            res.status(400).render('auth/signupPage', { alertMessage: `Passoword Mismatch`, alertType: 'danger', redirectUrl: '' })
        }
    }
    else {
        res.status(400).render('auth/signupPage', { alertMessage: `validation error ,Please checkvalues`, alertType: 'warning', redirectUrl: '' })
    }

}


function forogotPage(req, res) {
    res.status(200).render('auth/forgotPage', { alertMessage: '', alertType: '', redirectUrl: '' })
}

async function resetPassword(req, res) {
    const { password, userName, confirmPassword } = req.body
    try {
        const user = await User.findOne({ userName: userName })

        if (!user) {
            return res.status(400).render('auth/forgotPage', { alertMessage: `User not Found.`, alertType: 'danger', redirectUrl: '' })
        }
        if (password === confirmPassword) {
            user.password = password;
            await user.save();
            res.status(200).render('auth/forgotPage', { alertMessage: `Password reset successful.`, alertType: 'success', redirectUrl: '/api/auth/login' })
        } else {
            res.status(400).render('auth/forgotPage', { alertMessage: `Passoword Mismatch`, alertType: 'danger', redirectUrl: '' })
        }
    } catch (error) {
        res.status(500).render('auth/forgotPage', { alertMessage: `${error.message}`, alertType: 'danger', redirectUrl: '' })
    }
}

export {
    loginPage,
    loginUser,
    signUpPage,
    signUpUser,
    forogotPage,
    resetPassword
}