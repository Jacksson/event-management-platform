import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface Config {
    port: number;
    env: string;
    jwt: {
        secret: string;
        expiration: string | number;
    };
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        name: string;
    };
}

const config: Config = {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.JWT_SECRET || 'default_secret',
        expiration: process.env.JWT_EXPIRATION || '3600',
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        name: process.env.DB_NAME || 'eventdb',
    },
};

export default config;
