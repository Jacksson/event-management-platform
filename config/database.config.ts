import config from './config';

export const databaseConfig = {
    host: config.database.host,
    port: config.database.port,
    username: config.database.user,
    password: config.database.password,
    database: config.database.name,
    dialect: 'postgres',
    logging: config.env === 'development',
};
