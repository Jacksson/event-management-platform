import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../orm/Sequelize';
import { EventModel } from './EventModel';
import { UserModel } from './UserModel';

interface AttendeeAttributes {
    id: string;
    eventId: string;
    userId: string;
    createdAt?: Date;
}

interface AttendeeCreationAttributes extends Optional<AttendeeAttributes, 'id'> {}

export class AttendeeModel extends Model<AttendeeAttributes, AttendeeCreationAttributes> implements AttendeeAttributes {
    public id!: string;
    public eventId!: string;
    public userId!: string;
    public readonly createdAt!: Date;
}

AttendeeModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        eventId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'attendees',
        timestamps: true,
    }
);

AttendeeModel.belongsTo(EventModel, { foreignKey: 'eventId', as: 'event' });
AttendeeModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
