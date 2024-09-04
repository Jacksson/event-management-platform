import { Router } from 'express';
import { AttendeeController } from '../controllers/AttendeeController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { AttendeeService } from '@application/services/AttendeeService';
import {container} from "tsyringe";


const router = Router();
const attendeeService = container.resolve(AttendeeService);
const attendeeController = new AttendeeController(attendeeService);

router.post('/', AuthMiddleware.authenticate, attendeeController.registerAttendee.bind(attendeeController));
router.delete('/:userId/:eventId', AuthMiddleware.authenticate, attendeeController.removeAttendee.bind(attendeeController));
router.get('/:eventId', attendeeController.findAttendeesByEvent.bind(attendeeController));

export default router;
