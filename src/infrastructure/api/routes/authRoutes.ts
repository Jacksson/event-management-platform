import { Router } from 'express';
import { AuthService } from '@domain/services/AuthService';
import { AuthController } from '../controllers/AuthController';
import {container} from "tsyringe";

const router = Router();
const authService = container.resolve(AuthService);
const authController = new AuthController(authService);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;
