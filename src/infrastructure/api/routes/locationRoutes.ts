import { Router } from 'express';
import { FindNearbyEventsUseCase } from '@application/use-cases/FindNearbyEventsUseCase';
import { LocationController } from '../controllers/LocationController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import {container} from "tsyringe";

const router = Router();
const findNearbyUseCase = container.resolve(FindNearbyEventsUseCase);
const locationController = new LocationController(findNearbyUseCase);

router.get('/nearby', AuthMiddleware.authenticate, locationController.findNearbyEvents.bind(locationController));

export default router;
