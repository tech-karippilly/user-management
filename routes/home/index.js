import express from "express";
import { adminPage, userPage } from "../../controllers/home/index.js";

import {isLoggedIn, isLoggedInHome} from'../../middleware/authMiddleware.js'
import { createUser, createUserPage, updateUser } from "../../controllers/user/index.js";

const route = express.Router()


route.get('/user',isLoggedInHome,userPage)
route.get('/admin',isLoggedInHome,adminPage)

route.get('/admin/createUser',createUserPage)
route.post('/admin/createUser',createUser)

route.get('/admin/editUser/:id',isLoggedInHome,updateUser)
route.post('/admin/editUser',isLoggedInHome,)

route.get('/admin/deletUser/id')

export default route