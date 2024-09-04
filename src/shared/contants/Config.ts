export const Config = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-default-secret',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/events',
    DEFAULT_LANGUAGE: 'en',
    MAX_UPLOAD_SIZE: '10MB',
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY || 'your-mapbox-api-key',
    DEFAULT_LOCATION_RADIUS: 5000 // in meters
};
