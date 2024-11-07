import express from 'express';

import prisma from '../utils/prisma.js';
import authenticate from '../middleware/authenticate.js';
import { productCreate } from '../controller/create.js';
import { updateUser } from '../controller/update.js';

const router = express.Router();

router.post('/create',authenticate, productCreate)
     .patch('/update/:id', authenticate, updateUser)


export default router;