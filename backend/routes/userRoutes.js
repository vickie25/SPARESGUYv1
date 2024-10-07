//user routes

import express from 'express';
import { registerUser, loginUser } from '../Controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;