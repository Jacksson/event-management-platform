import {NextFunction, Request, Response, Router} from 'express';
import {metricsService} from "@infrastructure/observability/MetricsService";

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    const end = metricsService.getHttpRequestDuration().startTimer({
        method: req.method,
        route: req.route?.path || req.path,
    });

    res.on('finish', () => {
        metricsService.getRequestCounter().inc({
            method: req.method,
            route: req.route?.path || req.path,
            status_code: res.statusCode.toString(),
        });
        end({ status_code: res.statusCode.toString() });
    });

    next();
});
export default router;


