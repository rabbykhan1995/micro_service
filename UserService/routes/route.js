import express from 'express';
import {editUser} from '../controller/edit.js'
import authenticated from '../middleware/authenticated.js';
import { deleteUser } from '../controller/delete.js';
import { readUser } from '../controller/read.js';
import { createUser } from '../controller/create.js';
import isLoggedIn from '../middleware/isLoggedin.js'
import { userLogout } from '../controller/logout.js';
import { loginUser } from '../controller/login.js';

const router = express.Router();

router
.get('/data', authenticated, readUser)
.post('/create',isLoggedIn, createUser )
.patch('/edit', authenticated, editUser  )
.delete('/delete', authenticated, deleteUser)
.get('/logout', authenticated, userLogout)
.post('/login', isLoggedIn, loginUser);


export default router;