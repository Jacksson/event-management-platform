import { Router } from 'express';
//import { eventRoutes } from './eventRoutes';
//import { authRoutes } from './authRoutes';
import { healthRoutes } from './healthRoutes';

const router = Router();

// router.use(eventRoutes);
// router.use(authRoutes);
router.use(healthRoutes);

export { router as apiRoutes };


/*
import express from 'express';
import { apiRoutes } from './infrastructure/api/routes';
import { ErrorHandlingMiddleware } from './infrastructure/api/middlewares/ErrorHandlingMiddleware';
import { LoggingMiddleware } from './infrastructure/api/middlewares/LoggingMiddleware';

const app = express();

app.use(express.json());
app.use(LoggingMiddleware.logRequests);
app.use(apiRoutes);
app.use(ErrorHandlingMiddleware.handleErrors);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
 */

/*
import express from 'express';
import eventRoutes from './api/routes/eventRoutes';
import attendeeRoutes from './api/routes/attendeeRoutes';
import authRoutes from './api/routes/authRoutes';
import locationRoutes from './api/routes/locationRoutes';
import { ErrorHandlingMiddleware } from './api/middlewares/ErrorHandlingMiddleware';

const app = express();
app.use(express.json());

// Rutas
app.use('/events', eventRoutes);
app.use('/attendees', attendeeRoutes);
app.use('/auth', authRoutes);
app.use('/locations', locationRoutes);

// Manejo de errores
app.use(ErrorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 */