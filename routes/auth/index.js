import express from "express";
import { forogotPage, loginPage, loginUser, resetPassword, signUpPage, signUpUser } from "../../controllers/auth/index.js";
const route = express.Router()


route.get('/login',loginPage)
route.post('/login',loginUser)
route.get('/createUser',signUpPage)
route.post('/createUser',signUpUser)
route.get('/resetPassword',forogotPage)
route.post('/resetPassword',resetPassword)


export default route