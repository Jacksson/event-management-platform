import { Router } from 'express';
import { LocationController } from '../controllers/LocationController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import {container} from "tsyringe";

const router = Router();
const locationController = container.resolve(LocationController);

router.get('/nearby', AuthMiddleware.authenticate, locationController.findNearbyEvents.bind(locationController));

export default router;
