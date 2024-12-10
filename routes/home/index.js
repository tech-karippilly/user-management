import express from "express";
import { adminPage, userPage } from "../../controllers/home/index.js";

import {isLoggedIn, isLoggedInHome} from'../../middleware/authMiddleware.js'

const route = express.Router()


route.get('/user',isLoggedInHome,userPage)
route.get('/admin',isLoggedInHome,adminPage)

export default route