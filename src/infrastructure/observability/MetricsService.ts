import client, { Counter, Histogram } from 'prom-client';
import express from 'express';

export class MetricsService {
    private requestCounter: Counter<string>;
    private httpRequestDuration: Histogram<string>;

    constructor() {
        // Configuración inicial de métricas
        this.requestCounter = new client.Counter({
            name: 'http_requests_total',
            help: 'Total number of HTTP requests made',
            labelNames: ['method', 'route', 'status_code'],
        });

        this.httpRequestDuration = new client.Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route', 'status_code'],
            buckets: [0.1, 0.5, 1, 1.5, 2, 5],
        });

        // Configuración de otras métricas personalizadas
        client.collectDefaultMetrics();
    }

    public getRequestCounter(): Counter<string> {
        return this.requestCounter;
    }

    public getHttpRequestDuration(): Histogram<string> {
        return this.httpRequestDuration;
    }

    public setupMetricsEndpoint(app: express.Application): void {
        app.get('/metrics', async (_req, res) => {
            res.set('Content-Type', client.register.contentType);
            res.end(await client.register.metrics());
        });
    }
}

export const metricsService = new MetricsService();

/*
 import express, { Request, Response, NextFunction } from 'express';
import { metricsService } from '../observability/MetricsService';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
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

metricsService.setupMetricsEndpoint(app);

 */