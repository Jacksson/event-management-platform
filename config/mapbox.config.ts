import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY || 'default_mapbox_key';

export const mapboxConfig = {
    apiKey: MAPBOX_API_KEY,
    baseUrl: 'https://api.mapbox.com',
};
