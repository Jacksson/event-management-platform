import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import {container} from "tsyringe";

const router = Router();
const authController = container.resolve(AuthController);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;
