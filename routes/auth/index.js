import express from "express";
import { forogotPage, loginPage, signUpPage } from "../../controllers/auth/index.js";
const route = express.Router()


route.get('/login',loginPage)
route.get('/createUser',signUpPage)
route.get('/resetPassword',forogotPage)



export default route