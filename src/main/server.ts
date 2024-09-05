import 'module-alias/register';
import 'reflect-metadata'; // Necesario para tsyringe
import { createApp } from './app';
import {Logger} from "@shared/utils/Logger";

//import '../infrastructure/container';
import {sequelize} from "@infrastructure/db/orm/Sequelize";
import {applyAssociations} from "@infrastructure/db/models/associations";
import {container} from "tsyringe";

//const obj = container.resolve('IEventRepository');
//console.log(obj);
(async () => {
    try {
        // Aplicar las asociaciones
        applyAssociations();

        // Sincronizar los modelos con la base de datos
        await sequelize.sync({ alter: true });

        console.log('Conexión exitosa con la base de datos');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
})();


const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
});
