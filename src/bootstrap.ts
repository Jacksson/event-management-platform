import 'module-alias/register';

import {sequelize} from "@infrastructure/db/orm/Sequelize";
import {applyAssociations} from "@infrastructure/db/models/associations";

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