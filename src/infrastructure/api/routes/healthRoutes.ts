import { Router } from 'express';
import { HealthCheckController } from '../controllers/HealthCheckController';

const router = Router();
const healthCheckController = new HealthCheckController();

router.get('/health', healthCheckController.check.bind(healthCheckController));

export { router as healthRoutes };
