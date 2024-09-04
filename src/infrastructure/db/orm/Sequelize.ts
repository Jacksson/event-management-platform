import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'event_management',
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
});

export const initializeDatabase = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error); process.exit(1);
    }
};

export const closeDatabase = async (): Promise<void> => {
    try {
        await sequelize.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error closing the database connection:', error);
    }
};