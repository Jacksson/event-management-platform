import Redis, { Redis as RedisInstance } from 'ioredis';
import {autoInjectable} from 'tsyringe';
import {Logger} from "@shared/utils/Logger"; // Utilizando tsyringe para IoC/DI

@autoInjectable()
export class RedisClient {
    private client: RedisInstance;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
            db: Number(process.env.REDIS_DB) || 0,
        });

        this.client.on('connect', () => {
            Logger.info('Conectado a Redis');
        });

        this.client.on('error', (err) => {
            Logger.error('Error en Redis:' + err.message);
        });
    }

    // Método para obtener un valor de Redis
    public async get(key: string): Promise<string | null> {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            Logger.error(`Error al obtener en Redis la clave ` + key);
            throw error;
        }
    }

    // Método para establecer un valor en Redis
    public async set(key: string, value: string, expireInSeconds?: number): Promise<void> {
        try {
            if (expireInSeconds) {
                await this.client.set(key, value, 'EX', expireInSeconds);
            } else {
                await this.client.set(key, value);
            }
        } catch (error) {
            Logger.error(`Error al establecer en Redis la clave` + key);
            throw error;
        }
    }

    // Método para eliminar una clave de Redis
    public async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            Logger.error(`Error al establecer en Redis la clave` + key);
            throw error;
        }
    }

    // Método para cerrar la conexión con Redis
    public async disconnect(): Promise<void> {
        try {
            await this.client.quit();
            Logger.info('Conexión con Redis cerrada');
        } catch (error) {
            Logger.error('Error al cerrar la conexión con Redis');
            throw error;
        }
    }
}
