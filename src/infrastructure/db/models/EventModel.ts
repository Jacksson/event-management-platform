import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../orm/Sequelize';

interface EventAttributes {
    id: string;
    name: string;
    description?: string;
    date: Date;
    location: string;
    organizerId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

export class EventModel extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
    public id!: string;
    public name!: string;
    public description?: string;
    public date!: Date;
    public location!: string;
    public organizerId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EventModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'events',
        timestamps: true,
    }
);
