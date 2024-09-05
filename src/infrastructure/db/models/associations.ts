import { UserModel } from './UserModel';
import { EventModel } from './EventModel';
import { AttendeeModel } from './AttendeeModel';

export function applyAssociations() {
    // Asociación entre usuarios y eventos
    UserModel.hasMany(EventModel, { foreignKey: 'organizerId', as: 'organizedEvents' });
    EventModel.belongsTo(UserModel, { foreignKey: 'organizerId', as: 'organizer' });

    // Asociación entre asistentes y eventos
    AttendeeModel.belongsTo(EventModel, { foreignKey: 'eventId', as: 'event' });
    AttendeeModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

}
