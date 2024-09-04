import { Router } from 'express';
import { container } from 'tsyringe';
import { EventController } from '../controllers/EventController';
import { AuthMiddleware } from '@infrastructure/api/middlewares/AuthMiddleware';

const router = Router();
const eventController = container.resolve(EventController);

router.post('/', AuthMiddleware.authenticate, eventController.createEvent.bind(eventController));
router.put('/:eventId', AuthMiddleware.authenticate, eventController.updateEvent.bind(eventController));
router.get('/:eventId', eventController.getEventById.bind(eventController));
router.delete('/:eventId', AuthMiddleware.authenticate, eventController.deleteEvent.bind(eventController));
router.get('/organizer/:organizerId', eventController.getEventsByOrganizer.bind(eventController));

export default router;