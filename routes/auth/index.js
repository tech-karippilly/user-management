import express from "express";
import { forogotPage, loginPage, loginUser, logoutUser, resetPassword, signUpPage, signUpUser } from "../../controllers/auth/index.js";
import { isLoggedIn } from "../../middleware/authMiddleware.js";
const route = express.Router()


route.get('/login',isLoggedIn,loginPage)
route.post('/login',isLoggedIn,loginUser)
route.get('/createUser',isLoggedIn,signUpPage)
route.post('/createUser',isLoggedIn,signUpUser)
route.get('/resetPassword',isLoggedIn,forogotPage)
route.post('/resetPassword',isLoggedIn,resetPassword)

route.get('/logout',isLoggedIn,logoutUser)

export default route