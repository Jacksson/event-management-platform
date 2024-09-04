import { UserModel } from '../db/models/UserModel';
import {IUserRepository} from "@domain/repositories/IUserRepository";
import {User} from "@domain/entities/User";
import {injectable} from "tsyringe";

@injectable()
export class UserRepository implements IUserRepository {
    public async findById(userId: string): Promise<User | null> {
        const userRecord = await UserModel.findByPk(userId);
        if (userRecord) {
            return this.mapToDomain(userRecord);
        }
        return null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const userRecord = await UserModel.findOne({ where: { email } });
        if (userRecord) {
            return this.mapToDomain(userRecord);
        }
        return null;
    }

    public async save(user: User): Promise<void> {
        const userRecord = this.mapToModel(user);
        await UserModel.upsert(userRecord);
    }

    public async update(user: User): Promise<void> {
        const userRecord = this.mapToModel(user);
        await UserModel.update(userRecord, { where: { id: user.id } });
    }

    public async delete(userId: string): Promise<void> {
        await UserModel.destroy({ where: { id: userId } });
    }

    private mapToDomain(userRecord: any): User {
        return new User(
            userRecord.name,
            userRecord.email,
            userRecord.passwordHash,
            userRecord.role
        );
    }

    private mapToModel(user: User): any {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role
        };
    }
}
