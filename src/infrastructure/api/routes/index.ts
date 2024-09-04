import { Router } from 'express';
import { healthRoutes } from './healthRoutes';
import locationRoutes from "@infrastructure/api/routes/locationRoutes";
import attendeeRoutes from "@infrastructure/api/routes/attendeeRoutes";
import eventRoutes from "@infrastructure/api/routes/eventRoutes";
import authRoutes from "@infrastructure/api/routes/authRoutes";

const router = Router();

// Rutas
router.use('/events', eventRoutes);
router.use('/attendees', attendeeRoutes);
router.use('/auth', authRoutes);
router.use('/locations', locationRoutes);
router.use(healthRoutes);

export { router as apiRoutes };
