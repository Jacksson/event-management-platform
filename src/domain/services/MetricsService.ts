import express from "express";
import { MetricsService as PrometheusMetricsService } from '../../infrastructure/observability/MetricsService';

export class MetricsService {
    private prometheusMetricsService: PrometheusMetricsService;

    constructor(prometheusMetricsService: PrometheusMetricsService) {
        this.prometheusMetricsService = prometheusMetricsService;
    }

    public incrementRequestCounter(method: string, route: string, statusCode: string): void {
        const counter = this.prometheusMetricsService.getRequestCounter();
        counter.inc({ method, route, status_code: statusCode });
    }

    public observeRequestDuration(method: string, route: string, statusCode: string, duration: number): void {
        const histogram = this.prometheusMetricsService.getHttpRequestDuration();
        histogram.observe({ method, route, status_code: statusCode }, duration);
    }

    public setupMetricsEndpoint(app: express.Application): void {
        this.prometheusMetricsService.setupMetricsEndpoint(app);
    }
}
