import express from "express";
import { adminPage, searchUser, userPage } from "../../controllers/home/index.js";

import {isLoggedIn, isLoggedInHome} from'../../middleware/authMiddleware.js'
import { createUser, createUserPage, deleteUser, updateUser, updateUserPage } from "../../controllers/user/index.js";

const route = express.Router()


route.get('/user',isLoggedInHome,userPage)
route.get('/admin',isLoggedInHome,adminPage)

route.get('/admin/createUser',createUserPage)
route.post('/admin/createUser',createUser)

route.get('/admin/editUser/:id',isLoggedInHome,updateUserPage)
route.post('/admin/editUser',isLoggedInHome,updateUser)

route.get('/admin/search',searchUser)

route.delete('/admin/deletUser/:id',deleteUser)

export default route