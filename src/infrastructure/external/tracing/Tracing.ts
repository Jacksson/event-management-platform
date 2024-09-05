import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

// Configuración del logger de OpenTelemetry
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Configurar el exportador para enviar los traces a un backend compatible con OTLP (como Jaeger o Zipkin)
const traceExporter = new OTLPTraceExporter({
    url: process.env.OTLP_EXPORTER_URL || 'http://localhost:4318/v1/traces', // Cambia la URL si es necesario
});

// Definir el SDK de OpenTelemetry
const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'event-management-api',
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
});

// Inicializar OpenTelemetry
export const initTracing = async () => {
    await sdk.start();
    console.log('Tracing inicializado');
};

// Finalizar OpenTelemetry cuando la app se cierre
process.on('SIGTERM', async () => {
    await sdk.shutdown();
    console.log('Tracing finalizado');
});
