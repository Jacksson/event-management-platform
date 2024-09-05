import CircuitBreaker from 'opossum';

const options = {
    timeout: 3000,                  // Tiempo máximo para que una operación falle
    errorThresholdPercentage: 50,   // % de fallos antes de "abrir" el circuito
    resetTimeout: 10000,            // Tiempo para reintentar la operación
};

export function withCircuitBreaker(action: () => Promise<any>) {
    const breaker = new CircuitBreaker(action, options);

    breaker.fallback(() => 'Servicio temporalmente no disponible');

    return breaker.fire();
}
