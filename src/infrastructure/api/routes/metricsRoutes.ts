import { Router } from 'express';
import {collectDefaultMetrics, Registry} from "prom-client";

const register = new Registry();
// Recopilar métricas predeterminadas
collectDefaultMetrics({ register });

const router = Router();

router.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

export default router;

