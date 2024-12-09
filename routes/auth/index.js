import express from "express";
import { forogotPage, loginPage, loginUser, signUpPage } from "../../controllers/auth/index.js";
const route = express.Router()


route.get('/login',loginPage)
route.post('/login',loginUser)
route.get('/createUser',signUpPage)
route.post('/createUser')
route.get('/resetPassword',forogotPage)
route.post('/resetPassword')


export default route