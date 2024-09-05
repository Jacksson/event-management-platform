import { Request, Response, NextFunction } from 'express';
import {container} from "tsyringe";
import {RedisClient} from "@infrastructure/cache/RedisClient";

export async function idempotencyMiddleware(req: Request, res: Response, next: NextFunction) {
    const redisClient = container.resolve(RedisClient);
    const idempotencyKey = req.headers['idempotency-key'] as string;

    if (!idempotencyKey) {
        return res.status(400).json({ message: 'Idempotency key required' });
    }

    const exists = await redisClient.get(idempotencyKey);

    if (exists) {
        return res.status(409).json({ message: 'Duplicate request' });
    }

    //await redisClient.set(idempotencyKey, 'processed', 'EX', 60 * 5); // Clave válida por 5 minutos
    await redisClient.set(idempotencyKey, 'processed', 60 * 5); // Clave válida por 5 minutos

    next();
}
